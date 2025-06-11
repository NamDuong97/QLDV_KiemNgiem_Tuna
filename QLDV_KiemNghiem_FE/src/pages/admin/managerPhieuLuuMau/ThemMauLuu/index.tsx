import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import Inputs2 from "../../../../components/Inputs2";
import { useState } from "react";
import PopupThongBao from "./PopupThongBao";

const mauLuuData = {
  tenMau: "Huyết thanh Bệnh nhân A",
  soLo: "HT-2025-001",
  khoiLuongMauLuu: 5,
  donViTinh: "mL",
  hanSuDung: "2026-03-15",
  dieuKienBaoQuan: "Đông lạnh -20°C",
  tenNguoiLuuMau: "Nguyễn Thị Lan",
  thoiGianLuuMau: "2025-06-10",
  maPhongKhoa: "PKXN01",
  tenPhongKhoaLuuMau: "Phòng Xét nghiệm Tổng quát",
};

const ThemMauLuu = () => {
  const navigate = useNavigate();

  const [openPopupThongBao, setOpenPopupThongBao] = useState(false);
  const handleClickOpenPopupThongBao = () => {
    setOpenPopupThongBao(true);
  };
  const handleClosePopupThongBao = () => {
    setOpenPopupThongBao(false);
  };

  return (
    <Box>
      <motion.div
        key="ThemMauLuu"
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
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết Thêm mẫu lưu
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
          <Box className="flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4">
                <Inputs2
                  title="Tên Mẫu"
                  placeholder="Nhập tên mẫu..."
                  defaultValue={mauLuuData.tenMau}
                />
              </Box>

              <Box className="col-span-4">
                <Inputs2
                  title="Số Lô"
                  placeholder="Nhập số lô..."
                  defaultValue={mauLuuData.soLo}
                />
              </Box>
              <Box className="col-span-4 ">
                <Inputs2
                  title="Khối Lượng Mẫu Lưu:"
                  placeholder="Nhập Khối Lượng Mẫu Lưu..."
                  defaultValue={mauLuuData.khoiLuongMauLuu}
                />
              </Box>

              <Box className="col-span-4">
                <Inputs2
                  title="Đơn vị tính:"
                  placeholder="Đơn vị tính..."
                  defaultValue={mauLuuData.donViTinh}
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Hạn Sử Dụng"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  defaultValue={mauLuuData.hanSuDung}
                />
              </Box>

              <Box className="col-span-4">
                <Inputs2
                  title="Tên Người Lưu Mẫu"
                  placeholder="Nhập tên người lưu mẫu..."
                  defaultValue={mauLuuData.tenNguoiLuuMau}
                />
              </Box>

              <Box className="col-span-4">
                <Inputs2
                  title="Thời Gian Lưu Mẫu"
                  placeholder="YYYY-MM-DD HH:mm"
                  type="date"
                  defaultValue={mauLuuData.thoiGianLuuMau}
                />
              </Box>

              <Box className="col-span-4">
                <Inputs2
                  title="Mã Phòng Khoa"
                  placeholder="Nhập mã phòng khoa..."
                  defaultValue={mauLuuData.maPhongKhoa}
                />
              </Box>

              <Box className="col-span-4">
                <Inputs2
                  title="Tên Phòng Khoa Lưu Mẫu"
                  placeholder="Nhập tên phòng khoa..."
                  defaultValue={mauLuuData.tenPhongKhoaLuuMau}
                />
              </Box>
              <Box className="col-span-full">
                <Inputs2
                  title="Điều Kiện Bảo Quản"
                  placeholder="Ví dụ: Đông lạnh -20°C"
                  defaultValue={mauLuuData.dieuKienBaoQuan}
                />
              </Box>
            </Box>
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

export default ThemMauLuu;
