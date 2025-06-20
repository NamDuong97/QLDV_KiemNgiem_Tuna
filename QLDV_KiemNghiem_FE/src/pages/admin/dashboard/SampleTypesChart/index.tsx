import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SampleTypesChart = () => {
  const data = {
    labels: ["Thực phẩm", "Nước", "Dược phẩm", "Mỹ phẩm", "Khác"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#4f46e5",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#6b7280",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
    cutout: "65%",
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-700">Phân loại mẫu</h2>
        <div className="flex items-center">
          <select className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Quý 3/2023</option>
            <option>Quý 2/2023</option>
          </select>
        </div>
      </div>
      <div style={{ height: "300px" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default SampleTypesChart;
