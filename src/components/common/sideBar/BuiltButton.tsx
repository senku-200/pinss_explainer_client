import React from "react";
type NeuralNetworkHandle = {
  start: () => void;
  stop: () => void;
};
interface BuiltButtonProps {
  layers: number;
  neurons: number;
  learningRate: number;
  decayConstant: number;
  showWeight: boolean;
  animateForwardBackward: boolean;
  nnRef?: React.RefObject<NeuralNetworkHandle | null>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuiltButton: React.FC<BuiltButtonProps> = ({ nnRef, setIsStarted }) => (
  <button
    className="px-4 py-2 text-white rounded bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
    onClick={() => {
      if (nnRef?.current) {
        nnRef.current.start();
        console.log("Clicked start", nnRef.current);
      }
      setIsStarted(true);
    }}
  >
    Build Model
  </button>
);

export default BuiltButton;
