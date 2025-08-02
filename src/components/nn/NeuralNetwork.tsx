import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import NetworkConnections from "./visualization/NetworkConnections";
import NetworkNeurons from "./visualization/NetworkNeurons";
import type { NeuronHighlight } from "./visualization/NetworkNeurons";

export type NeuralNetworkProps = {
  hiddenLayers: number;
  neuronsPerLayer: number;
  showWeight?: boolean;
  learningRate?: number;
  decayConstant?: number;
  epoch?: number;
  lambdaPde?: number;
  speed?: number;
  setLosses?: React.Dispatch<React.SetStateAction<number[]>>;
  setPredictions?: React.Dispatch<React.SetStateAction<number[]>>;
  setTargets?: React.Dispatch<React.SetStateAction<number[]>>;
  onFinished?: () => void;
  onCalculation?: (steps: string[]) => void;
  losses?: number[];
};

// Use Vite environment variable for backend URL
console.log(import.meta.env);
const URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
// const URL = "http://127.0.0.1:8000";

const inputData = [[0.0], [1.0], [0.5]];
const targetData = [[0.0], [1.0], [0.5]];
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

const computeActivations = (
  input: number[],
  weights: number[][][],
  biases: number[][][],
  onCalculation?: (steps: string[], l?: number, j?: number) => void,
  focus?: { layer: number; neuron: number }
): number[][] => {
  const layers: number[][] = [input];
  let calcSteps: string[] = [];
  for (let l = 0; l < weights.length; l++) {
    const prevActivations = layers[l];
    const currentWeights = weights[l];
    const currentBiases = biases[l]?.[0] ?? [];
    const currLayerSize = currentWeights[0]?.length || 0;

    const layerOutput: number[] = [];
    for (let j = 0; j < currLayerSize; j++) {
      let weightedSum = 0;
      let sumStr = "";
      for (let k = 0; k < prevActivations.length; k++) {
        weightedSum += prevActivations[k] * (currentWeights[k]?.[j] ?? 0);
        sumStr += `${k > 0 ? " + " : ""}${prevActivations[k].toFixed(2)}×${(
          currentWeights[k]?.[j] ?? 0
        ).toFixed(2)}`;
      }
      const bias = currentBiases[j] ?? 0;
      const z = weightedSum + bias;
      const a = sigmoid(z);
      layerOutput.push(a);
      // If this is the neuron in focus, collect its calculation
      if (focus && focus.layer === l + 1 && focus.neuron === j) {
        calcSteps = [
          `z = ${sumStr} + b = ${weightedSum.toFixed(4)} + ${bias.toFixed(
            4
          )} = ${z.toFixed(4)}`,
          `a = sigmoid(z) = 1 / (1 + exp(-${z.toFixed(4)})) = ${a.toFixed(4)}`,
        ];
      }
    }
    layers.push(layerOutput);
  }
  // If focus is provided, only call onCalculation for that neuron
  if (onCalculation && focus)
    onCalculation(
      calcSteps.length ? calcSteps : ["No calculations."],
      focus.layer,
      focus.neuron
    );
  // If no focus, call for first neuron in first hidden layer (default)
  if (onCalculation && !focus)
    onCalculation(calcSteps.length ? calcSteps : ["No calculations."]);

  return layers;
};

