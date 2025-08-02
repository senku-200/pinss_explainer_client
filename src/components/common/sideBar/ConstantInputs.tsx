import React from "react";

interface ConstantInputsProps {
  value: number;
  setValue: (value: number) => void;
  step: number;
  label: string;
  disabled?: boolean;
}

export const ConstantInputs: React.FC<ConstantInputsProps> = ({
  value,
  setValue,
  label,
  step,
  disabled
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <h2>{label}</h2>
      <input
        type="number"
        className={`px-2 py-2 border rounded text-sm w-20 ${disabled ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-700'}`}
        style={{
          borderColor: '#d1d5db', // Tailwind gray-300
          color: disabled ? '#9ca3af' : '#374151', // gray-400 if disabled, gray-700 if enabled
          cursor: disabled ? 'not-allowed' : 'auto',
          transition: 'background 0.2s, color 0.2s, border 0.2s',
        }}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        step={step}
        min="0"
        disabled={disabled}
      />
    </div>
  );
};
