import { Sample as SampleType } from "..";

interface Props {
  initialSamples: SampleType[];
  departments: any;
  data: any;
  isLoading: boolean;
}
import { useEffect, useState } from "react";
import SampleCard from "../SampleCard";
import AssignmentModal from "../AssignmentModal";
import InputSearch2 from "../../../../components/InputSearch2";
import { MauPhanCong } from "../../../../models/mau";

function convertToMauPhanCong(data: any): MauPhanCong {
  return {
    maId: data.maId,
    tenMau: data.tenMau,
    tenTieuChuan: data.maTieuChuan,
    tenDichVu: data.loaiDv,
    soLo: data.soLo,
    donViSanXuat: data.donViSanXuat,
    ngaySanXuat: data.ngaySanXuat,
    hanSuDung: data.hanSuDung,
    soLuong: data.soLuong,
    donViTinh: data.donViTinh,
    trangThaiPhanCong: data.trangThaiPhanCong,
  };
}

const SampleList = (props: Props) => {
  const { departments, data, isLoading } = props;

  const [samples, setSamples] = useState<MauPhanCong[]>(
    data?.maus.map(convertToMauPhanCong) || []
  );
  const [selectedSamples, setSelectedSamples] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const filteredSamples: any = samples?.filter((sample: any) => {
    // Filter by search query
    const matchesSearch =
      sample.maId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.tenMau.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Handle sample selection
  const toggleSampleSelection = (sampleId: never) => {
    if (sampleId)
      if (selectedSamples.includes(sampleId)) {
        setSelectedSamples(
          selectedSamples?.filter((id: any) => id !== sampleId)
        );
      } else {
        setSelectedSamples([...selectedSamples, sampleId]);
      }
  };

  // Handle select all samples
  const handleSelectAll = () => {
    if (selectedSamples.length === filteredSamples.length) {
      setSelectedSamples([]);
    } else {
      setSelectedSamples(filteredSamples.map((sample: any) => sample.maId));
    }
  };

  // Handle search input change
  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  // Handle assignment submission

  useEffect(() => {
    setSamples(data?.maus.map(convertToMauPhanCong));
  }, [data]);

  return (
    <div>
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

        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3">
              <InputSearch2
                placeholder="Tìm kiếm mẫu..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
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
                  selectedSamples?.length === filteredSamples?.length &&
                  filteredSamples?.length > 0
                }
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="select-all"
                className="ml-2 text-sm text-gray-700"
              >
                Chọn tất cả (
                {
                  filteredSamples?.filter(
                    (item: any) => !item.trangThaiPhanCong
                  )?.length
                }
                )
              </label>
            </div>
            <div className="text-sm text-gray-500">
              Đã chọn: {selectedSamples.length} mẫu
            </div>
          </div>

          {filteredSamples?.length === 0 ? (
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
              {filteredSamples
                ?.filter((item: any) => !item.trangThaiPhanCong)
                ?.map((sample: any) => (
                  <SampleCard
                    key={sample.maId}
                    sample={sample}
                    isSelected={selectedSamples.includes(sample.maId)}
                    onSelect={toggleSampleSelection}
                    isLoading={isLoading}
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      <AssignmentModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        selectedSamples={samples?.filter((sample: any) =>
          selectedSamples.includes(sample.maId)
        )}
        departments={departments}
        samples={samples}
        setSamples={setSamples}
        setSuccessMessage={setSuccessMessage}
        setShowSuccessMessage={setShowSuccessMessage}
      />
    </div>
  );
};

export default SampleList;
