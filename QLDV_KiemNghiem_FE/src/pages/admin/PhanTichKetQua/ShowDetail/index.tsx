import { ArrowLeft, Edit } from "react-feather";
import { sampleData } from "..";
import StatusBadge2 from "../../../../components/UI/StatusBadge2";
import { formatDate } from "../../../../configs/configAll";
import Detail from "../Detail";

const ShowDetail = ({ resultId, onEdit, onBack }: any) => {
  const result = sampleData[resultId];

  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <p className="text-gray-500">Không tìm thấy phiếu phân tích</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Chi tiết phiếu phân tích
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(resultId)}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
          >
            <Edit size={16} />
            <span>Chỉnh sửa</span>
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin cơ bản
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Mã phiếu:</span>
                  <span className="font-medium text-lg">{result.code}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tên mẫu:</span>
                  <span className="font-medium">{result.sampleName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái:</span>
                  <StatusBadge2 status={result.status} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Khoa:</span>
                  <span className="font-medium">{result.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lưu mẫu:</span>
                  <span
                    className={`font-medium ${
                      result.storage === "Có"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.storage}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin nhân viên
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nhân viên lập:</span>
                  <div className="text-right">
                    <div className="font-medium">{result.createdBy}</div>
                    <div className="text-sm text-gray-500">
                      {result.createdBy === "NV001"
                        ? "Nguyễn Văn A"
                        : result.createdBy === "NV002"
                        ? "Trần Thị B"
                        : result.createdBy === "NV003"
                        ? "Lê Văn C"
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nhân viên kiểm tra:</span>
                  <div className="text-right">
                    <div className="font-medium">{result.checkedBy}</div>
                    <div className="text-sm text-gray-500">
                      {result.checkedBy === "NV004"
                        ? "Phạm Văn D"
                        : result.checkedBy === "NV005"
                        ? "Hoàng Thị E"
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin thời gian
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày nhận mẫu:</span>
                  <span className="font-medium">
                    {formatDate(result.receivedDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày kiểm thu:</span>
                  <span className="font-medium">
                    {result.testDate
                      ? formatDate(result.testDate)
                      : "Chưa xác định"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngày trả kết quả:</span>
                  <span className="font-medium">
                    {result.resultDate
                      ? formatDate(result.resultDate)
                      : "Chưa xác định"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Yêu cầu & Ghi chú
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600 block mb-2 font-medium">
                    Yêu cầu kiểm nghiệm:
                  </span>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {result.requirements || "Không có yêu cầu cụ thể"}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 block mb-2 font-medium">
                    Ghi chú:
                  </span>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {result.notes || "Không có ghi chú"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Chi tiết kết quả kiểm nghiệm
            </h3>
            <div className="text-sm text-gray-500">
              Tổng số chỉ tiêu: {result.details?.length || 0}
            </div>
          </div>

          {result.details && result.details.length > 0 ? (
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 font-medium text-sm text-gray-700 border-b border-gray-200">
                <div className="flex items-center">
                  <span>Tên chỉ tiêu</span>
                </div>
                <div className="flex items-center">
                  <span>Kết quả</span>
                </div>
                <div className="flex items-center">
                  <span>Đơn vị</span>
                </div>
                <div className="flex items-center">
                  <span>Mức chất lượng</span>
                </div>
                <div className="flex items-center">
                  <span>Ghi chú</span>
                </div>
              </div>

              {result.details.map((detail: any, index: any) => (
                <Detail
                  key={index}
                  detail={detail}
                  index={index}
                  isEditable={false}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
              <div className="text-gray-400 mb-2">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">
                Chưa có chi tiết kết quả kiểm nghiệm
              </p>
              <button
                onClick={() => onEdit(resultId)}
                className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Thêm kết quả kiểm nghiệm
              </button>
            </div>
          )}
        </div>

        {result.details && result.details.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-green-800 text-sm font-medium">
                Đạt tiêu chuẩn
              </div>
              <div className="text-2xl font-bold text-green-900">
                {result.details.filter((d: any) => d.quality === "Đạt").length}
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-red-800 text-sm font-medium">Không đạt</div>
              <div className="text-2xl font-bold text-red-900">
                {
                  result.details.filter((d: any) => d.quality === "Không đạt")
                    .length
                }
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-yellow-800 text-sm font-medium">
                Cần kiểm tra lại
              </div>
              <div className="text-2xl font-bold text-yellow-900">
                {
                  result.details.filter(
                    (d: any) => d.quality === "Cần kiểm tra lại"
                  ).length
                }
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-gray-800 text-sm font-medium">
                Chưa xác định
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {
                  result.details.filter(
                    (d: any) => d.quality === "Chưa xác định"
                  ).length
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetail;