const NeuralNetwork = forwardRef(
  (
    {
      hiddenLayers = 1,
      neuronsPerLayer = 4,
      showWeight = false,
      learningRate = 0.01,
      decayConstant = 0.1,
      epoch = 10,
      setLosses,
      setPredictions,
      setTargets,
      onFinished,
      speed,
      onCalculation,
      losses,
      lambdaPde,
    }: NeuralNetworkProps,
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [positions, setPositions] = useState<{ x: number; y: number }[][]>(
      []
    );
    const [activations, setActivations] = useState<number[][]>([]);
    const [weights, setWeights] = useState<number[][][]>([]);
    const [biases, setBiases] = useState<number[][][]>([]);
    // Loss, predictions, targets state handled by parent (App)
    const [highlights, setHighlights] = useState<NeuronHighlight[]>([]);
    const [activeConnection, setActiveConnection] = useState<
      { layer: number; from: number; to: number } | undefined
    >(undefined);

    const weightsRef = useRef<number[][][]>([]);
    const biasesRef = useRef<number[][][]>([]);
    const speedRef = useRef<number>(speed);

    React.useEffect(() => {
      speedRef.current = speed;
    }, [speed]);

    // Only one input neuron visually, but inputData[0] can be a list
    // The input layer size should match inputData[0].length
    const inputLayerSize = inputData[0].length;
    const layerStructure = [
      inputLayerSize,
      ...new Array(hiddenLayers).fill(neuronsPerLayer),
      1,
    ];
    const svgWidth = Math.max(600, layerStructure.length * 130);
    const svgHeight = 350;

    const calculatePositions = (layerSizes: number[]) => {
      const layerSpacing = svgWidth / (layerSizes.length + 1);
      return layerSizes.map((count, layerIndex) => {
        const verticalSpacing = svgHeight / (count + 1);
        return Array.from({ length: count }, (_, neuronIndex) => ({
          x: (layerIndex + 1) * layerSpacing,
          y: (neuronIndex + 1) * verticalSpacing,
        }));
      });
    };

    React.useEffect(() => {
      const zeroWeights = [];
      const zeroBiases = [];
      for (let l = 0; l < layerStructure.length - 1; l++) {
        zeroWeights.push(
          Array(layerStructure[l])
            .fill(0)
            .map(() => Array(layerStructure[l + 1]).fill(0))
        );
        zeroBiases.push([Array(layerStructure[l + 1]).fill(0)]);
      }

      setWeights(zeroWeights);
      setBiases(zeroBiases);
      setPositions(calculatePositions(layerStructure));
      setActivations(
        computeActivations(inputData[0], zeroWeights, zeroBiases, onCalculation)
      );
      // Loss state handled by parent
    }, [hiddenLayers, neuronsPerLayer]);
    // setActivations(computeActivations(inputData[0], newWeights, newBiases, onCalculation));

    const sendTrainingRequest = async (previousParams?: {
      weights: number[][][];
      biases: number[][][];
    }) => {
      const payload: any = {
        inputs: inputData,
        targets: targetData,
        hidden_layers: new Array(hiddenLayers).fill(neuronsPerLayer),
        epochs: 1,
        learning_rate: learningRate,
        decay: decayConstant,
        lambda_pde: lambdaPde ?? 1.0,
        inputs_collocation: [[0.1], [0.3], [0.7], [0.9]],
      };
      if (previousParams) payload.previous_params = previousParams;

      const response = await fetch(`${URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Training request failed");
        return;
      }

      const data = await response.json();
      const newWeights = data.params.weights;
      const newBiases = data.params.biases;

      setWeights(newWeights);
      setBiases(newBiases);
      weightsRef.current = newWeights;
      biasesRef.current = newBiases;

      // Loss state handled by parent
      if (setLosses) setLosses((prev) => [...prev, data.losses?.[0] ?? 0]);
      if (setPredictions)
        setPredictions((prev) => [...prev, data.prediction?.[0]?.[0] ?? 0]);
      if (setTargets)
        setTargets((prev) => [...prev, data.target?.[0]?.[0] ?? 0]);
      setPositions(calculatePositions(layerStructure));
      const acts = computeActivations(
        inputData[0],
        newWeights,
        newBiases,
        onCalculation
      );
      setActivations(acts);
      // Trigger animation after model build
      await animateForwardPass();
    };

    // Stop mechanism
    const stopped = React.useRef(false);
    const paused = React.useRef(false);
    const stepRequested = React.useRef(false);

    // Animation function for forward pass
    const waitIfPaused = async () => {
      while (paused.current && !stepRequested.current && !stopped.current) {
        await new Promise((res) => setTimeout(res, 50));
      }
      if (stepRequested.current) stepRequested.current = false;
    };

    const animateForwardPass = async () => {
      stopped.current = false;
      const speedMap = [50, 200, 500, 1000];
      for (let l = 1; l < positions.length; l++) {
        // skip input layer
        for (let j = 0; j < positions[l].length; j++) {
          if (stopped.current) return;
          await waitIfPaused();
          if (stopped.current) return;
          // Show calculation for the currently focused neuron
          if (onCalculation) {
            computeActivations(
              inputData[0],
              weightsRef.current,
              biasesRef.current,
              onCalculation,
              { layer: l, neuron: j }
            );
          }
          const highlights: NeuronHighlight[] = [
            { layer: l, index: j, type: "active" },
          ];
          for (let k = 0; k < positions[l - 1].length; k++) {
            highlights.push({ layer: l - 1, index: k, type: "input" });
          }
          setHighlights(highlights);
          setActiveConnection(undefined);
          const delay = speedMap[speedRef.current] ?? 200;
          await new Promise((res) => setTimeout(res, delay));
        }
      }
      setHighlights([]);
      // Optionally clear calculation after animation
      if (onCalculation) onCalculation(["No calculations."]);
    };

    useImperativeHandle(ref, () => ({
      start: async () => {
        stopped.current = false;
        paused.current = false;
        const speedMap = [50, 200, 500, 1000];
        for (let ep = 0; ep < epoch; ep++) {
          if (stopped.current) return;
          await waitIfPaused();
          if (stopped.current) return;
          await sendTrainingRequest(
            weightsRef.current.length && biasesRef.current.length
              ? {
                  weights: weightsRef.current,
                  biases: biasesRef.current,
                }
              : undefined
          );
          const delay = speedMap[speedRef.current] ?? 200;
          if (ep < epoch - 1)
            await new Promise((res) => setTimeout(res, delay));
        }
        // Training finished
        if (typeof onFinished === "function") onFinished();
      },
      pause: () => {
        paused.current = true;
      },
      play: () => {
        paused.current = false;
        stopped.current = false;
      },
      step: () => {
        stepRequested.current = true;
      },
      stop: () => {
        stopped.current = true;
        paused.current = false;
      },
      animateForwardPass,
      isRunning: () => !stopped.current && !paused.current,
      isPaused: () => paused.current,
      resetNetwork: () => {
        // Clear weights, biases, activations, and refs
        const zeroWeights: number[][][] = [];
        const zeroBiases: number[][][] = [];
        for (let l = 0; l < layerStructure.length - 1; l++) {
          zeroWeights.push(
            Array(layerStructure[l])
              .fill(0)
              .map(() => Array(layerStructure[l + 1]).fill(0))
          );
          zeroBiases.push([Array(layerStructure[l + 1]).fill(0)]);
        }
        setWeights(zeroWeights);
        setBiases(zeroBiases);
        setActivations(
          computeActivations(
            inputData[0],
            zeroWeights,
            zeroBiases,
            onCalculation
          )
        );
        if (onCalculation) onCalculation(["No calculations."]);
        setHighlights([]);
        weightsRef.current = [];
        biasesRef.current = [];
      },
    }));

    // Use the losses prop directly
    let lossValue = undefined;
    if (
      typeof losses !== "undefined" &&
      Array.isArray(losses) &&
      losses.length > 0
    ) {
      lossValue = losses[losses.length - 1];
    }
    // Color: red for high, yellow for mid, green for low
    let lossColor = "#888";
    if (typeof lossValue === "number") {
      if (lossValue > 1) lossColor = "#dc2626"; // red-600
      else if (lossValue > 0.2) lossColor = "#facc15"; // yellow-400
      else lossColor = "#16a34a"; // green-600
    }
    // TEMP: Show activations and positions in overlay for debugging
    const debugOverlay = (
      <div style={{position:'absolute',right:0,top:0,zIndex:9999,background:'#fffbe6',color:'#333',fontSize:12,padding:8,border:'1px solid #facc15',maxWidth:400,overflow:'auto'}}>
        <div><b>positions:</b> {JSON.stringify(positions.map(l=>l.length))}</div>
        <div><b>activations (slice(1)):</b> {JSON.stringify(activations.slice(1).map(l=>l.length))}</div>
        <div><b>activations values:</b> {JSON.stringify(activations.slice(1))}</div>
      </div>
    );
    return (
      <div
        className="flex items-center justify-center w-full bg-white border rounded-lg px-2 overflow-x-auto relative"
        style={{ minHeight: 350 }}
      >
        <div className="absolute left-2 top-2 text-xs flex items-center">
          <span className="font-bold mr-1">Current Loss:</span>
          <span style={{ color: lossColor, fontWeight: 500 }}>
            {typeof lossValue === "number" ? lossValue.toFixed(4) : "-"}
          </span>
        </div>
        <div
          className="relative flex items-center justify-center"
          style={{ width: svgWidth, height: svgHeight }}
        >
          <svg
            width={svgWidth}
            height={svgHeight}
            className="absolute left-0 top-0 z-0 pointer-events-none"
          >
            {layerStructure.map((size, i) => (
              <text
                key={`layer-label-${i}`}
                x={(i + 1) * (svgWidth / (layerStructure.length + 1))}
                y={30}
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#444"
              >
                {i === 0
                  ? "Input"
                  : i === layerStructure.length - 1
                  ? "Output"
                  : `Hidden ${i}`}
              </text>
            ))}
          </svg>

          {positions[0] && positions[0][0] && (
            <div
              className="absolute flex flex-col items-end z-10 group"
              style={{
                minWidth: 0,
                left: `${positions[0][0].x - 170}px`,
                top: `${positions[0][0].y - 10}px`,
              }}
            >
              <span
                className="bg-blue-100 text-blue-700 text-xs rounded px-2 py-0.5 border border-blue-200 shadow-sm font-mono cursor-pointer relative"
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {(() => {
                  const max = 3;
                  const shown = inputData.slice(0, max);
                  const ellipsis = inputData.length > max ? ",.." : "";
                  return `[${shown
                    .map((item) => JSON.stringify(item))
                    .join(",")}${ellipsis}]`;
                })()}
              </span>

              <div
                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre pointer-events-none"
                style={{
                  minWidth: "120px",
                  maxWidth: "400px",
                  wordBreak: "break-all",
                  zIndex: 9999,
                }}
              >
                {JSON.stringify(inputData, null, 2)}
              </div>
            </div>
          )}
          <NetworkConnections
            positions={positions}
            weights={weights}
            showWeight={true}
            activeConnection={activeConnection}
          />
          <NetworkNeurons
            positions={positions}
            activations={activations.slice(1)}
            biases={biases}
            weights={weights}
            highlights={highlights}
            inputValue={inputData[0][0]}
          />
        </div>
      </div>
    );
  }
);

export default NeuralNetwork;
