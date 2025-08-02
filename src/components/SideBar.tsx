import React from "react";
import { SpeedSlider } from "./common/sideBar/SpeedSlider";
import SliderInput from "./common/sideBar/SliderInput";
import { ConstantInputs } from "./common/sideBar/ConstantInputs";
// import { InputToggle } from "./common/sideBar/InputToggle";
import ResetButton from "./common/sideBar/ResetButton";
import BuiltButton from "./common/sideBar/BuiltButton";
// import PauseResumeButton from "./common/sideBar/PauseResumeButton";

type NeuralNetworkHandle = {
  start: () => void;
  stop: () => void;
  pause?: () => void;
  play?: () => void;
  isRunning?: () => boolean;
  isPaused?: () => boolean;
  resetNetwork?: () => void;
};
export type SideBarProps = {
  layers: number;
  setLayers: (val: number) => void;
  neurons: number;
  setNeurons: (val: number) => void;
  learningRate: number;
  setLearningRate: (val: number) => void;
  decayConstant: number;
  setDecayConstant: (val: number) => void;
  epoch: number;
  setEpoch: (val: number) => void;
  showWeight: boolean;
  setShowWeight: (val: boolean) => void;
  animateForwardBackward: boolean;
  setAnimateForwardBackward: (val: boolean) => void;
  speed: number;
  setSpeed: (val: number) => void;
  lambdaPde: number;
  setLambdaPde: (val: number) => void;
  nnRef: React.RefObject<NeuralNetworkHandle | null>;
  isFinished: boolean;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  onResetNetwork?: () => void;
};

const SideBar: React.FC<SideBarProps> = ({
  layers,
  setLayers,
  neurons,
  setNeurons,
  learningRate,
  setLearningRate,
  decayConstant,
  setDecayConstant,
  epoch,
  setEpoch,
  lambdaPde,
  setLambdaPde,
  showWeight,
  setShowWeight,
  animateForwardBackward,
  setAnimateForwardBackward,
  speed,
  setSpeed,
  nnRef,
  isFinished,
  setIsFinished,
  onResetNetwork,
}) => {
  // UI state for training controls
  const [isTraining, setIsTraining] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isStarted, setIsStarted] = React.useState(false);

  // Poll running/paused state from nnRef
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (nnRef?.current) {
        const running = !!nnRef.current.isRunning?.();
        const paused = !!nnRef.current.isPaused?.();
        setIsTraining(running);
        setIsPaused(paused);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [nnRef]);

  // Reset state when model is rebuilt
  const handleBuild = () => {
    setIsTraining(true);
    setIsPaused(false);
    setIsFinished(false);
    setIsStarted(true);
    nnRef?.current?.start();
  };
  // Reset isStarted when training is finished or model is reset
  // React.useEffect(() => {
  //   if (isFinished) setIsStarted(false);
  // }, [isFinished]);

  // Stop disables controls

  // Stop/Resume logic
  const handleStop = () => {
    if (nnRef?.current?.pause) nnRef.current.pause();
    setIsPaused(true);
    setIsFinished(false);
    // Do NOT setIsTraining(false) here; let polling update it only when training is truly finished
  };
  const handleResume = () => {
    if (nnRef?.current?.play) nnRef.current.play();
    setIsPaused(false);
    setIsFinished(false);
    // Do NOT setIsTraining(true) here; let polling update it
  };
  return (
    <aside className="absolute left-0 top-20 p-4 border-r-2 border-b-2 border-gray-200 bg-white w-96 pt-5 pl-7">
      <h2 className="text-2xl font-semibold mb-5">Model Builder</h2>
      <div className="flex flex-col gap-7">
        <SpeedSlider value={speed} onChange={setSpeed} />
        <SliderInput
          value={layers}
          setValue={setLayers}
          label="Hidden Layers"
          disabled={isStarted}
        />
        <SliderInput
          value={neurons}
          setValue={setNeurons}
          label="Neurons per Layer"
          disabled={isStarted}
        />
        <ConstantInputs
          value={learningRate}
          setValue={setLearningRate}
          label="Learning Rate"
          step={0.001}
          disabled={isStarted && !isPaused && !isFinished}
        />
        <ConstantInputs
          value={decayConstant}
          setValue={setDecayConstant}
          label="Decay Constant"
          step={0.1}
          disabled={isStarted && !isPaused && !isFinished}
        />
        <ConstantInputs
          value={epoch}
          setValue={setEpoch}
          label="Epoch"
          step={1}
          disabled={isStarted && !isPaused && !isFinished}
        />
        <ConstantInputs
          value={lambdaPde}
          setValue={setLambdaPde}
          label="Lambda PDE"
          step={0.01}
          disabled={isStarted && !isPaused && !isFinished}
        />
        <div className="flex gap-4 mb-7">
          <ResetButton
            setLayers={setLayers}
            setNeurons={setNeurons}
            setLearningRate={setLearningRate}
            setDecayConstant={setDecayConstant}
            setShowWeight={setShowWeight}
            setAnimateForwardBackward={setAnimateForwardBackward}
            onClick={() => {
              // Reset weights, biases, animation, and clear previousParams
              if (nnRef?.current?.stop) nnRef.current.stop();
              if (nnRef?.current?.resetNetwork) nnRef.current.resetNetwork();
              if (typeof onResetNetwork === "function") onResetNetwork();
              setIsFinished(true);
              setIsStarted(false);
              setIsTraining(false);
              setIsPaused(false);
            }}
          />
          {(!isStarted || isFinished) && (
            <div onClick={handleBuild} style={{ display: "inline-block" }}>
              <BuiltButton
                layers={layers}
                neurons={neurons}
                learningRate={learningRate}
                decayConstant={decayConstant}
                showWeight={showWeight}
                animateForwardBackward={animateForwardBackward}
                nnRef={nnRef}
                setIsStarted={setIsStarted}
              />
            </div>
          )}
          {/* Show Stop only while training and not paused, Resume only when paused and not finished, nothing when finished, and only after started */}
          {isStarted && !isFinished && isTraining && !isPaused && (
            <button
              className="px-4 py-2 text-white rounded bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
              onClick={handleStop}
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" y="3" width="4" height="14" fill="white" />
                  <rect x="12" y="3" width="4" height="14" fill="white" />
                </svg>
                Stop
              </span>
            </button>
          )}
          {isStarted && !isFinished && isPaused && (
            <button
              className="px-4 py-2 text-white rounded bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              onClick={handleResume}
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="5,3 19,10 5,17" fill="white" />
                </svg>
                Resume
              </span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
