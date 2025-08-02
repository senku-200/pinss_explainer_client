import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import './LiveGraphs.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Props for live data
type LiveGraphsProps = {
  losses: number[];
  predictions: number[];
  targets: number[];
};

const LiveGraphs: React.FC<LiveGraphsProps> = ({ losses, predictions, targets }) => {
  const epochs = Array.from({ length: losses.length }, (_, i) => i + 1);

  const lossData = {
    labels: epochs,
    datasets: [
      {
        label: 'Loss',
        data: losses,
        fill: false,
        borderColor: '#6366f1',
        backgroundColor: 'transparent',
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const predData = {
    labels: epochs,
    datasets: [
      {
        label: 'Prediction',
        data: predictions,
        borderColor: '#10b981',
        backgroundColor: 'transparent',
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: 'Target',
        data: targets,
        borderColor: '#ef4444',
        backgroundColor: 'transparent',
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          font: { size: 13, weight: 'normal' },
          usePointStyle: true,
          boxWidth: 18,
          boxHeight: 3,
        },
      },
      title: {
        display: true,
        text: 'Loss vs Epoch',
        font: { size: 16, weight: 'bold' },
        padding: { top: 8, bottom: 8 },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Epoch',
          font: { size: 15 },
        },
        grid: {
          display: true,
          color: '#e5e7eb',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Loss',
          font: { size: 15 },
        },
        grid: {
          display: true,
          color: '#e5e7eb',
        },
      },
    },
  };

  const predOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          font: { size: 13, weight: 'normal' },
          usePointStyle: true,
          boxWidth: 18,
          boxHeight: 3,
        },
      },
      title: {
        display: true,
        text: 'Prediction vs Target',
        font: { size: 16, weight: 'bold' },
        padding: { top: 8, bottom: 8 },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Epoch',
          font: { size: 15 },
        },
        grid: {
          display: true,
          color: '#e5e7eb',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
          font: { size: 15 },
        },
        grid: {
          display: true,
          color: '#e5e7eb',
        },
      },
    },
  };

  return (
    <div className="live-graphs-container" style={{ marginTop: '1.25rem', marginBottom: '0.5rem', height: '8rem' }}>
      <div className="graph-box" style={{ width: 260, height: 180 }}>
        <Line data={lossData} options={options} width={260} height={180} />
      </div>
      <div className="graph-box" style={{ width: 260, height: 180 }}>
        <Line data={predData} options={predOptions} width={260} height={180} />
      </div>
    </div>
  );
};

export default LiveGraphs;
