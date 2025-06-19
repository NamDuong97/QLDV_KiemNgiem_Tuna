const SampleCard = ({ sample, isSelected, onSelect }: any) => {
  // Format date
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusColor = (status: any) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-green-100 text-green-800";
      case "Đang xử lý":
        return "bg-blue-100 text-blue-800";
      case "Chờ phân công":
        return "bg-yellow-100 text-yellow-800";
      case "Đã phân công":
        return "bg-purple-100 text-purple-800";
      case "Hủy":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get priority badge color
  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case "Cao":
        return "bg-red-100 text-red-800";
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800";
      case "Thấp":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden sample-card transition-all cursor-pointer ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
      onClick={() => onSelect(sample.id)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{sample.name}</h3>
            <p className="text-sm text-gray-500">{sample.id}</p>
          </div>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}} // Handled by the div click
            onClick={(e) => e.stopPropagation()}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              sample.status
            )}`}
          >
            {sample.status}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
              sample.priority
            )}`}
          >
            {sample.priority}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {sample.type}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          <p>
            Bệnh nhân: {sample.patientName} ({sample.patientId})
          </p>
          <p>Ngày nhận: {formatDate(sample.receivedDate)}</p>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          {sample.description}
        </p>

        {sample.assignedDepartment && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Đã phân công cho:</p>
            <div
              className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${sample.assignedDepartment.color}`}
            >
              {sample.assignedDepartment.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleCard;
