import React from "react";

const CalculationConsole: React.FC<{ logs: string[] }> = ({ logs }) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow p-2 mt-2 mb-2 mx-auto relative -top-5"
      style={{ height: 110, width: 500, overflowY: "auto", fontFamily: 'Fira Mono, monospace', fontSize: 13 }}
    >
      <div className="text-gray-700 font-semibold mb-1">Calculation Console</div>
      <div className="bg-gray-50 rounded p-1 text-gray-800 whitespace-pre-wrap" style={{minHeight: 30}}>
        {logs.length === 0 ? (
          <span className="text-gray-400">No calculations yet.</span>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="mb-0.5">{log}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalculationConsole;
