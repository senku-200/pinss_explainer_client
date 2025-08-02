// utils/networkUtils.ts
import * as d3 from "d3";
export const layerSpacing = 200;
export const neuronSpacing = 80;

export function initializeNetwork(
  hiddenLayers: number,
  neuronsPerLayer: number
) {
  const centerY = 300;
  const layers = [];

  const inputLayer = [{ x: 100, y: centerY }];
  layers.push(inputLayer);

  for (let i = 0; i < hiddenLayers; i++) {
    const x = 100 + (i + 1) * layerSpacing;
    const offset = (neuronsPerLayer - 1) * neuronSpacing * 0.5;
    const layer = Array.from({ length: neuronsPerLayer }, (_, j) => ({
      x,
      y: centerY - offset + j * neuronSpacing,
    }));
    layers.push(layer);
  }

  const outputX = 100 + (hiddenLayers + 1) * layerSpacing;
  layers.push([{ x: outputX, y: centerY }]);

  const weights = [];
  const biases = [];
  const activations = [];

  for (let i = 1; i < layers.length; i++) {
    const wLayer = [];
    const bLayer = [];
    const aLayer = [];

    for (let j = 0; j < layers[i].length; j++) {
      const weightsToNeuron = Array(layers[i - 1].length)
        .fill(0)
        .map(() => +(Math.random() * 2 - 1));
      wLayer.push(weightsToNeuron);
      bLayer.push(+(Math.random() * 2 - 1));
      aLayer.push(0);
    }

    weights.push(wLayer);
    biases.push(bLayer);
    activations.push(aLayer);
  }

  return { positions: layers, weights, biases, activations };
}

export function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

type NetworkPositions = Array<Array<{ x: number; y: number }>>;
type NetworkWeights = number[][][];
type NetworkBiases = number[][];
type NetworkActivations = number[][];
type SetActivationsFn = (activations: NetworkActivations) => void;
type SetActiveLayerFn = (layer: number | null) => void;
type SetActiveNeuronFn = (neuron: number | null) => void;
type IsRunningRef = { current: boolean };

export async function runForwardPass({
  positions,
  weights,
  biases,
  activations,
  setActivations,
  setActiveLayer,
  setActiveNeuron,
  isRunningRef,
}: {
  positions: NetworkPositions;
  weights: NetworkWeights;
  biases: NetworkBiases;
  activations: NetworkActivations;
  setActivations: SetActivationsFn;
  setActiveLayer: SetActiveLayerFn;
  setActiveNeuron: SetActiveNeuronFn;
  isRunningRef: IsRunningRef;
}) {
  const newActivations = JSON.parse(JSON.stringify(activations));

  for (let layer = 1; layer < positions.length; layer++) {
    for (let neuron = 0; neuron < positions[layer].length; neuron++) {
      if (!isRunningRef.current) return;

      setActiveLayer(layer - 1);
      setActiveNeuron(neuron);

      const inputs = layer === 1 ? [1] : newActivations[layer - 2];
      const weightsToThisNeuron = weights[layer - 1][neuron];
      const bias = biases[layer - 1][neuron];

      const weightedSum = weightsToThisNeuron.reduce(
        (sum, w, i) => sum + w * inputs[i],
        bias
      );
      const output = sigmoid(weightedSum);

      // Debug log
      console.group(`Layer ${layer} - Neuron ${neuron}`);
      console.log("Inputs: ", inputs);
      console.log("Weights: ", weightsToThisNeuron);
      console.log("Bias: ", bias);
      console.log("Weighted sum: ", weightedSum.toFixed(4));
      console.log("Activation (output): ", output.toFixed(4));
      console.groupEnd();

      newActivations[layer - 1][neuron] = output;
      setActivations([...newActivations]);

      await new Promise((res) => setTimeout(res, 800));
    }
  }

  setActiveLayer(null);
  setActiveNeuron(null);

  return newActivations[newActivations.length - 1][0];
}

export function generatePath(
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const path = new Path2D();
  const svgPath = d3.path();

  svgPath.moveTo(from.x, from.y);

  if (dy === 0) {
    const smallCurve = 0.1;
    svgPath.bezierCurveTo(
      from.x + dx / 3,
      from.y - smallCurve,
      to.x - dx / 3,
      to.y - smallCurve,
      to.x,
      to.y
    );
  } else {
    svgPath.bezierCurveTo(
      from.x + dx / 2,
      from.y,
      to.x - dx / 2,
      to.y,
      to.x,
      to.y
    );
  }

  return svgPath.toString();
}

export async function runBackwardPass({
  weights,
  biases,
  activations,
  setWeights,
  setBiases,
  learningRate,
  target,
  isRunningRef,
  setActiveLayer,
  setActiveNeuron,
}: {
  weights: number[][][];
  biases: number[][];
  activations: number[][];
  setWeights: (w: number[][][]) => void;
  setBiases: (b: number[][]) => void;
  learningRate: number;
  target: number;
  isRunningRef: { current: boolean };
  setActiveLayer: (i: number | null) => void;
  setActiveNeuron: (i: number | null) => void;
}) {
  if (!isRunningRef.current) return;

  const deltas: number[][] = [];

  // Output layer delta
  const output = activations.at(-1)?.[0] ?? 0;
  const error = output - target;
  const outputDelta = error * output * (1 - output);
  deltas.push([outputDelta]);

  // Hidden layers
  for (let l = activations.length - 2; l >= 0; l--) {
    const nextLayerDelta = deltas[0];
    const currentActivations = activations[l];
    const currentDelta = [];

    for (let i = 0; i < currentActivations.length; i++) {
      let deltaSum = 0;
      for (let j = 0; j < weights[l + 1].length; j++) {
        deltaSum += nextLayerDelta[j] * weights[l + 1][j][i];
      }
      const activation = currentActivations[i];
      currentDelta.push(deltaSum * activation * (1 - activation));
    }
    deltas.unshift(currentDelta); // insert at beginning
  }

  // Update weights and biases
  const newWeights = JSON.parse(JSON.stringify(weights));
  const newBiases = JSON.parse(JSON.stringify(biases));

  // Now update weights
  for (let l = 0; l < weights.length; l++) {
    for (let j = 0; j < weights[l].length; j++) {
      for (let k = 0; k < weights[l][j].length; k++) {
        const input = l === 0 ? 1 : activations[l - 1][k];
        newWeights[l][j][k] -= learningRate * deltas[l][j] * input;
      }
    }
  }

  // Update biases
  for (let l = 0; l < biases.length; l++) {
    for (let j = 0; j < biases[l].length; j++) {
      newBiases[l][j] -= learningRate * deltas[l][j];
    }
  }

  setWeights(newWeights);
  setBiases(newBiases);

  // Animate neuron updates
  for (let layer = activations.length - 1; layer >= 0; layer--) {
    for (let neuron = 0; neuron < activations[layer].length; neuron++) {
      if (!isRunningRef.current) return;
      setActiveLayer(layer);
      setActiveNeuron(neuron);
      await new Promise((res) => setTimeout(res, 500));
    }
  }

  console.log("Old Weights:", JSON.stringify(weights));
  console.log("Old Biases:", JSON.stringify(biases));
  console.log("New Weights:", JSON.stringify(newWeights));
  console.log("New Biases:", JSON.stringify(newBiases));

  setActiveLayer(null);
  setActiveNeuron(null);
}
