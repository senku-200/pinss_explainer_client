import React from "react";

type ResetButtonProps = {
  setLayers: (value: number) => void;
  setNeurons: (value: number) => void;
  setLearningRate: (value: number) => void;
  setDecayConstant: (value: number) => void;
  setShowWeight: (value: boolean) => void;
  setAnimateForwardBackward: (value: boolean) => void;
  onClick?: () => void;
};

const ResetButton: React.FC<ResetButtonProps> = ({
  setLayers,
  setNeurons,
  setLearningRate,
  setDecayConstant,
  setShowWeight,
  setAnimateForwardBackward,
  onClick,
}) => (
  <button
    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
    onClick={() => {
      setLayers(1);
      setNeurons(1);
      setLearningRate(0.01);
      setDecayConstant(0.1);
      setShowWeight(true);
      setAnimateForwardBackward(true);
      if (onClick) onClick();
    }}
  >
    Reset
  </button>
);

export default ResetButton;
