import { useEffect, useState } from "react";
import SampleCard from "../SampleCard";
import AssignmentModal from "../AssignmentModal";
import InputSearch2 from "../../../../../components/InputSearch2";
import { MauPhanCong } from "../../../../../models/mau";
import { Pagination, Skeleton } from "@mui/material";
import ChiTietPhieuDKyDVKN from "../../ChiTietPhieuDKyDVKN";
import removeVietnameseTones from "../../../../../configs/removeVietnameseTones";
import { getAllDanhSachMau } from "../../../../../hooks/personnels/phanCongKhoa";
import SelectItemLoaiMau from "./SelectItemLoaiMau";
import { FileMinus } from "react-feather";
import AssignmentDeleteModal from "../AssignmentDeleteModal";

interface Props {
  departments: any;
}

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
    maLoaiMau: data.maLoaiMau,
    thoiGianTieuChuan: data.thoiGianTieuChuan,
  };
}

const SampleList = (props: Props) => {
  const { departments } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const [selectLoaiMau, setSelectLoaiMau] = useState("");
  const params: any = {
    pageNumber: currentPage,
    pageSize: itemsPerPage,
    trangThaiPhanCong: 1,
  };

  if (selectLoaiMau !== "") {
    params.maLoaiMau = selectLoaiMau;
  }
  const { data, isLoading } = getAllDanhSachMau({
    queryKey: "AllDanhSachMau",
    params: params,
  });
  const pagination = data?.pagination;
  const [samples, setSamples] = useState<MauPhanCong[]>(
    data?.data?.map(convertToMauPhanCong) || []
  );

  const [selectedSamples, setSelectedSamples] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAssignmentDeleteModalOpen, setIsAssignmentDeleteModalOpen] =
    useState(false);
  const filteredSamples: any = samples
    ?.sort((a: any, b: any) => a.thoiGianTieuChuan - b.thoiGianTieuChuan)
    ?.filter((sample: any) => {
      const query = removeVietnameseTones(searchQuery.toLowerCase());
      const matchesSearch = removeVietnameseTones(
        sample.tenMau.toLowerCase()
      ).includes(query);
      return matchesSearch;
    });
  const [openXemChiTiet, setOpenXemChiTiet] = useState(false);

  const handleCloseXemChiTiet = () => {
    setOpenXemChiTiet(false);
    sessionStorage.removeItem("phieu-DKKN-xem-chi-tiet");
  };
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

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
    setSamples(data?.data?.map(convertToMauPhanCong));
  }, [data]);

  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 flex justify-between border-b border-gray-200">
          <div className="flex items-center justify-between w-lg">
            <InputSearch2
              placeholder="Tìm kiếm mẫu..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex space-x-2">
            <SelectItemLoaiMau
              title="loại mẫu"
              setItem={setSelectLoaiMau}
              item={selectLoaiMau}
            />
            <button
              onClick={() => setIsAssignmentDeleteModalOpen(true)}
              className="inline-flex gap-1 items-center justify-center cursor-pointer px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FileMinus className="w-4 h-4" />
              Hủy mẫu
            </button>
            {selectedSamples.length > 0 && (
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="inline-flex cursor-pointer items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          ) : isLoading ? (
            <div className="grid grid-cols-3 gap-4">
              <Skeleton variant="rounded" width={468} height={252} />
              <Skeleton variant="rounded" width={468} height={252} />
              <Skeleton variant="rounded" width={468} height={252} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                {filteredSamples
                  ?.filter(
                    (item: any) =>
                      item.trangThaiPhanCong === 1 ||
                      item.trangThaiPhanCong === 3
                  )
                  ?.map((sample: any) => (
                    <SampleCard
                      key={sample.maId}
                      sample={sample}
                      isSelected={selectedSamples.includes(sample.maId)}
                      onSelect={toggleSampleSelection}
                      isLoading={isLoading}
                      handleOpenChiTiet={() => setOpenXemChiTiet(true)}
                    />
                  ))}
              </div>
              <div className="p-4 flex justify-center">
                <Pagination
                  count={pagination?.TotalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  sx={{
                    '[aria-label="Go to next page"],[aria-label="Go to previous page"]':
                      {
                        backgroundColor: "#1976d21f",
                        border: "1px solid #1976d280",
                        color: "#1976d2",
                      },
                    ".MuiPagination-ul": {
                      justifyContent: "center",
                    },
                  }}
                />
              </div>
            </>
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
      />
      <AssignmentDeleteModal
        isOpen={isAssignmentDeleteModalOpen}
        onClose={() => setIsAssignmentDeleteModalOpen(false)}
        data={data?.data}
      />
      <ChiTietPhieuDKyDVKN
        open={openXemChiTiet}
        handleClose={handleCloseXemChiTiet}
      />
    </div>
  );
};

export default SampleList;
