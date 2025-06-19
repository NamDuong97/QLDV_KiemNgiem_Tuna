import { IoIosArrowBack } from "react-icons/io";

const RegistrationDetails = ({ registrationForm }: any) => {
  // Format date function
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
    <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200 space-x-2 flex items-center">
        <div className="flex items-center">
          <button
            onClick={() => history.back()}
            className="cursor-pointer hover:bg-gray-100 p-1"
          >
            <IoIosArrowBack className="w-5 h-6 text-gray-700" />
          </button>
        </div>
        <div className="flex items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Số đăng ký phân tích: {registrationForm.id}
          </h2>
          <span
            className={`ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              registrationForm.status
            )}`}
          >
            {registrationForm.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base/6 font-medium text-gray-500 mb-4">
              Thông tin phiếu đăng ký
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500">
                  Ngày đăng ký
                </label>
                <p className="font-medium text-gray-900">1/1/1970</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">
                    Hình thức trả kết quả
                  </label>
                  <p className="font-medium text-gray-900">
                    {formatDate(registrationForm.createdDate)}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">
                    Hình thức gửi mẫu
                  </label>
                  <p className="font-medium text-gray-900">
                    {formatDate(registrationForm.dueDate)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">Kết quả</label>
                  <p className="font-medium text-gray-900">
                    {formatDate(registrationForm.createdDate)}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">
                    Ngày giao mẫu
                  </label>
                  <p className="font-medium text-gray-900">
                    {formatDate(registrationForm.dueDate)}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500">
                  Địa chỉ giao mẫu
                </label>
                <p className="font-medium text-gray-900">
                  16 Sư Vạn Hạnh, Phường 9, Quận 5, TP.HCM
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-base/6 font-medium text-gray-500 mb-4">
              Thông tin khách hàng
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">
                    Người gửi mẫu
                  </label>
                  <p className="font-medium text-gray-900">
                    {registrationForm.customer.name}
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">
                    Đơn vị gửi mẫu
                  </label>
                  <p className="font-medium text-gray-900">
                    {registrationForm.customer.name}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500">
                  Số điện thoại
                </label>
                <p className="font-medium text-gray-900">
                  {registrationForm.customer.phone}
                </p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">Email</label>
                <p className="font-medium text-gray-900">
                  {registrationForm.customer.phone}
                </p>
              </div>
              <div>
                <label className="block text-xs text-gray-500">
                  Địa chỉ liên hệ
                </label>
                <p className="font-medium text-gray-900">
                  {registrationForm.customer.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;
