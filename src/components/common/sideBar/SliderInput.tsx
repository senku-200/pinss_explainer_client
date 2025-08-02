import React from "react";

interface SliderInputProps {
  value: number;
  setValue: (value: number) => void;
  label: string;
  disabled?: boolean;
}

const SliderInput: React.FC<SliderInputProps> = ({ value, setValue, label, disabled }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h2>{label}</h2>
      <input
        type="number"
        value={value}
        min={1}
        max={4}
        onChange={(e) => setValue(Math.min(4, Math.max(1, +e.target.value)))}
        className="w-12 px-2 py-1 border border-gray-300 rounded text-sm"
        disabled={disabled}
      />
    </div>
    <div className="flex items-center gap-3">
      <input
        type="range"
        min="1"
        max="4"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className={`w-full h-2 rounded-full appearance-none cursor-pointer ${disabled ? 'bg-gray-300' : 'bg-gradient-to-r from-blue-500 to-blue-300'}`}
        style={{
          background: disabled
            ? '#e5e7eb'
            : `linear-gradient(to right, #2196F3 ${
                (value - 1) * 33.33
              }%, #e5e7eb ${(value - 1) * 25}%)`,
        }}
        disabled={disabled}
      />
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${disabled ? '#a3a3a3' : '#2563eb'};
          border: 2px solid #fff;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
          transition: background 0.2s;
        }
        input[type=range]:disabled::-webkit-slider-thumb {
          background: #a3a3a3;
        }
        input[type=range]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${disabled ? '#a3a3a3' : '#2563eb'};
          border: 2px solid #fff;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
          transition: background 0.2s;
        }
        input[type=range]:disabled::-moz-range-thumb {
          background: #a3a3a3;
        }
        input[type=range]::-ms-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${disabled ? '#a3a3a3' : '#2563eb'};
          border: 2px solid #fff;
          box-shadow: 0 0 2px rgba(0,0,0,0.2);
          transition: background 0.2s;
        }
        input[type=range]:disabled::-ms-thumb {
          background: #a3a3a3;
        }
      `}</style>
    </div>
  </div>
);

export default SliderInput;
