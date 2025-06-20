export interface Sample {
  id: string;
  type: string;
  customer: string;
  date: string;
  status: "completed" | "processing" | "failed" | "pending";
  statusText: string;
}

export interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendValue: string;
  trendIcon: React.ReactNode;
  bgColor: string;
  textColor: string;
}
