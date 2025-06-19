import { DashboardCardProps } from "../../../../models/dashboard";

const Card = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  trendIcon,
  bgColor,
  textColor,
}: DashboardCardProps) => {
  return (
    <div className="dashboard-card p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
      <div className="mt-4">
        <span
          className={`text-sm font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trendIcon}
          {trendValue} so với tháng trước
        </span>
      </div>
    </div>
  );
};

export default Card;
