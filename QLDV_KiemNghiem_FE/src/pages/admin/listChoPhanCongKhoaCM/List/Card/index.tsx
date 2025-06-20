import { Skeleton } from "@mui/material";

export interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendValue: string;
  trendIcon: React.ReactNode;
  bgColor: string;
  textColor: string;
  isLoading: boolean;
}

const Card = ({
  title,
  value,
  icon,
  bgColor,
  textColor,
  isLoading,
}: CardProps) => {
  return (
    <div className="dashboard-card p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {isLoading ? (
            <Skeleton variant="rounded" height={32} width={40} />
          ) : (
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
