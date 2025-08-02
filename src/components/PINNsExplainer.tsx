import React from "react";
import pinnsArchitecture from "../assets/pinns_architecture.png";
import tenEpochTraining from "../assets/ten_epoch_image.png";
import hundredEpochTraining from "../assets/hundread_epoch_img.png";
import pinnsvsnn from "../assets/pinss_vs_nn.png";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const PINNsExplainer: React.FC = () => (
  <section className="max-w-3xl mx-auto my-12 p-6 bg-white rounded">
    <h1 className="text-3xl font-bold text-purple-700 mb-4">
      Physics-Informed Neural Networks (PINNs) Explained
    </h1>

    <h2 className="text-2xl font-semibold text-purple-600 mt-8 mb-2">
      Before PINNs: Traditional Neural Networks
    </h2>
    <p className="mb-4">
      <b>Neural networks</b> are computational models inspired by the human
      brain. They consist of layers of interconnected nodes (neurons), where
      each connection has a <b>weight</b> and each neuron has a <b>bias</b>.
      Neural networks learn complex patterns from data by adjusting these
      weights and biases during training. However, traditional neural networks
      only learn from data—they do not "know" or enforce the underlying physical
      laws of the system being modeled.
    </p>
    <ul className="list-disc ml-8 mb-4">
      <li>
        <b>Weights:</b> Parameters that scale the input signals between neurons,
        determining the strength and direction of influence.
      </li>
      <li>
        <b>Biases:</b> Parameters added to the weighted sum before activation,
        allowing the network to shift the activation function.
      </li>
    </ul>
    <h3 className="text-xl font-semibold text-purple-500 mt-6 mb-2">
      Common Hyperparameters
    </h3>
    <ul className="list-disc ml-8 mb-4">
      <li>
        <b>Number of Layers:</b> Controls the depth of the network.
      </li>
      <li>
        <b>Neurons per Layer:</b> Controls the width of the network.
      </li>
      <li>
        <b>Learning Rate:</b> Determines how much the weights and biases are
        updated during each training step.
      </li>
      <li>
        <b>Epochs:</b> The number of times the network sees the entire dataset
        during training.
      </li>
    </ul>

    <h2 className="text-2xl font-semibold text-purple-600 mt-8 mb-2">
      What is a PINN?
    </h2>
    <p className="mb-4">
      <b>Physics-Informed Neural Networks (PINNs)</b> extend traditional neural
      networks by embedding physical laws—typically expressed as partial
      differential equations (PDEs)—directly into the learning process. PINNs
      use both data and the governing equations to make predictions that are
      consistent with known physics, even in regions where data is sparse or
      noisy.
    </p>
    <ul className="list-disc ml-8 mb-4">
      <li>
        <b>Coordinates:</b> Space and/or time points (e.g.,{" "}
        <InlineMath math={"x, t"} />)
      </li>
      <li>
        <b>Boundary/Initial Conditions:</b> Known values at boundaries or
        initial time
      </li>
      <li>
        <b>Physical Parameters:</b> (Optional) Unknowns to be inferred
      </li>
    </ul>
    <h3 className="text-xl font-semibold text-purple-500 mt-6 mb-2">
      Additional Hyperparameters in PINNs
    </h3>
    <ul className="list-disc ml-8 mb-4">
      <li>
        <b>Decay Constant (λ):</b> The physical parameter in the exponential
        decay equation, which can also be learned or set.
      </li>
      <li>
        <b>
          λ<sub>PDE</sub> (Physics Loss Weight):
        </b>{" "}
        Balances the importance of fitting the data versus satisfying the
        physics equation.
      </li>
      <li>
        <b>Initial/Boundary Conditions:</b> Known values used to guide the
        solution at the start or boundaries of the domain.
      </li>
    </ul>
    <h2 className="text-2xl font-semibold text-purple-600 mt-8 mb-2">
      Inputs to a PINN
    </h2>
    <ul className="list-disc ml-8 mb-4">
      <li>
        <b>Coordinates:</b> Space and/or time points (e.g.,{" "}
        <InlineMath math={"x, t"} />)
      </li>
      <li>
        <b>Boundary/Initial Conditions:</b> Known values at boundaries or
        initial time
      </li>
      <li>
        <b>Physical Parameters:</b> (Optional) Unknowns to be inferred
      </li>
    </ul>
    <h2 className="text-2xl font-semibold text-purple-600 mt-8 mb-2">
      What is a Neural Network?
    </h2>
    <p className="mb-4">
      A <b>neural network</b> is a computational model inspired by the human
      brain. It consists of layers of interconnected nodes (neurons), where each
      connection has an associated <b>weight</b> and each neuron has a{" "}
      <b>bias</b>. Neural networks are capable of learning complex patterns from
      data by adjusting these weights and biases during training.
    </p>
    <ul className="list-disc ml-8 mb-4">
      <li>
        <b>Weights:</b> Parameters that scale the input signals between neurons.
        They determine the strength and direction of the influence between
        neurons.
      </li>
      <li>
        <b>Biases:</b> Parameters added to the weighted sum before applying the
        activation function, allowing the network to fit the data better by
        shifting the activation.
      </li>
    </ul>
    <h3 className="text-xl font-semibold text-purple-500 mt-6 mb-2">
      Hyperparameters in PINNs
    </h3>
    <ul className="list-disc ml-8 mb-4">
      <li>
        <b>Number of Layers:</b> Controls the depth of the network (how many
        transformations the input undergoes).
      </li>
      <li>
        <b>Neurons per Layer:</b> Controls the width of the network (how many
        features are learned at each step).
      </li>
      <li>
        <b>Learning Rate:</b> Determines how much the weights and biases are
        updated during each training step.
      </li>
      <li>
        <b>Decay Constant (λ):</b> The physical parameter in the exponential
        decay equation, which can also be learned or set.
      </li>
      <li>
        <b>Epochs:</b> The number of times the network sees the entire dataset
        during training.
      </li>
      <li>
        <b>
          λ<sub>PDE</sub> (Physics Loss Weight):
        </b>{" "}
        Balances the importance of fitting the data versus satisfying the
        physics equation.
      </li>
      <li>
        <b>Initial/Boundary Conditions:</b> Known values used to guide the
        solution at the start or boundaries of the domain.
      </li>
    </ul>
    <h2
      id="pinn-architecture"
      className="text-2xl font-semibold text-purple-600 mt-8 mb-2 flex items-center gap-2"
    >
      PINN Architecture
      <button
        title="Jump to PINN Architecture"
        className="ml-2 text-lg text-gray-400 hover:text-purple-700 transition-colors"
        onClick={() => {
          document
            .getElementById("pinn-architecture")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span role="img" aria-label="equation">
          ∑
        </span>
      </button>
    </h2>
    <p className="mb-4">
      A PINN typically consists of a feedforward neural network that takes
      coordinates as input and outputs the predicted physical quantity (e.g.,
      temperature, velocity). The loss function combines data loss and physics
      loss:
    </p>
    <BlockMath
      math={
        "\\text{Total Loss} = \\text{Data Loss} + \\lambda \\times \\text{Physics Loss}"
      }
    />
    <p className="mb-4">
      The <b>Physics Loss</b> is computed by evaluating the residuals of the
      governing PDE, e.g.:
    </p>
    <BlockMath math={"\\frac{dN}{dt} + \\lambda N = 0"} />
    <div className="my-8 flex flex-col items-center justify-center">
      <div className="h-64 flex items-center justify-center">
        <img
          src={pinnsArchitecture}
          alt="PINN Architecture Diagram"
          className="h-full object-contain"
          width={800}
        />
      </div>
      <a
        href="https://medium.com/@vivek-karmarkar/a-short-introduction-to-physics-informed-neural-networks-pinns-cd342f5a3c5e"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-xs text-gray-500 hover:underline hover:text-purple-700 transition-colors"
      >
        Source:
        medium.com/@vivek-karmarkar/a-short-introduction-to-physics-informed-neural-networks-pinns-cd342f5a3c5e
      </a>
    </div>
    <h2
      id="exponential-decay"
      className="text-2xl font-semibold text-purple-600 mt-8 mb-2 flex items-center gap-2"
    >
      Case Study: Exponential Decay & Why PINNs?
      <button
        title="Jump to Exponential Decay"
        className="ml-2 text-lg text-gray-400 hover:text-purple-700 transition-colors"
        onClick={() => {
          document
            .getElementById("exponential-decay")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span role="img" aria-label="equation">
          ∑
        </span>
      </button>
    </h2>
    <div className="flex flex-col items-center">
      <p className="mb-4 text-justify max-w-2xl">
        Let's consider the <b>exponential decay</b> process, a classic example
        in physics and engineering. The key equations are:
      </p>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Governing Equation:</span>
        <BlockMath math={"\\frac{dN}{dt} = -\\lambda N"} />
        <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-2">
          This differential equation describes how the quantity{" "}
          <InlineMath math={"N(t)"} /> decreases over time at a rate
          proportional to its current value, with{" "}
          <InlineMath math={"\\lambda"} /> as the decay constant.
        </p>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">
          Analytical Solution:
        </span>
        <BlockMath math={"N(t) = N_0 e^{-\\lambda t}"} />
        <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-2">
          This gives the exact value of <InlineMath math={"N(t)"} /> at any time{" "}
          <InlineMath math={"t"} />, starting from initial value{" "}
          <InlineMath math={"N_0"} />.
        </p>
      </div>
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Long-Time Limit:</span>
        <BlockMath math={"\\lim_{t \to infty} N(t) = 0"} />
        <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-2">
          As time goes to infinity, the quantity decays to zero.
        </p>
      </div>
      <p className="mb-4 text-justify max-w-2xl">
        <b>
          Why can't a standard neural network solve this physics problem well?
        </b>
        <br />A regular neural network can fit data points, but it doesn't
        "know" the underlying physics. It may produce outputs that fit the data
        but violate the decay law elsewhere, especially with limited or noisy
        data.
      </p>
      <div className="h-auto flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            src={pinnsvsnn}
            alt="PINN vs Standard Neural Network"
            className="h-full object-contain"
            width={800}
          />
        <small>PINN vs Standard Neural Network</small>
        </div>
      </div>
      <p className="mb-4 text-justify max-w-2xl">
        <b>How does a PINN help?</b>
        <br />
        A PINN incorporates the decay equation directly into its loss function.
        It penalizes the network if its output <InlineMath math={"N(t)"} /> does
        not satisfy <InlineMath math={"\\frac{dN}{dt} = -\\lambda N"} /> at
        sampled points. This ensures the learned solution respects the physics
        everywhere, not just at the data points.
      </p>
      <div className="my-8 h-auto w-full flex items-center justify-center">
        <div className="h-64 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <img
              src={tenEpochTraining}
              alt="PINN Architecture Diagram"
              className="h-full object-contain"
              width={800}
            />
            <small>Epoch: 10</small>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={hundredEpochTraining}
              alt="PINN Architecture Diagram"
              className="h-full object-contain"
              width={800}
            />
            <small>Epoch: 100</small>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PINNsExplainer;
