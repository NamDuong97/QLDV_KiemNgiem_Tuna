const StatusBadge = ({ status }: any) => {
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case "chờ xử lý":
        return "status-pending";
      case "đã duyệt":
        return "status-approved";
      case "từ chối":
        return "status-rejected";
      case "đang xử lý":
        return "status-processing";
      case "hoàn thành":
        return "status-completed";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return <span className={`status-badge2 ${getStatusClass()}`}>{status}</span>;
};

export default StatusBadge;
