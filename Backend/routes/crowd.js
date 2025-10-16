const express = require('express');
const router = express.Router();
const { uniqueCounts } = require('../utils/deduplicate');
const Probe = require('../models/probe');
const Alert = require('../models/Alert');

const windowSeconds = parseInt(process.env.DEDUPE_WINDOW_SECONDS || '60', 10);
const alertThreshold = parseInt(process.env.ALERT_THRESHOLD || '50', 10);

router.get('/current', async (req, res) => {
  try {
    const counts = await uniqueCounts(windowSeconds);
    // compute status per zone
    const zones = Object.keys(counts.length ? counts : { default: 0 });
    const response = [];
    for (const [zone, cnt] of Object.entries(counts)) {
      let level = 'normal';
      if (cnt >= alertThreshold * 1.5) level = 'critical';
      else if (cnt >= alertThreshold) level = 'warning';
      response.push({ zone, count: cnt, level });
    }

    // also ensure default entry
    if (response.length === 0) response.push({ zone: 'default', count: 0, level: 'normal' });

    return res.json({ windowSeconds, data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.get('/trends', async (req, res) => {
  // return aggregated counts grouped by minute for last N minutes (default 12 hours)
  const hours = parseInt(req.query.hours || '6', 10);
  const since = new Date(Date.now() - hours * 3600 * 1000);

  // we will group by minute
  const pipeline = [
    { $match: { timestamp: { $gte: since } } },
    { $group: {
      _id: {
        year: { $year: '$timestamp' },
        month: { $month: '$timestamp' },
        day: { $dayOfMonth: '$timestamp' },
        hour: { $hour: '$timestamp' },
        minute: { $minute: '$timestamp' }
      },
      macs: { $addToSet: '$mac' }
    }},
    { $project: {
      ts: {
        $dateFromParts: {
          year: '$_id.year',
          month: '$_id.month',
          day: '$_id.day',
          hour: '$_id.hour',
          minute: '$_id.minute'
        }
      },
      count: { $size: '$macs' }
    }},
    { $sort: { ts: 1 } }
  ];

  try {
    const rows = await Probe.aggregate(pipeline).exec();
    // map to arrays for chart: labels (ISO), counts
    const labels = rows.map(r => r.ts);
    const counts = rows.map(r => r.count);
    return res.json({ labels, counts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.get('/alerts', async (req, res) => {
  // return most recent alerts (simple)
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(20).lean();
    return res.json({ alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
