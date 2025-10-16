const express = require('express');
const router = express.Router();
const Probe = require('../models/probe');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10s
  max: 1000
});

router.use(limiter);

router.post('/', async (req, res) => {
  // simple API key check (keep secret)
  const apiKey = req.headers['x-api-key'] || req.query.key;
  if (apiKey !== process.env.INGEST_API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  // Expect JSON payload: { probes: [{ mac, rssi, timestamp, zone }] }
  const { probes } = req.body;
  if (!Array.isArray(probes) || probes.length === 0) {
    return res.status(400).json({ error: 'invalid payload' });
  }

  try {
    const docs = probes.map(p => ({
      mac: p.mac.toLowerCase(),
      rssi: p.rssi,
      timestamp: p.timestamp ? new Date(p.timestamp) : new Date(),
      zone: p.zone || 'default'
    }));
    await Probe.insertMany(docs, { ordered: false });
    return res.json({ inserted: docs.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'ingest error' });
  }
});

module.exports = router;
