
<div align="center">
  <h1>PINNs Explainer</h1>
  <p><b>Interactive Visualizer and Explainer for Physics-Informed Neural Networks (PINNs)</b></p>
  <a href="https://github.com/senku-200/pinss_explainer_client" target="_blank">
    <img src="public/vite.svg" alt="Vite Logo" width="60" />
  </a>
</div>

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

---

## About

This project is an interactive web application for visualizing and explaining Physics-Informed Neural Networks (PINNs). It is designed to help users understand how PINNs work, compare them with standard neural networks, and experiment with their parameters in real time.

## Features
- **Live Graphs:** Visualize training progress, predictions, and loss curves.
- **Interactive Controls:** Adjust hyperparameters, pause/resume training, and reset experiments.
- **PINNs vs NN Comparison:** See side-by-side differences between PINNs and standard neural networks.
- **Equation Display:** View the mathematical equations being solved.
- **Modern UI:** Responsive and visually appealing interface built with React and Tailwind CSS.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/senku-200/pinss_explainer_client.git
   cd pinss_explainer_client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Usage
- Use the sidebar and top navigation to explore different features.
- Adjust sliders and toggles to change model parameters and see real-time updates.
- Click the GitHub icon in the navbar to view the source code.

## Project Structure
```
├── public/                  # Static assets (images, icons)
├── src/
│   ├── assets/              # Images and static resources
│   ├── components/          # React components
│   │   ├── common/          # Shared UI components (buttons, sliders)
│   │   ├── exponentialDecay/# Equation-related components
│   │   ├── nn/              # Neural network visualizations
│   │   └── ...
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── style.css                # Global styles
├── tailwind.config.js       # Tailwind CSS config
├── vite.config.ts           # Vite config
└── ...
```

## Tech Stack
- **React** (TypeScript)
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **SVG & Custom Graphics** (for visualizations)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

