import React, { useEffect, useState } from "react";
import { getCurrent, getTrends, getAlerts } from "../api";
import ZoneCard from "./ZoneCard";
import TrendChart from "./TrendChart";
import AlertBanner from "./AlertBanner";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const [zones, setZones] = useState([]);
  const [trend, setTrend] = useState({ labels: [], counts: [] });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cur = await getCurrent();
        setZones(cur.data);
        const tr = await getTrends();
        setTrend(tr);
        const al = await getAlerts();
        setAlerts(al.alerts);
      } catch (err) {
        console.error("API error", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const topLevel =
    zones.find(z => z.level === "critical")
      ? "critical"
      : zones.find(z => z.level === "warning")
      ? "warning"
      : "normal";

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Real-Time Crowd Alert Dashboard</h1>
        <div className="text-gray-500 text-sm">Auto-refresh every 3s</div>
      </div>

      <AlertBanner level={topLevel} />

      <motion.div
        className="grid md:grid-cols-2 gap-6 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="space-y-4">
          {zones.map((z, i) => (
            <ZoneCard key={i} zone={z.zone} count={z.count} level={z.level} />
          ))}

          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle size={18} /> Recent Alerts
            </h2>
            {alerts.length === 0 ? (
              <p className="text-sm text-gray-500">No active alerts</p>
            ) : (
              <ul className="text-sm">
                {alerts.map(a => (
                  <li key={a._id} className="mb-2 border-b pb-1">
                    <span className="font-bold text-red-500">{a.level}</span> —{" "}
                    {a.zone} ({new Date(a.createdAt).toLocaleString()})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <TrendChart labels={trend.labels} counts={trend.counts} />
      </motion.div>
    </div>
  );
}
