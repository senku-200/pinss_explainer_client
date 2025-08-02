// NetworkConnections.tsx
import React from "react";
import { generatePath } from "../../../utils/networkUtils";

export type ConnectionProps = {
  positions: { x: number; y: number }[][];
  weights: number[][][];
  showWeight?: boolean;
  activeConnection?: { layer: number; from: number; to: number };
};

const NetworkConnections: React.FC<ConnectionProps> = ({
  positions,
  // weights,
  // showWeight = false,
  activeConnection,
}) => {
  if (positions.length < 2) return null;
  return (
    <svg width="100%" height="100%" className="absolute left-0 top-0 z-0">
      {positions.slice(0, -1).map((layer, i) =>
        layer.map((from, j) =>
          positions[i + 1]?.map((to, k) => {
            const pathD = generatePath(from, to);
            // const weight = weights[i]?.[j]?.[k] ?? 0;
                // Highlight if the from-neuron or to-neuron is highlighted as input or active
                let highlightColor = "#6366f1";
                let highlight = false;
                if (activeConnection &&
                    activeConnection.layer === i &&
                    activeConnection.from === j &&
                    activeConnection.to === k) {
                  highlightColor = "#facc15"; // active calculation (yellow)
                  highlight = true;
                }
            // Padding: move label slightly below the connection by using dy
            // Font size reduced to 10
            // Color: highlight when active, default otherwise
            // Calculate midpoint for label
            // const midX = (from.x + to.x) / 2;
            // const midY = (from.y + to.y) / 2 - 8; // 8px above the line
            return (
              <g key={`link-${i}-${j}-${k}`}>
                <path
                  id={`path-${i}-${j}-${k}`}
                  d={pathD}
                  stroke={highlightColor}
                  strokeWidth={highlight ? 4 : 2}
                  fill="none"
                />
                {/* Weight label removed; now shown above input neurons only */}
              </g>
            );
          })
        )
      )}
    </svg>
  );
};

export default NetworkConnections;
