import { useEffect, useState } from "react";
import SampleCard from "../SampleCard";
import AssignmentModal from "../AssignmentModal";
import InputSearch2 from "../../../../../../components/InputSearch2";
import { Pagination, Skeleton } from "@mui/material";
import removeVietnameseTones from "../../../../../../configs/removeVietnameseTones";
import ChiTietMau from "../../../ChiTietMau";
import { getAllDanhSachMau } from "../../../../../../hooks/personnels/phanCongKhoa";
import { usePersonnel } from "../../../../../../contexts/PersonelsProvider";
import { useGetLoaiDichVuAll } from "../../../../../../hooks/customers/usePhieuDKyDVKN";

const SampleList = () => {
  const { personnelInfo } = usePersonnel();

  const { data: dataMau, isLoading: isLoadingDanhSachMau } = getAllDanhSachMau({
    queryKey: "DanhSachMauSampleList",
    params: { getAll: true, maKhoa: personnelInfo?.maKhoa, luuMau: true },
  });

  const { data: dataLDV } = useGetLoaiDichVuAll({
    queryKey: "LoaiDichVuAllSampleList",
  });

  const [samples, setSamples] = useState<any[]>(dataMau?.data);
  const [saveID, setSaveID] = useState<any>(null);
  const [selectedSamples, setSelectedSamples] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const filteredSamples: any = samples?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch = removeVietnameseTones(
      sample.tenMau.toLowerCase()
    ).includes(query);
    return matchesSearch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSamples?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    filteredSamples && filteredSamples?.length / itemsPerPage
  );
  const [openXemChiTietMau, setOpenXemChiTietMau] = useState(false);

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const hanldeSelectedSamples = (sampleId: any) => {
    if (sampleId)
      if (selectedSamples === sampleId) {
        setSelectedSamples(null);
      } else {
        setSelectedSamples(sampleId);
      }
  };

  useEffect(() => {
    setSamples(dataMau?.data);
  }, [dataMau?.data]);

  console.log("selectedSamples", selectedSamples);

  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 flex justify-between border-b border-gray-200">
          <div className="flex items-center justify-between w-3xl">
            <InputSearch2
              placeholder="Tìm kiếm mẫu..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsAssignModalOpen(true)}
              disabled={selectedSamples === null}
              className={`
                inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white ${
                  selectedSamples === null
                    ? "bg-blue-400 cursor-no-drop"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
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
              Tạo phiếu
            </button>
          </div>
        </div>

        {/* Sample List */}
        <div className="p-6">
          {isLoadingDanhSachMau ? (
            <div className="grid grid-cols-3 gap-4">
              <Skeleton variant="rounded" width={468} height={228} />
              <Skeleton variant="rounded" width={468} height={228} />
              <Skeleton variant="rounded" width={468} height={228} />
            </div>
          ) : filteredSamples?.length === 0 ? (
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
            <>
              <div className="grid grid-cols-3 gap-4">
                {currentItems?.map((sample: any, index: any) => (
                  <SampleCard
                    key={index}
                    sample={sample}
                    isSelected={selectedSamples}
                    onSelect={hanldeSelectedSamples}
                    isLoading={isLoadingDanhSachMau}
                    handleOpenChiTiet={() => setOpenXemChiTietMau(true)}
                    setSaveID={setSaveID}
                    dataLDV={dataLDV}
                  />
                ))}
              </div>
              <div className="p-4 flex justify-center">
                <Pagination
                  count={totalPages}
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
        selectedSamples={samples?.find(
          (sample: any) => sample.maId === selectedSamples
        )}
        samples={samples}
      />
      <ChiTietMau
        open={openXemChiTietMau}
        handleClose={() => setOpenXemChiTietMau(false)}
        saveID={saveID}
        dataMau={filteredSamples}
        dataLDV={dataLDV}
      />
    </div>
  );
};

export default SampleList;
