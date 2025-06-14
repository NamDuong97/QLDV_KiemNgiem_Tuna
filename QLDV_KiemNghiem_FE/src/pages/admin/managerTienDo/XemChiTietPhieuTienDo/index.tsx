import { Box} from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";

const samplePhieuTienDoDetail = {
  maPhieuDangKyMau: "DKM-20250612-001",
  maPhieuTienDo: "PTD-001-20250612",
  ngayNhanMau: "2025-06-10",
  thoiGianTu: "2025-06-10 09:00",
  thoiGianDen: "2025-06-10 17:00",
  tongThoiGianThucHien: "8 giờ",
  nhanVienXuLy: "Nguyễn Văn A",
  nhanVienKiemTra: "Trần Thị B",
  tenGiaiDoanThucHien: "Xử lý mẫu ban đầu",
  noiDungBaoCao: "Mẫu đã được tiếp nhận và chuẩn bị cho phân tích hóa lý.",
  ghiChu: "Không có ghi chú đặc biệt trong giai đoạn này.",
};

const XemChiTietPhieuTienDo = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <motion.div
        key="XemChiTietPhieuTienDo"
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
              onClick={() => navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_TIEN_DO.to)}
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="flex-1 text-center uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết phiếu tiến độ
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
                  Mã Phiếu Đăng Ký Mẫu:
                </p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.maPhieuDangKyMau}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Mã Phiếu Tiến Độ:
                </p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.maPhieuTienDo}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Nhận Mẫu:</p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.ngayNhanMau}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Thời Gian Từ:</p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.thoiGianTu}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Thời Gian Đến:</p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.thoiGianDen}
                </p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Tổng thời gian thực hiện:
                </p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.tongThoiGianThucHien}
                </p>
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
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Tên giai đoạn thực hiện:
                </p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.tenGiaiDoanThucHien}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Nhân viên xử lý:
                </p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.nhanVienXuLy}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Nhân viên kiểm tra:
                </p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.nhanVienKiemTra}
                </p>
              </Box>

              <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Nội dung báo cáo:
                </p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.noiDungBaoCao}
                </p>
              </Box>
              <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ghi chú:</p>
                <p className="capitalize">
                  {samplePhieuTienDoDetail.ghiChu}
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default XemChiTietPhieuTienDo;
