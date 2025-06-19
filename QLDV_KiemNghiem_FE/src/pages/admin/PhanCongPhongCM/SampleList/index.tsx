import { samples } from "..";

interface Props {
  initialSamples: samples[];
  departments: any;
}
import { useState } from "react";
import SampleCard from "../SampleCard";
import AssignmentModal from "../AssignmentModal";

const SampleList = (props: Props) => {
  const { initialSamples, departments } = props;
  const [samples, setSamples] = useState<samples[]>(initialSamples);
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    type: "all",
    priority: "all",
    status: "all",
  });
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Get unique sample types for filter
  const sampleTypes = ["all", ...new Set(samples.map((sample) => sample.type))];

  // Get unique priorities for filter
  const priorities = [
    "all",
    ...new Set(samples.map((sample) => sample.priority)),
  ];

  // Get unique statuses for filter
  const statuses = ["all", ...new Set(samples.map((sample) => sample.status))];

  // Filter samples based on search query and filters
  const filteredSamples = samples.filter((sample: any) => {
    // Filter by search query
    const matchesSearch =
      sample.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.patientId.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by type
    const matchesType = filter.type === "all" || sample.type === filter.type;

    // Filter by priority
    const matchesPriority =
      filter.priority === "all" || sample.priority === filter.priority;

    // Filter by status
    const matchesStatus =
      filter.status === "all" || sample.status === filter.status;

    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  // Handle sample selection
  const toggleSampleSelection = (sampleId: any) => {
    if (selectedSamples.includes(sampleId)) {
      setSelectedSamples(selectedSamples.filter((id: any) => id !== sampleId));
    } else {
      setSelectedSamples([...selectedSamples, sampleId]);
    }
  };

  // Handle select all samples
  const handleSelectAll = () => {
    if (selectedSamples.length === filteredSamples.length) {
      setSelectedSamples([]);
    } else {
      setSelectedSamples(filteredSamples.map((sample: any) => sample.id));
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (filterType: any, value: any) => {
    setFilter({
      ...filter,
      [filterType]: value,
    });
  };

  // Handle assignment submission
  const handleAssignSubmit = (departmentId: any) => {
    if (!departmentId || selectedSamples.length === 0) {
      return;
    }

    const department = departments.find(
      (dept: any) => dept.id === departmentId
    );

    // Update samples with assigned department
    const updatedSamples = samples.map((sample: any) => {
      if (selectedSamples.includes(sample.id)) {
        return {
          ...sample,
          assignedDepartment: department,
          status: "Đã phân công",
        };
      }
      return sample;
    });

    setSamples(updatedSamples);

    // Show success message
    setSuccessMessage(
      `Đã phân công ${selectedSamples.length} mẫu cho ${department.name}`
    );
    setShowSuccessMessage(true);

    // Close modal and reset selection
    setIsAssignModalOpen(false);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-fade-in flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
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
          <span>{successMessage}</span>
        </div>
      )}

      {/* Samples Section */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Danh sách mẫu cần phân công
          </h2>
          <div className="flex space-x-2">
            {selectedSamples.length > 0 && (
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Phân công ({selectedSamples.length})
              </button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm mẫu..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Type Filter */}
              <select
                value={filter.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="all">Tất cả loại mẫu</option>
                {sampleTypes
                  .filter((type) => type !== "all")
                  .map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
              </select>

              {/* Priority Filter */}
              <select
                value={filter.priority}
                onChange={(e) => handleFilterChange("priority", e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="all">Tất cả độ ưu tiên</option>
                {priorities
                  .filter((priority) => priority !== "all")
                  .map((priority, index) => (
                    <option key={index} value={priority}>
                      {priority}
                    </option>
                  ))}
              </select>

              {/* Status Filter */}
              <select
                value={filter.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="all">Tất cả trạng thái</option>
                {statuses
                  .filter((status) => status !== "all")
                  .map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sample List */}
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="select-all"
                checked={
                  selectedSamples.length === filteredSamples.length &&
                  filteredSamples.length > 0
                }
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="select-all"
                className="ml-2 text-sm text-gray-700"
              >
                Chọn tất cả ({filteredSamples.length})
              </label>
            </div>
            <div className="text-sm text-gray-500">
              Đã chọn: {selectedSamples.length} mẫu
            </div>
          </div>

          {filteredSamples.length === 0 ? (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-gray-500">
                Không tìm thấy mẫu nào phù hợp
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSamples.map((sample) => (
                <SampleCard
                  key={sample.id}
                  sample={sample}
                  isSelected={selectedSamples.includes(sample.id)}
                  onSelect={toggleSampleSelection}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      {isAssignModalOpen && (
        <AssignmentModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          onSubmit={handleAssignSubmit}
          selectedSamples={samples.filter((sample: any) =>
            selectedSamples.includes(sample.id)
          )}
          departments={departments}
        />
      )}
    </>
  );
};

export default SampleList;
