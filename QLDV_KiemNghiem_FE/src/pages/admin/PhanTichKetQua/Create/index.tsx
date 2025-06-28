import { useState } from "react";
import { departments, employees } from "..";
import { Plus, Save } from "react-feather";
import Detail from "../Detail";

const Create = ({ onCancel, onSave }: any) => {
  const [formData, setFormData] = useState({
    sampleName: "",
    createdBy: "",
    checkedBy: "",
    receivedDate: "",
    testDate: "",
    resultDate: "",
    storage: "Có",
    department: "",
    notes: "",
    requirements: "",
    status: "Đang xử lý",
  });

  const [testDetails, setTestDetails] = useState([
    { name: "", result: "", unit: "", quality: "Đạt", notes: "" },
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
      { name: "", result: "", unit: "", quality: "Đạt", notes: "" },
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
      code: `KQ${String(Date.now()).slice(-3)}`, // Simple ID generation
      details: testDetails.filter((detail) => detail.name.trim() !== ""),
    };
    onSave(newResult);
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
              Mã phiếu kết quả
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Tự động tạo"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên mẫu *
            </label>
            <input
              type="text"
              required
              value={formData.sampleName}
              onChange={(e) => handleInputChange("sampleName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên mẫu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã nhân viên lập *
            </label>
            <select
              required
              value={formData.createdBy}
              onChange={(e) => handleInputChange("createdBy", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn nhân viên</option>
              {employees.map((emp: any) => (
                <option key={emp.id} value={emp.id}>
                  {emp.id} - {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã nhân viên kiểm tra
            </label>
            <select
              value={formData.checkedBy}
              onChange={(e) => handleInputChange("checkedBy", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn nhân viên kiểm tra</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.id} - {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày nhận mẫu *
            </label>
            <input
              type="date"
              required
              value={formData.receivedDate}
              onChange={(e) =>
                handleInputChange("receivedDate", e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày kiểm thu
            </label>
            <input
              type="date"
              value={formData.testDate}
              onChange={(e) => handleInputChange("testDate", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày trả kết quả
            </label>
            <input
              type="date"
              value={formData.resultDate}
              onChange={(e) => handleInputChange("resultDate", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã khoa *
            </label>
            <select
              required
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Chọn khoa</option>
              {departments.map((dept: any) => (
                <option key={dept.id} value={dept.id}>
                  {dept.id} - {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lưu mẫu
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="storage"
                value="Có"
                checked={formData.storage === "Có"}
                onChange={(e) => handleInputChange("storage", e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Có</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="storage"
                value="Không"
                checked={formData.storage === "Không"}
                onChange={(e) => handleInputChange("storage", e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Không</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ghi chú
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập ghi chú..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yêu cầu kiểm nghiệm
          </label>
          <textarea
            rows={3}
            value={formData.requirements}
            onChange={(e) => handleInputChange("requirements", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập yêu cầu kiểm nghiệm..."
          />
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Chi tiết phiếu phân tích
            </h3>
            <button
              type="button"
              onClick={addTestDetail}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
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

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
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
