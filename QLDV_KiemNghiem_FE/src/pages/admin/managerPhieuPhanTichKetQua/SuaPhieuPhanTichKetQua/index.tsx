import { Box, Pagination, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen, FaPlus } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import Inputs2 from "../../../../components/Inputs2";
import { useState } from "react";
import PopupThongBao from "./PopupThongBao";
import { Textarea2 } from "../../../../components/Textarea2";
import { MdDelete } from "react-icons/md";

const samplePhieuPhanTichKetQua = {
  // 1. Thông tin về phiếu và mẫu
  maPhieuKetQua: "PKQ-20250612-001",
  maPhieuDangKyMau: "PDKM-001-20250610",
  tenMau: "Mẫu Nước Uống Đóng Chai - Lô A123",
  luuMau: "Kho lưu trữ mẫu 3, kệ B, ô 7",

  // 2. Thông tin về nhân sự
  NvLap: "Nguyễn Văn An",
  NvKiemTra: "Phạm Thị Bình",

  // 3. Thông tin về thời gian
  ngayNhanMau: "2025-06-10",
  ngayKiemThu: "2025-06-11",
  ngayTraKetQua: "2025-06-12",
  ngayTao: "2025-06-12 10:00:00",
  ngaySua: "2025-06-12 15:30:00",

  // 4. Thông tin khác
  maKhoa: "KLS", // Ví dụ: Khoa Lâm Sàng
  ghiChu: "Kết quả kiểm nghiệm phù hợp với tiêu chuẩn ISO 9001.",
  trangThai: "Hoàn thành", // Ví dụ: "Đang xử lý", "Hoàn thành", "Cần xem xét"
  yeuCauKiemNghiem: "Kiểm nghiệm các chỉ tiêu vi sinh và hóa lý cơ bản.",

  // Chi tiết: Thông tin liên quan đến kết quả và chỉ tiêu (là một mảng)
  chiTietKetQua: [
    {
      id: "ct001", // ID cho từng chỉ tiêu chi tiết
      tenChiTieu: "Chỉ số pH",
      ketQua: "7.2",
      donVi: "CFU/100ml", // pH không có đơn vị thông thường
      mucChatLuong: "Đạt",
      ghiChu: "Trong ngưỡng cho phép.",
    },
    {
      id: "ct002",
      tenChiTieu: "Vi khuẩn E.coli",
      ketQua: "Không phát hiện",
      donVi: "CFU/100ml",
      mucChatLuong: "Đạt",
      ghiChu: "Không có sự hiện diện của vi khuẩn E.coli.",
    },
    {
      id: "ct003",
      tenChiTieu: "Độ đục",
      ketQua: "0.5",
      donVi: "NTU",
      mucChatLuong: "Đạt",
      ghiChu: "Mẫu nước trong.",
    },
    {
      id: "ct004",
      tenChiTieu: "Hàm lượng Chì (Pb)",
      ketQua: "< 0.001",
      donVi: "mg/L",
      mucChatLuong: "Đạt",
      ghiChu: "Trong giới hạn cho phép của kim loại nặng.",
    },
  ],
};

