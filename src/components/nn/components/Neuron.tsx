// Neuron.tsx
import React from "react";

type NeuronProps = {
  neuron: { x: number; y: number };
  activation: number | string;
  bias?: number | string;
  weight?: number | string;
  label?: string;
  isActive?: boolean;
  isInputActive?: boolean;
};

export const Neuron: React.FC<NeuronProps> = ({
  neuron,
  activation,
  bias,
  weight,
  label,
  isActive,
  isInputActive,
}) => {
  let fillColor = "#fff";
  if (isActive) fillColor = "#facc15"; // orange for active
  else if (isInputActive) fillColor = "#38bdf8"; // blue for input
  return (
    <g transform={`translate(${neuron.x}, ${neuron.y})`}>
      <circle
        r={20}
        fill={fillColor}
        stroke="#333"
        strokeWidth={2}
      />
      <text y={5} textAnchor="middle" fontSize="10" fill="#111" fontWeight="bold">
        {activation}
      </text>
      {bias !== undefined && (
        <text y={30} textAnchor="middle" fontSize="8" fill="#666">
          b={bias}
        </text>
      )}
      {weight !== undefined && (
        <text y={-40} textAnchor="middle" fontSize="8" fill="#22c55e">
          w={weight}
        </text>
      )}
      {label && (
        <text y={-25} textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="bold">
          {label}
        </text>
      )}
    </g>
  );
};
