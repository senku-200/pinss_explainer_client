import { useRef, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Equation from "./components/exponentialDecay/Equation";
import NeuralNetwork from "./components/nn/NeuralNetwork";
import LiveGraphs from "./components/LiveGraphs";
import CalculationConsole from "./components/CalculationConsole";
import PINNsExplainer from "./components/PINNsExplainer";

function App() {
  const [layers, setLayers] = useState(1);
  const [neurons, setNeurons] = useState(1);
  const [learningRate, setLearningRate] = useState(0.01);
  const [decayConstant, setDecayConstant] = useState(0.1);
  const [epoch, setEpoch] = useState(10);
  const [lambdaPde, setLambdaPde] = useState(1.0);
  const [showWeight, setShowWeight] = useState(true);
  const [animateForwardBackward, setAnimateForwardBackward] = useState(true);
  const [speed, setSpeed] = useState(1); // 0=Superfast, 1=Fast, 2=Intermediate, 3=Slow

  // State for chart data
  const [losses, setLosses] = useState<number[]>([]);
  const [predictions, setPredictions] = useState<number[]>([]);
  const [targets, setTargets] = useState<number[]>([]);

  // Training finished state
  const [isFinished, setIsFinished] = useState(false);

  // Calculation console logs
  const [calcLogs, setCalcLogs] = useState<string[]>([]);

  type NeuralNetworkHandle = {
    start: () => void;
    stop: () => void;
    resetNetwork?: () => void;
  };

  const nnRef = useRef<NeuralNetworkHandle>(null);

  const handleResetNetwork = () => {
    nnRef.current?.resetNetwork?.();
    setLosses([]);
    setPredictions([]);
    setTargets([]);
    setIsFinished(false);
  };

  return (
    <>
      <NavBar />
      <main className="h-full">
        <div>
          <SideBar
            layers={layers}
            setLayers={setLayers}
            neurons={neurons}
            setNeurons={setNeurons}
            learningRate={learningRate}
            setLearningRate={setLearningRate}
            decayConstant={decayConstant}
            setDecayConstant={setDecayConstant}
            epoch={epoch}
            setEpoch={setEpoch}
            lambdaPde={lambdaPde}
            setLambdaPde={setLambdaPde}
            showWeight={showWeight}
            setShowWeight={setShowWeight}
            animateForwardBackward={animateForwardBackward}
            setAnimateForwardBackward={setAnimateForwardBackward}
            speed={speed}
            setSpeed={setSpeed}
            nnRef={nnRef}
            isFinished={isFinished}
            setIsFinished={setIsFinished}
            onResetNetwork={handleResetNetwork}
          />
          <div className="relative left-96 w-[calc(100%-24rem)] top-20 h-10 p-10">
            <div className="flex justify-between">
              <Equation />
              <div>
                <CalculationConsole logs={calcLogs} />
              </div>
            </div>
            <div className="w-full px-10 py-5 h-100">
              <NeuralNetwork
                ref={nnRef}
                hiddenLayers={layers}
                neuronsPerLayer={neurons}
                learningRate={learningRate}
                decayConstant={decayConstant}
                epoch={epoch}
                lambdaPde={lambdaPde}
                speed={speed}
                setLosses={setLosses}
                setPredictions={setPredictions}
                setTargets={setTargets}
                onFinished={() => setIsFinished(true)}
                onCalculation={setCalcLogs}
                losses={losses}
              />
            </div>
            <div className="mt-2 relative -top-2">
              <LiveGraphs
                losses={losses}
                predictions={predictions}
                targets={targets}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 relative top-[100vh]">
          <PINNsExplainer />
        </div>
      </main>
    </>
  );
}

export default App;