const SuaPhieuPhanTichKetQua = () => {
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
    data: samplePhieuPhanTichKetQua?.chiTietKetQua?.slice(
      indexOfFirstItem,
      indexOfLastItem
    ),
    // isLoading: phieuDuTruData.isLoading,
  };

  const totalPages = Math.ceil(
    samplePhieuPhanTichKetQua?.chiTietKetQua &&
      samplePhieuPhanTichKetQua?.chiTietKetQua?.length / itemsPerPage
  );

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <motion.div
        key="SuaPhieuPhanTichKetQua"
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
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin cập nhật Phân Tích Kết Quả
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
                Thông tin chung
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4">
                <Inputs2
                  title="Tên Mẫu:"
                  placeholder="Nhập Tên Mẫu..."
                  defaultValue={samplePhieuPhanTichKetQua.tenMau}
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Lưu Mẫu:"
                  placeholder="Nhập vị trí lưu mẫu..."
                  defaultValue={samplePhieuPhanTichKetQua.luuMau}
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Khoa:"
                  placeholder="Nhập Khoa..."
                  defaultValue={samplePhieuPhanTichKetQua.maKhoa}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Nhân viên lập:"
                  placeholder="Nhập Nhân viên lập..."
                  defaultValue={samplePhieuPhanTichKetQua.NvLap}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Nhân viên Kiểm tra:"
                  placeholder="Nhập Nhân viên Kiểm tra..."
                  defaultValue={samplePhieuPhanTichKetQua.NvKiemTra}
                />
              </Box>
            </Box>
          </Box>
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                Thời gian
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4">
                <Inputs2
                  title="Ngày nhận mẫu:"
                  type="date"
                  defaultValue={samplePhieuPhanTichKetQua.ngayNhanMau}
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Ngày kiểm thử:"
                  type="date"
                  defaultValue={samplePhieuPhanTichKetQua.ngayKiemThu}
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Ngày trả kết quả:"
                  type="date"
                  defaultValue={samplePhieuPhanTichKetQua.ngayTraKetQua}
                />
              </Box>
            </Box>
          </Box>
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                Khác
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-full">
                <Textarea2
                  title="Yêu cầu kiểm nghiệm:"
                  placeholder="Nhập Yêu cầu kiểm nghiệm..."
                  defaultValue={samplePhieuPhanTichKetQua.yeuCauKiemNghiem}
                />
              </Box>
              <Box className="col-span-full">
                <Textarea2
                  title="Ghi chú:"
                  placeholder="Ghi chú..."
                  defaultValue={samplePhieuPhanTichKetQua.ghiChu}
                />
              </Box>
            </Box>
          </Box>
          <Box className="grid gap-4">
            <Box className="flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="text-lg/6 capitalize font-medium text-white">
                  Chi tiết phiếu
                </p>
              </Box>
              {currentItems.data.map((item: any) => (
                <Box key={item.id} className="grid grid-cols-12 gap-6 w-full">
                  <Box className="col-span-4">
                    <Inputs2
                      title="Tên chỉ tiêu:"
                      placeholder="Nhập Tên chỉ tiêu..."
                      defaultValue={item.tenChiTieu}
                    />
                  </Box>
                  <Box className="col-span-4">
                    <Inputs2
                      title="Kết quả:"
                      placeholder="Nhập Kết quả..."
                      defaultValue={item.ketQua}
                    />
                  </Box>
                  <Box className="col-span-4">
                    <Inputs2
                      title="Đơn vị:"
                      placeholder="Nhập Đơn vị..."
                      defaultValue={item.donVi}
                    />
                  </Box>
                  <Box className="col-span-full">
                    <Inputs2
                      title="Mức chất lượng:"
                      placeholder="Nhập Đơn vị..."
                      defaultValue={item.mucChatLuong}
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
            <div className="flex justify-between items-center">
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
                      border: "2px solid white",
                      color: "white",
                    },
                  "&.MuiPagination-root": {
                    backgroundColor: "#005f78",
                    padding: "12px 32px",
                    borderRadius: "6px",
                    border: "2px solid #d1d5dc",
                    boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                  },
                  button: {
                    color: "white",
                    border: "2px solid white",
                    boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                  },
                  "& .Mui-selected": {
                    border: "1px solid white",
                    backgroundColor: "white",
                    color: "#005f78",
                  },
                  "& .Mui-selected:hover": {
                    backgroundColor: "#d1d5dc",
                    color: "#005f78",
                  },
                }}
              />
              <Box className="flex gap-6 justify-center bg-cyan-800 px-8 py-3 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <Tooltip
                  title="Xóa"
                  placement="bottom"
                  arrow
                  disableInteractive
                >
                  <button className="p-1 rounded-full cursor-pointer hover:bg-red-400 bg-red-500 border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <MdDelete className="w-6 h-6 text-white" />
                  </button>
                </Tooltip>
                <Tooltip
                  title="Thêm"
                  placement="bottom"
                  arrow
                  disableInteractive
                >
                  <button className="p-1 rounded-full cursor-pointer hover:bg-green-400 bg-green-500 border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <FaPlus className="w-6 h-6 text-white" />
                  </button>
                </Tooltip>
              </Box>
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

export default SuaPhieuPhanTichKetQua;
