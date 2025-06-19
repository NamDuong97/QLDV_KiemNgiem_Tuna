import {
  Clipboard,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  Filter,
} from "react-feather";
import Card from "./Card";
import SamplesChart from "./SamplesChart";
import SampleTypesChart from "./SampleTypesChart";
import RecentSamplesTable from "./RecentSamplesTable";

const Dashboard = () => {
  return (
    <div className="p-6 bg-blue-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Tổng quan</h1>
        <div>
          <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <Plus className="inline w-4 h-4 mr-1" /> Mẫu mới
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <Filter className="inline w-4 h-4 mr-1" /> Lọc
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Tổng mẫu"
          value="1,284"
          icon={<Clipboard className="w-6 h-6" />}
          trend="up"
          trendValue="12%"
          trendIcon={<TrendingUp className="inline w-4 h-4 mr-1" />}
          bgColor="bg-indigo-100"
          textColor="text-indigo-600"
        />
        <Card
          title="Đã hoàn thành"
          value="876"
          icon={<CheckCircle className="w-6 h-6" />}
          trend="up"
          trendValue="8%"
          trendIcon={<TrendingUp className="inline w-4 h-4 mr-1" />}
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <Card
          title="Đang xử lý"
          value="328"
          icon={<Clock className="w-6 h-6" />}
          trend="up"
          trendValue="5%"
          trendIcon={<TrendingUp className="inline w-4 h-4 mr-1" />}
          bgColor="bg-yellow-100"
          textColor="text-yellow-600"
        />
        <Card
          title="Không đạt"
          value="80"
          icon={<AlertTriangle className="w-6 h-6" />}
          trend="down"
          trendValue="3%"
          trendIcon={<TrendingDown className="inline w-4 h-4 mr-1" />}
          bgColor="bg-red-100"
          textColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <SamplesChart />
        <SampleTypesChart />
      </div>

      <RecentSamplesTable />
    </div>
  );
};

export default Dashboard;
