import React from "react";
import { motion } from "framer-motion";

export default function ZoneCard({ zone, count, level }) {
  const bg =
    level === "critical"
      ? "bg-critical"
      : level === "warning"
      ? "bg-warning"
      : "bg-normal";

  return (
    <motion.div
      className="bg-white shadow rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition"
      whileHover={{ scale: 1.02 }}
    >
      <div>
        <div className="text-gray-500 text-sm">Zone</div>
        <div className="text-xl font-semibold">{zone}</div>
      </div>
      <div className="text-right">
        <div className="text-gray-500 text-sm">Count</div>
        <div className="text-3xl font-bold">{count}</div>
        <span
          className={`${bg} text-white text-xs px-3 py-1 rounded-full mt-2 inline-block`}
        >
          {level.toUpperCase()}
        </span>
      </div>
    </motion.div>
  );
}
