import React from "react";

export type SpeedSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const speedLabels = ["Superfast", "Fast", "Intermediate", "Slow"];
const gradient = "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)";

export const SpeedSlider: React.FC<SpeedSliderProps> = ({ value, onChange }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <label style={{ fontWeight: "bold", marginBottom: 8, display: "block" }}>
        Animation Speed
      </label>
      <input
        type="range"
        min={0}
        max={3}
        step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: "#8b5cf6",
          background: gradient,
          height: 6,
          borderRadius: 3,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 4 }}>
        {speedLabels.map((label, idx) => (
          <span key={label} style={{ color: value === idx ? "#8b5cf6" : "#555" }}>{label}</span>
        ))}
      </div>
    </div>
  );
};
