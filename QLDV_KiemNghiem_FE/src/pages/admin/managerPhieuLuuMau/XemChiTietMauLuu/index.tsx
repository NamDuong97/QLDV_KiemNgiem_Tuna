import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";

const mauLuuData = {
  tenMau: "Huyết thanh Bệnh nhân A",
  soLo: "HT-2025-001",
  khoiLuongMauLuu: 5,
  donViTinh: "mL",
  hanSuDung: "2026-03-15",
  dieuKienBaoQuan: "Đông lạnh -20°C",
  tenNguoiLuuMau: "Nguyễn Thị Lan",
  thoiGianLuuMau: "2025-06-10 10:00",
  maPhongKhoa: "PKXN01",
  tenPhongKhoaLuuMau: "Phòng Xét nghiệm Tổng quát",
};

const XemChiTietMauLuu = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <motion.div
        key="XemChiTietMauLuu"
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
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="flex-1 text-center uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết mẫu lưu
            </h1>
          </Box>
        </Box>
        <Box className="grid gap-20">
          <Box className="flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Tên Mẫu:</p>
                <p className="capitalize">{mauLuuData.tenMau}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Số Lô:</p>
                <p className="capitalize">{mauLuuData.soLo}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Khối Lượng Mẫu Lưu:
                </p>
                <p className="capitalize">
                  {mauLuuData.khoiLuongMauLuu} {mauLuuData.donViTinh}
                </p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Hạn Sử Dụng:</p>
                <p className="capitalize">{mauLuuData.hanSuDung}</p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Tên Người Lưu Mẫu:
                </p>
                <p className="capitalize">{mauLuuData.tenNguoiLuuMau}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Thời Gian Lưu Mẫu:
                </p>
                <p className="capitalize">{mauLuuData.thoiGianLuuMau}</p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Mã Phòng Khoa:</p>
                <p className="capitalize">{mauLuuData.maPhongKhoa}</p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Tên Phòng Khoa Lưu Mẫu:
                </p>
                <p className="capitalize">{mauLuuData.tenPhongKhoaLuuMau}</p>
              </Box>
              <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Điều Kiện Bảo Quản:
                </p>
                <p className="capitalize">{mauLuuData.dieuKienBaoQuan}</p>
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default XemChiTietMauLuu;
