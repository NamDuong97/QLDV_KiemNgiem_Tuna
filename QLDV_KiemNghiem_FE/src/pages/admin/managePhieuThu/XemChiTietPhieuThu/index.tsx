import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";

const samplePhieuThuDetail = {
  maPhieuThu: "PT-001-20250612",
  lyDoThu: "Thu tiền bán hàng hóa",
  soTien: 5500000,
  ngayThu: "2025-06-12",
  maLienKetChungTu: "HD-BH-202506-001",
  nvTao: "Nguyễn Văn A",
};

const XemChiTietPhieuThu = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <motion.div
        key="XemChiTietPhieuThu"
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
              onClick={() => navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.to)}
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="flex-1 text-center uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết phiếu thu
            </h1>
          </Box>
        </Box>
        <Box className="grid gap-20">
          <Box className="flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Mã Phiếu Thu:</p>
                <p className="capitalize">{samplePhieuThuDetail.maPhieuThu}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">NV Tạo:</p>
                <p className="capitalize">{samplePhieuThuDetail.nvTao}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Mã Liên Kết Chứng Từ:
                </p>
                <p className="capitalize">
                  {samplePhieuThuDetail.maLienKetChungTu}
                </p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Số Tiền:</p>
                <p className="capitalize">
                  {samplePhieuThuDetail.soTien.toLocaleString("vi-VN")} VNĐ
                </p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Thu:</p>
                <p className="capitalize">{samplePhieuThuDetail.ngayThu}</p>
              </Box>

              <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Lý Do Thu:</p>
                <p className="capitalize">{samplePhieuThuDetail.lyDoThu}</p>
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default XemChiTietPhieuThu;
