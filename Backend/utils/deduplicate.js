/** */
// Simple deduplication logic: for a given time window, keep the latest probe per (mac, zone)
// For scaling: move dedupe to in-memory cache (Redis) or stream processing.

//const Probe = require('../models/probe');

/**
 * Returns unique device count per zone in the last windowSeconds.
 * For simplicity, we treat MACs as identifiers — but you can hash or anonymize MACs here.
 */

async function uniqueCounts(windowSeconds = 60) {
  const Probe = require('../models/probe');
  const since = new Date(Date.now() - windowSeconds * 1000);

  // Aggregate: group by mac+zone, take max timestamp, then count unique macs per zone
  const pipeline = [
    { $match: { timestamp: { $gte: since } } },
    { $group: {
        _id: { mac: '$mac', zone: '$zone' },
        lastSeen: { $max: '$timestamp' },
        rssi: { $last: '$rssi' }
    }},
    { $group: {
        _id: '$_id.zone',
        uniqueDevices: { $sum: 1 }
    }},
    { $project: { zone: '$_id', uniqueDevices: 1, _id: 0 } }
  ];

  const res = await Probe.aggregate(pipeline).exec();
  // convert to map-style
  const counts = {};
  res.forEach(r => counts[r.zone || 'default'] = r.uniqueDevices);
  return counts;
}

module.exports = { uniqueCounts };