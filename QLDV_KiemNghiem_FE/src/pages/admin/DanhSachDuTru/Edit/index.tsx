import { useEffect, useState } from "react";
import { departments, employees, sampleData } from "..";
import { ArrowLeft, Plus, Save } from "react-feather";
import Detail from "../Detail";

const Edit = ({ resultId, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState({
    Ten_Mau: "",
    NgayLap: "",
  });

  const [testDetails, setTestDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = sampleData[resultId];
    if (result) {
      setFormData({
        Ten_Mau: result.Ten_Mau,
        NgayLap: result.NgayLap,
      });

      setTestDetails(
        result.details && result.details.length > 0
          ? [...result.details]
          : [{ Ten_PLHC: "", SoLuong: "", GhiChu: "" }]
      );
    }
    setLoading(false);
  }, [resultId]);

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTestDetailChange = (index: any, detail: any) => {
    const newDetails = [...testDetails];
    newDetails[index] = detail;
    setTestDetails(newDetails);
  };

  const addTestDetail = () => {
    setTestDetails((prev) => [
      ...prev,
      { Ten_PLHC: "", SoLuong: "", GhiChu: "" },
    ]);
  };

  const removeTestDetail = (index: any) => {
    if (testDetails.length > 1) {
      setTestDetails((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedResult = {
      ...formData,
      ChiTietPhieuDuTru: testDetails.filter(
        (detail) => detail.Ten_PLHC.trim() !== ""
      ),
    };
    console.log("New Result:", updatedResult);
    // onSave(updatedResult);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!sampleData[resultId]) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <p className="text-gray-500">Không tìm thấy phiếu phân tích</p>
          <button
            onClick={onCancel}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Chỉnh sửa phiếu phân tích
          </h2>
          <p className="text-sm text-gray-600 mt-1">Mã phiếu: ABXCDF</p>
        </div>
        <button
          onClick={onCancel}
          className="px-4 py-2 cursor-pointer bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2"
        >
          <ArrowLeft size={16} />
          <span>Quay lại</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên mẫu *
            </label>
            <input
              type="text"
              required
              defaultValue={formData.Ten_Mau}
              onChange={(e) => handleInputChange("Ten_Mau", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên mẫu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày lập *
            </label>
            <input
              type="date"
              required
              defaultValue={formData.NgayLap}
              onChange={(e) => handleInputChange("NgayLap", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="border-t border-gray-300 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Chi tiết kết quả kiểm nghiệm
            </h3>
            <button
              type="button"
              onClick={addTestDetail}
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Thêm chỉ tiêu</span>
            </button>
          </div>

          <div className="space-y-4">
            {testDetails.map((detail, index) => (
              <Detail
                key={index}
                detail={detail}
                index={index}
                onChange={handleTestDetailChange}
                onRemove={removeTestDetail}
                isEditable={true}
              />
            ))}
          </div>

          {testDetails.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Chưa có chi tiết kết quả kiểm nghiệm</p>
              <button
                type="button"
                onClick={addTestDetail}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Thêm chỉ tiêu đầu tiên
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy thay đổi
          </button>
          <button
            type="submit"
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
