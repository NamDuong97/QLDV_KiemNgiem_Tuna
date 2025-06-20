import { Line } from "react-chartjs-2";
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
} from "chart.js";

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

const SamplesChart = () => {
  const data = {
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        label: "Tổng mẫu",
        data: [65, 78, 90, 85, 92, 110, 120, 130, 115, 105, 95, 80],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Đạt",
        data: [50, 60, 70, 65, 75, 90, 100, 110, 95, 85, 75, 65],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          color: "#6b7280", // optional: màu cho trục y
        },
        grid: {
          drawBorder: false,
          color: "#e5e7eb",
        },
      },
      x: {
        type: "category" as const,
        ticks: {
          color: "#6b7280",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-700">
          Thống kê mẫu theo tháng
        </h2>
        <div className="flex items-center">
          <select className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Năm 2023</option>
            <option>Năm 2022</option>
          </select>
        </div>
      </div>
      <div style={{ height: "300px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SamplesChart;
