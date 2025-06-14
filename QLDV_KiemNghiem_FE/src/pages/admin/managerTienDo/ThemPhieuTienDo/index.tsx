import { Box} from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen} from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import Inputs2 from "../../../../components/Inputs2";
import { useState } from "react";
import PopupThongBao from "./PopupThongBao";
import { Textarea2 } from "../../../../components/Textarea2";

const samplePhieuTienDoDetail = {
  maPhieuDangKyMau: "DKM-20250612-001",
  maPhieuTienDo: "PTD-001-20250612",
  ngayNhanMau: "2025-06-10",
  thoiGianTu: "2025-06-10",
  thoiGianDen: "2025-06-10",
  tongThoiGianThucHien: "8 giờ",
  nhanVienXuLy: "Nguyễn Văn A",
  nhanVienKiemTra: "Trần Thị B",
  tenGiaiDoanThucHien: "Xử lý mẫu ban đầu",
  noiDungBaoCao: "Mẫu đã được tiếp nhận và chuẩn bị cho phân tích hóa lý.",
  ghiChu: "Không có ghi chú đặc biệt trong giai đoạn này.",
};

const ThemPhieuTienDo = () => {
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
        key="ThemPhieuTienDo"
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
              onClick={() => navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_TIEN_DO.to)}
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết Thêm phiếu tiến độ
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
                thông tin chung
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4">
                <Inputs2
                  title="Mã Phiếu Đăng Ký Mẫu:"
                  placeholder="Mã phiếu đăng ký mẫu..."
                  defaultValue={samplePhieuTienDoDetail.maPhieuDangKyMau}
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Ngày Nhận Mẫu:"
                  type="date"
                  defaultValue={samplePhieuTienDoDetail.ngayNhanMau}
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Thời Gian Từ:"
                  type="date"
                  placeholder="Thời gian bắt đầu..."
                  defaultValue={samplePhieuTienDoDetail.thoiGianTu}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Thời Gian Đến:"
                  type="date"
                  placeholder="Thời gian kết thúc..."
                  defaultValue={samplePhieuTienDoDetail.thoiGianDen}
                />
              </Box>
              <Box className="col-span-6">
                <Inputs2
                  title="Tổng Thời Gian Thực Hiện:"
                  placeholder="Tổng thời gian..."
                  defaultValue={samplePhieuTienDoDetail.tongThoiGianThucHien}
                />
              </Box>
            </Box>
          </Box>
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                Nội dung công việc
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4">
                <Inputs2
                  title="Nhân Viên Xử Lý:"
                  placeholder="Nhập tên nhân viên xử lý..."
                  defaultValue={samplePhieuTienDoDetail.nhanVienXuLy}
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Nhân Viên Kiểm Tra:"
                  placeholder="Nhập tên nhân viên kiểm tra..."
                  defaultValue={samplePhieuTienDoDetail.nhanVienKiemTra}
                />
              </Box>
              <Box className="col-span-4">
                <Inputs2
                  title="Tên Giai Đoạn Thực Hiện:"
                  placeholder="Nhập tên giai đoạn thực hiện..."
                  defaultValue={samplePhieuTienDoDetail.tenGiaiDoanThucHien}
                />
              </Box>
              <Box className="col-span-12">
                <Inputs2
                  title="Nội Dung Báo Cáo:"
                  placeholder="Nhập nội dung báo cáo..."
                  defaultValue={samplePhieuTienDoDetail.noiDungBaoCao}
                />
              </Box>
              <Box className="col-span-12">
                <Textarea2
                  title="Ghi Chú:"
                  placeholder="Nhập ghi chú..."
                  defaultValue={samplePhieuTienDoDetail.ghiChu}
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

export default ThemPhieuTienDo;
