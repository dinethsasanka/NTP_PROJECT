import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, TimeScale);

export default function TrendChart({ labels, counts }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Unique Devices Over Time",
        data: counts,
        borderWidth: 2,
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { type: "time" }, y: { beginAtZero: true } }
  };

  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-4">Trends</h2>
      <Line data={data} options={options} />
    </div>
  );
}
