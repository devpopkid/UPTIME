import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

const MonitorCard = ({ mon }) => {
  const chartData = {
    labels: mon.history.map((h) => new Date(h.time).toLocaleTimeString()),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: mon.history.map((h) => h.responseTime),
        borderColor: mon.history.at(-1)?.status === 'UP' ? 'lime' : 'red',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{mon.name}</h2>
        <span className={`px-2 py-1 rounded text-sm ${mon.history.at(-1)?.status === 'UP' ? 'bg-green-600' : 'bg-red-600'}`}>
          {mon.history.at(-1)?.status || 'N/A'}
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-2">{mon.url}</p>
      <Line data={chartData} height={200} />
    </div>
  );
};

export default MonitorCard;
