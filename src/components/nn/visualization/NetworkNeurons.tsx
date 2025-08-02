// NetworkNeurons.tsx
import React from "react";
import { Neuron as NeuronComponent } from "../components/Neuron";

export type NeuronHighlight = {
  layer: number;
  index: number;
  type: "active" | "input";
};

export type NetworkNeuronsProps = {
  positions: { x: number; y: number }[][];
  activations: number[][];
  biases: number[][][];
  weights?: number[][][];
  highlights?: NeuronHighlight[];
  inputValue?: number;
};

export const NetworkNeurons: React.FC<NetworkNeuronsProps> = ({
  positions,
  activations,
  biases,
  weights = [],
  highlights = [],
  inputValue,
}) => {
  return (
    <svg width="100%" height="100%" className="absolute left-0 top-0 z-10">
      {positions.map((layer, i) =>
        // For input layer, render as many neurons as there are input values
        (i === 0 && Array.isArray(inputValue)
          ? layer.slice(0, inputValue.length)
          : layer
        ).map((neuron, j) => {
          let activationVal = "-";
          // Defensive: If activations has fewer layers than positions, fill with '-'
          const act = activations[i]?.[j];
          if (typeof act === "number" && !isNaN(act)) {
            activationVal = act.toFixed(2);
          } else if (i > activations.length - 1 && i !== 0) {
            // For output layer missing in activations, try to use last available activation
            const lastLayer = activations[activations.length - 1];
            if (lastLayer && typeof lastLayer[j] === 'number') {
              activationVal = lastLayer[j].toFixed(2);
            }
          }
          // Only show bias for non-input neurons
          const biasVal =
            i === 0
              ? undefined
              : typeof biases[i - 1]?.[0]?.[j] === "number"
              ? biases[i - 1][0][j].toFixed(2)
              : undefined;
          const label = undefined;
          const isActive = highlights.some(
            (h) => h.layer === i && h.index === j && h.type === "active"
          );
          const isInputActive = highlights.some(
            (h) => h.layer === i && h.index === j && h.type === "input"
          );
          // For the currently active output neuron, display outgoing weights above each input neuron
          let outgoingWeightLabels = null;
          if (i > 0 && weights[i - 1] && isActive) {
            // For each neuron in the previous layer
            outgoingWeightLabels = positions[i - 1].map((srcNeuron, k) => {
              const weightVal =
                typeof weights[i - 1][k]?.[j] === 'number'
                  ? weights[i - 1][k][j].toFixed(2)
                  : '?';
              // Position label above the input neuron
              const x = srcNeuron.x;
              const y = srcNeuron.y - 25; // Fixed space above for all
              return (
                <text
                  key={`wlabel-${i}-${j}-${k}`}
                  x={x}
                  y={y}
                  fontSize="9"
                  fontWeight="bold"
                  fill="#22c55e"
                  textAnchor="middle"
                  style={{ pointerEvents: 'none' }}
                >
                  w={weightVal}
                </text>
              );
            });
          }
          // For input neuron, show inputValue inside
          let activationDisplay = activationVal;
          if (i === 0 && Array.isArray(inputValue)) {
            activationDisplay = typeof inputValue[j] !== 'undefined' ? String(inputValue[j]) : '-';
          } else if (i === 0 && typeof inputValue !== 'undefined') {
            activationDisplay = String(inputValue);
          }
          return (
            <g key={`neuron-group-${i}-${j}`}>
              {outgoingWeightLabels}
              <NeuronComponent
                neuron={neuron}
                activation={activationDisplay}
                bias={biasVal}
                label={label}
                isActive={isActive}
                isInputActive={isInputActive}
              />
            </g>
          );
        })
      )}
    </svg>
  );
};

// Export default for component
export default NetworkNeurons;
