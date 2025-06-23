interface Props {
  data: any;
  isLoading: boolean;
}
import { useEffect, useState } from "react";
import SampleCard from "../SampleCard";
import { MauPhanCong } from "../../../../../models/mau";
import InputSearch2 from "../../../../../components/InputSearch2";
import { AiFillDelete } from "react-icons/ai";

const assignments = [
  {
    id: 1,
    code: "PĐX001",
    registrationCode: "PĐK001",
    customerName: "Công ty TNHH ABC",
    proposedBy: "Nguyễn Văn A",
    sampleDeliveryTime: "15/05/2023 10:30",
    assignmentDate: "16/05/2023",
    status: "Chờ xử lý",
    samples: [
      {
        maId: 1,
        tenMau: "Mẫu nước uống đóng chai",
        tenTieuChuan: "TCVN 6096:2004",
        tenDichVu: "Kiểm nghiệm vi sinh",
        soLo: "LO-12345",
        donViSanXuat: "Công ty TNHH ABC",
        ngaySanXuat: "10/05/2023",
        hanSuDung: "10/05/2024",
        soLuong: "5",
        donViTinh: "Chai",
        trangThaiPhanCong: "Đã phân công",
        maPhieuDangKy: "JDFGDFGDFG",
      },
      {
        maId: 2,
        tenMau: "Mẫu nước uống đóng chai 2",
        tenTieuChuan: "TCVN 6096:2004",
        tenDichVu: "Kiểm nghiệm vi sinh",
        soLo: "LO-12345",
        donViSanXuat: "Công ty TNHH ABC",
        ngaySanXuat: "10/05/2023",
        hanSuDung: "10/05/2024",
        soLuong: "5",
        donViTinh: "Chai",
        trangThaiPhanCong: "Đã phân công",
        maPhieuDangKy: "JDFGDFGDFG",
      },
      {
        maId: 3,
        tenMau: "Mẫu nước uống đóng chai 3",
        tenTieuChuan: "TCVN 6096:2004",
        tenDichVu: "Kiểm nghiệm vi sinh",
        soLo: "LO-12345",
        donViSanXuat: "Công ty TNHH ABC",
        ngaySanXuat: "10/05/2023",
        hanSuDung: "10/05/2024",
        soLuong: "5",
        donViTinh: "Chai",
        trangThaiPhanCong: "Đã phân công",
        maPhieuDangKy: "JDFGDFGDFG",
      },
    ],
  },
];

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
    maPhieuDangKy: data.maPhieuDangKy,
  };
}

const SampleList = (props: Props) => {
  const { data, isLoading } = props;
  console.log("assignments[1]?.samples", assignments[0]?.samples);
  const [isPhanCong, setisPhanCong] = useState(false);
  const [samples, setSamples] = useState<MauPhanCong[]>(
    assignments[0]?.samples?.map(convertToMauPhanCong) || []
  );
  const [selectedSamples, setSelectedSamples] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSamples: any = samples?.filter((sample: any) => {
    // Filter by search query
    const matchesSearch = sample.tenMau
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
  console.log("filteredSamples", filteredSamples);

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
    setSamples(assignments[0]?.samples?.map(convertToMauPhanCong));
  }, [data]);

  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center">
          <div
            className="relative px-4 flex justify-center cursor-pointer group"
            onClick={() => setisPhanCong(false)}
          >
            <h2
              className={`text-lg font-medium ${
                isPhanCong
                  ? "text-gray-600 group-hover:text-gray-800"
                  : "text-blue-600"
              } `}
            >
              Danh sách mẫu đã phân công
            </h2>
            {!isPhanCong && (
              <span className="absolute -bottom-4 w-full border border-blue-500" />
            )}
          </div>
          <div
            className="relative px-4 flex justify-center cursor-pointer group"
            onClick={() => setisPhanCong(true)}
          >
            <h2
              className={`text-lg font-medium ${
                isPhanCong
                  ? "text-blue-600"
                  : "text-gray-600 group-hover:text-gray-800"
              } `}
            >
              Danh sách mẫu phân công
            </h2>
            {isPhanCong && (
              <span className="absolute -bottom-4 w-full border border-blue-500" />
            )}
          </div>
        </div>

        {isPhanCong ? (
          <>
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="w-full md:w-1/3">
                  <InputSearch2
                    placeholder="Tìm kiếm mẫu..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="flex space-x-2">
                  {selectedSamples.length > 0 && (
                    <button
                      // onClick={() => setIsAssignModalOpen(true)}
                      className="inline-flex gap-1 cursor-pointer items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                  {filteredSamples?.map((sample: any) => (
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
          </>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="w-full md:w-1/3">
                  <InputSearch2
                    placeholder="Tìm kiếm mẫu..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="flex space-x-2">
                  {selectedSamples.length > 0 && (
                    <button
                      // onClick={() => setIsAssignModalOpen(true)}
                      className="inline-flex gap-1 cursor-pointer items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <AiFillDelete className="w-4 h-4" />
                      Xóa ({selectedSamples.length})
                    </button>
                  )}
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
                  {filteredSamples?.map((sample: any) => (
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
          </>
        )}
      </div>
    </div>
  );
};

export default SampleList;
