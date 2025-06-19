import { useState } from "react";

const AssignmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedSamples,
  departments,
}: any) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Handle department selection
  const handleDepartmentSelect = (departmentId: any) => {
    setSelectedDepartment(departmentId);
  };

  // Handle submit
  const handleSubmit = () => {
    onSubmit(selectedDepartment);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-in">
        {/* Modal header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">
            Phân công mẫu cho phòng ban
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal content */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Đã chọn {selectedSamples.length} mẫu
            </h4>
            <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
              <ul className="list-disc pl-5 space-y-1">
                {selectedSamples.map((sample: any) => (
                  <li key={sample.id} className="text-sm text-gray-600">
                    {sample.name}{" "}
                    <span className="text-gray-400">({sample.id})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Chọn phòng ban
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((department: any) => (
                <div
                  key={department.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    department.color
                  } ${
                    selectedDepartment === department.id
                      ? "ring-2 ring-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleDepartmentSelect(department.id)}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{department.name}</h5>
                    {selectedDepartment === department.id && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm mt-1">{department.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedDepartment || selectedSamples.length === 0}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              !selectedDepartment || selectedSamples.length === 0
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Phân công
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
