import { useState } from "react";
import { Plus, Save } from "react-feather";
import Detail from "../Detail";

const Create = ({ onCancel, onSave }: any) => {
  const [formData, setFormData] = useState({
    Ten_Mau: "",
    NgayLap: "",
  });

  const [testDetails, setTestDetails] = useState([
    { Ten_PLHC: "", SoLuong: "", GhiChu: "" },
  ]);

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
    const newResult = {
      ...formData,
      ChiTietPhieuDuTru: testDetails.filter(
        (detail) => detail.Ten_PLHC.trim() !== ""
      ),
    };
    console.log("New Result:", newResult);

    // onSave(newResult);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">
          Tạo phiếu phân tích mới
        </h2>
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
              Chi tiết phiếu
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
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Lưu phiếu</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
