import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen, FaPlus } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import Inputs2 from "../../../../components/Inputs2";
import { useState } from "react";
import PopupThongBao from "./PopupThongBao";
import { Textarea2 } from "../../../../components/Textarea2";

const phieuDuTruData = {
  maPhieuDuTru: "PDT-HC-20250611-001",
  tenNhanVienLap: "Trần Văn Dũng",
  tenMau: "Hóa chất Axit Sulfuric",
  ngayTao: "2025-06-11",
  khoa: "Khoa Hóa Sinh",
  chiTietPhieu: [
    {
      id: "PLHC_001",
      tenPhuLieuHoaChat: "Dung môi Acetone",
      soLuong: 10,
      donViTinh: "Lít",
      ghiChu: "Sử dụng cho pha loãng mẫu",
    },
    {
      id: "PLHC_002",
      tenPhuLieuHoaChat: "Thuốc thử Nessler",
      soLuong: 2,
      donViTinh: "Chai (500ml)",
      ghiChu: "Kiểm tra Amoniac",
    },
    {
      id: "PLHC_003",
      tenPhuLieuHoaChat: "Giấy lọc định tính Whatman No.1",
      soLuong: 5,
      donViTinh: "Hộp",
      ghiChu: "Đường kính 125mm",
    },
    {
      id: "PLHC_004",
      tenPhuLieuHoaChat: "Chất chuẩn Glucose (C6H12O6)",
      soLuong: 500,
      donViTinh: "Gram",
      ghiChu: "Độ tinh khiết 99.9%",
    },
    {
      id: "PLHC_005",
      tenPhuLieuHoaChat: "Axít Sulfuric đậm đặc",
      soLuong: 1,
      donViTinh: "Bình (1L)",
      ghiChu: "Dùng cho phân tích COD",
    },
  ],
};

const ThemPhieuDuTru = () => {
  const navigate = useNavigate();

  const [openPopupThongBao, setOpenPopupThongBao] = useState(false);
  const handleClickOpenPopupThongBao = () => {
    setOpenPopupThongBao(true);
  };
  const handleClosePopupThongBao = () => {
    setOpenPopupThongBao(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = {
    data: phieuDuTruData?.chiTietPhieu?.slice(
      indexOfFirstItem,
      indexOfLastItem
    ),
    // isLoading: phieuDuTruData.isLoading,
  };

  const totalPages = Math.ceil(
    phieuDuTruData?.chiTietPhieu &&
      phieuDuTruData?.chiTietPhieu?.length / itemsPerPage
  );

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <motion.div
        key="ThemPhieuDuTru"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-12 px-14 py-20"
      >
        <Box className="flex items-center justify-between bg-cyan-800 px-6 py-3 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Box className="flex items-center gap-4">
            <button
              className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              onClick={() =>
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết Thêm phiếu dự trù
            </h1>
          </Box>
          <Box>
            <button
              onClick={handleClickOpenPopupThongBao}
              className="px-3 py-[6px] rounded-lg cursor-pointer hover:bg-cyan-700 bg-cyan-800 border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              <span className="text-lg/6 font-semibold text-white">
                Lưu Phiếu
              </span>
            </button>
          </Box>
        </Box>
        <Box className="grid gap-20">
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                thông tin phiếu dự trù
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-6">
                <Inputs2
                  title="Tên Nhân Viên Lập:"
                  placeholder="Nhập Tên Nhân Viên Lập..."
                  defaultValue={phieuDuTruData.tenNhanVienLap}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Tên Mẫu:"
                  placeholder="Nhập Tên Mẫu..."
                  defaultValue={phieuDuTruData.tenMau}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Ngày Tạo:"
                  type="date"
                  defaultValue={phieuDuTruData.ngayTao}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Khoa:"
                  placeholder="Nhập Khoa..."
                  defaultValue={phieuDuTruData.khoa}
                />
              </Box>
            </Box>
          </Box>
          <Box className="grid gap-4">
            <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="text-lg/6 capitalize font-medium text-white">
                  thông tin chi tiết phiếu dự trù
                </p>
              </Box>
              <button className="absolute top-1/2 -right-5 -translate-y-1/2 text-center cursor-pointer bg-cyan-800 p-2 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <FaPlus className="w-5 h-5 text-white" />
              </button>
              {currentItems.data.map((item: any) => (
                <Box key={item.id} className="grid grid-cols-12 gap-6 w-full">
                  <Box className="col-span-4">
                    <Inputs2
                      title="Tên Phụ liệu hóa chất:"
                      placeholder="Nhập Tên Phụ liệu hóa chất..."
                      defaultValue={item.tenPhuLieuHoaChat}
                    />
                  </Box>
                  <Box className="col-span-4">
                    <Inputs2
                      title="Số lượng:"
                      placeholder="Nhập Số lượng..."
                      defaultValue={item.soLuong}
                    />
                  </Box>
                  <Box className="col-span-4">
                    <Inputs2
                      title="Đơn vị tính:"
                      placeholder="Nhập Đơn vị tính..."
                      defaultValue={item.donViTinh}
                    />
                  </Box>
                  <Box className="col-span-12">
                    <Textarea2
                      title="Ghi chú"
                      placeholder="Nhập Ghi Chú"
                      className="max-h-[149px] min-h-[149px]"
                      height="h-auto"
                      defaultValue={item.ghiChu}
                      // inputRef={register("ghiChu")}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            <div className="px-4 py-2 flex justify-center">
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
          </Box>
        </Box>
      </motion.div>
      <PopupThongBao
        open={openPopupThongBao}
        handleClose={handleClosePopupThongBao}
      />
    </Box>
  );
};

export default ThemPhieuDuTru;
