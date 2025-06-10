import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import Inputs2 from "../../../../components/Inputs2";
import { useState } from "react";
import PopupThongBao from "./PopupThongBao";

const phieuPhanCongNoiBoData = {
  tenNhanVienThucHien: "Nguyễn Thị Lan",
  thoiGianPhanCong: "2025-06-10",
  hanTraKetQua: "2025-06-12",
  nguoiTaoPhieu: "Trần Văn Dũng",
  tenMau: "Huyết thanh Bệnh nhân B - Lô HT-2025-002",
};

const SuaPhanCong = () => {
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
        key="SuaPhanCong"
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
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết cập nhật phân công nhân viên
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
                  placeholder="Tên mẫu được phân công..."
                  defaultValue={phieuPhanCongNoiBoData.tenMau}
                  readOnly // Nếu đây là thông tin chỉ để hiển thị, bạn có thể đặt readOnly
                />
              </Box>

              <Box className="col-span-4">
                <Inputs2
                  title="Tên Nhân Viên Thực Hiện"
                  placeholder="Tên nhân viên..."
                  defaultValue={phieuPhanCongNoiBoData.tenNhanVienThucHien}
                  readOnly
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Thời Gian Phân Công"
                  placeholder="YYYY-MM-DD HH:mm:ss"
                  type="date"
                  defaultValue={phieuPhanCongNoiBoData.thoiGianPhanCong}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Hạn Trả Kết Quả"
                  placeholder="YYYY-MM-DD HH:mm:ss"
                  type="date"
                  defaultValue={phieuPhanCongNoiBoData.hanTraKetQua}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Người Tạo Phiếu"
                  placeholder="Người đã tạo phiếu..."
                  defaultValue={phieuPhanCongNoiBoData.nguoiTaoPhieu}
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

export default SuaPhanCong;
