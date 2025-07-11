import { useEffect, useState } from "react";
import InputSearch2 from "../../../../../components/InputSearch2";
import { MauPhanCong } from "../../../../../models/mau";
import { Pagination, Skeleton } from "@mui/material";
import ChiTietPhieuDKyDVKN from "../../ChiTietPhieuDKyDVKN";
import removeVietnameseTones from "../../../../../configs/removeVietnameseTones";
import { getAllDanhSachMau } from "../../../../../hooks/personnels/phanCongKhoa";
import SelectItemLoaiMau from "./SelectItemLoaiMau";
import SampleCardTuChoiMau from "./SampleCard";
import FormLyDoTuChoi from "./formLyDoTuChoi";
import { TypeConformation } from "../../../../../constants/typeConfirmation";
import { typeConfirmation } from "../../../PhanTichKetQua/ShowDetailChoDuyet";

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
    tenKhoa: data.tenKhoa,
    maKhoa: data.maKhoa,
  };
}

const ListMauHoanTra = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [itemsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [save, setSave] = useState({});
  const [isTypeConform, setIsTypeConform] = useState<string>("");
  const [selectLoaiMau, setSelectLoaiMau] = useState("");
  const params: any = {
    pageNumber: currentPage,
    pageSize: itemsPerPage,
    trangThaiPhanCong: 10, //Đã bị huỷ bởi khoa chuyên môn - Khi phòng khoa từ chối phân công - không ai nhận
  };

  if (selectLoaiMau !== "") {
    params.maLoaiMau = selectLoaiMau;
  }
  const { data, isLoading } = getAllDanhSachMau({
    queryKey: "ListMauHoanTra",
    params: params,
  });
  const pagination = data?.pagination;
  const [samples, setSamples] = useState<MauPhanCong[]>(
    data?.data?.map(convertToMauPhanCong) || []
  );

  const filteredSamples: any = samples?.filter((sample: any) => {
    const query = removeVietnameseTones(searchQuery.toLowerCase());
    const matchesSearch = removeVietnameseTones(
      sample.tenMau.toLowerCase()
    ).includes(query);
    return matchesSearch;
  });
  const [openXemChiTiet, setOpenXemChiTiet] = useState(false);
  console.log("filteredSamples", filteredSamples);

  const handleCloseXemChiTiet = () => {
    setOpenXemChiTiet(false);
    sessionStorage.removeItem("phieu-DKKN-xem-chi-tiet");
  };
  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
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
          </div>
        </div>

        {/* Sample List */}
        <div className="p-6">
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
                {filteredSamples?.map((sample: any) => (
                  <SampleCardTuChoiMau
                    key={sample.maId}
                    sample={sample}
                    handleOpenChiTiet={() => setOpenXemChiTiet(true)}
                    setIsTypeConform={setIsTypeConform}
                    setSave={setSave}
                    setIsOpen={() => setIsOpen(true)}
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
      <ChiTietPhieuDKyDVKN
        open={openXemChiTiet}
        handleClose={handleCloseXemChiTiet}
      />
      <FormLyDoTuChoi
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={TypeConformation.Info}
        title={`Xác nhận ${
          isTypeConform === typeConfirmation.TuChoi ? `từ chối` : `duyệt phiếu`
        }`}
        dataSave={save}
        typeConform={isTypeConform}
      />
    </div>
  );
};

export default ListMauHoanTra;
