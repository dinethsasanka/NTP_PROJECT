import React from "react";
import { AlertTriangle, CheckCircle, AlertOctagon } from "lucide-react";

export default function AlertBanner({ level }) {
  const colors = {
    normal: "bg-normal",
    warning: "bg-warning",
    critical: "bg-critical"
  };
  const icons = {
    normal: <CheckCircle className="text-white" />,
    warning: <AlertTriangle className="text-white" />,
    critical: <AlertOctagon className="text-white" />
  };
  const messages = {
    normal: "All zones are normal",
    warning: "Some zones are congested — please monitor",
    critical: "⚠️ Critical congestion detected!"
  };

  return (
    <div className={`${colors[level]} text-white py-3 px-4 rounded-lg flex items-center gap-3 shadow`}>
      {icons[level]}
      <span className="font-semibold">{messages[level]}</span>
    </div>
  );
}
