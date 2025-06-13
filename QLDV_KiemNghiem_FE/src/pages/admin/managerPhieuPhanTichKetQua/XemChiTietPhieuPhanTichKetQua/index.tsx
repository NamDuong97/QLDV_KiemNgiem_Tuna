import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import { useState } from "react";

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
      donVi: "CFU/100ml",
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

const XemChiTietPhieuPhanTichKetQua = () => {
  const navigate = useNavigate();

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
        key="XemChiTietPhieuPhanTichKetQua"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-12 px-14 py-20"
      >
        <Box className="flex items-center justify-between bg-cyan-800 px-6 py-3 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Box className="flex items-center gap-4 w-full">
            <button
              className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              onClick={() =>
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="flex-1 text-center uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết phiếu Phân Tích Kết Quả
            </h1>
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
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Mã Phiếu Kết Quả:
                </p>
                <p className="capitalize">
                  {samplePhieuPhanTichKetQua.maPhieuKetQua}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Tên Mẫu:</p>
                <p className="capitalize">{samplePhieuPhanTichKetQua.tenMau}</p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Lưu Mẫu:</p>
                <p className="capitalize">{samplePhieuPhanTichKetQua.luuMau}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Khoa:</p>
                <p className="capitalize">{samplePhieuPhanTichKetQua.maKhoa}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Nhân viên lập:</p>
                <p className="capitalize">{samplePhieuPhanTichKetQua.NvLap}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Nhân viên Kiểm tra:
                </p>
                <p className="capitalize">
                  {samplePhieuPhanTichKetQua.NvKiemTra}
                </p>
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
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày nhận mẫu:</p>
                <p className="capitalize">
                  {samplePhieuPhanTichKetQua.ngayNhanMau}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày kiểm thử:</p>
                <p className="capitalize">
                  {samplePhieuPhanTichKetQua.ngayKiemThu}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Ngày trả kết quả:
                </p>
                <p className="capitalize">
                  {samplePhieuPhanTichKetQua.ngayTraKetQua}
                </p>
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
              <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Yêu cầu kiểm nghiệm:
                </p>
                <p className="capitalize">
                  {samplePhieuPhanTichKetQua.yeuCauKiemNghiem}
                </p>
              </Box>

              <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ghi chú:</p>
                <p className="capitalize">{samplePhieuPhanTichKetQua.ghiChu}</p>
              </Box>
            </Box>
          </Box>
          <Box className="grid gap-4">
            <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="text-lg/6 capitalize font-medium text-white">
                  Chi tiết phiếu
                </p>
              </Box>
              {currentItems.data.map((item: any) => (
                <Box key={item.id} className="grid grid-cols-12 gap-6 w-full">
                  <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">
                      Tên chỉ tiêu:
                    </p>
                    <p className="capitalize">{item.tenChiTieu}</p>
                  </Box>

                  <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">Kết quả:</p>
                    <p className="capitalize">{item.ketQua}</p>
                  </Box>

                  <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">Đơn vị:</p>
                    <p className="capitalize">{item.donVi}</p>
                  </Box>
                  <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">
                      Mức chất lượng:
                    </p>
                    <p className="capitalize">{item.mucChatLuong}</p>
                  </Box>

                  <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    <p className="font-bold text-lg/6 capitalize">Ghi chú:</p>
                    <p className="capitalize">{item.ghiChu}</p>
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
    </Box>
  );
};

export default XemChiTietPhieuPhanTichKetQua;
