import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import TableImages from "./TableImages";
import { Align } from "../../../../models/Table";

const phieuPhanCongNoiBoData = {
  tenNhanVienThucHien: "Nguyễn Thị Lan",
  thoiGianPhanCong: "2025-06-10 09:30:00",
  hanTraKetQua: "2025-06-12 17:00:00",
  nguoiTaoPhieu: "Trần Văn Dũng",
  tenMau: "Huyết thanh Bệnh nhân B - Lô HT-2025-002",
  mau: {
    tenMau: "Mẫu Nước Uống Đóng Chai",
    tieuChuan: "ISO 22000:2018",
    dichVu: "Kiểm nghiệm vi sinh",
    soLo: "NU-20250610-001",
    ngaySanXuat: "2025-06-01",
    thoiGianHoanThanh: "2025-06-15 17:00:00",
    ngayDuKienTraKetQua: "2025-06-18",
    hanSuDung: "2026-06-01",
    soLuong: 100,
    donViTinh: "mL",
    dieuKienBaoQuan: "Nhiệt độ phòng (20-25°C), tránh ánh sáng trực tiếp",
    donViSanXuat: "Công ty TNHH Nước Sạch ABC",
    tinhTrangMau: "Mẫu nguyên vẹn, không rách, không hở, có niêm phong.",
    yeuCauKiemNghiem:
      "Kiểm tra chỉ tiêu tổng Coliform, E.coli, Pseudomonas aeruginosa.",
    ghiChu: "Liên hệ phòng QC khi có kết quả.",
    luuMau: "Có lưu mẫu",
    xuatKetQua: "Có xuất kết quả",
  },
};

const tableHeadImages = [
  {
    id: "image",
    sort: false,
    label: "Ảnh",
    align: Align.Center,
  },
];

const XemChiTietPhanCongNoiBo = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <motion.div
        key="XemChiTietPhanCongNoiBo"
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
                navigate(APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_NOI_BO.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="flex-1 text-center uppercase text-xl/4 sm:text-3xl/6 font-bold text-white pr-32">
              Thông tin chi tiết phân công
            </h1>
          </Box>
        </Box>
        <Box className="grid gap-20">
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                Thông tin phân công
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Tên Mẫu:</p>
                <p className="capitalize">{phieuPhanCongNoiBoData.tenMau}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Tên Nhân Viên Thực Hiện:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.tenNhanVienThucHien}
                </p>
              </Box>

              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Thời Gian Phân Công:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.thoiGianPhanCong}
                </p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Hạn Trả Kết Quả:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.hanTraKetQua}
                </p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Người Tạo Phiếu:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.nguoiTaoPhieu}
                </p>
              </Box>
            </Box>
          </Box>
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                Thông tin Chi tiết mẫu
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Tên Mẫu:</p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.tenMau}
                </p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Tiêu Chuẩn:</p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.tieuChuan}
                </p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Dịch Vụ:</p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.dichVu}
                </p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Số Lô:</p>
                <p className="capitalize">{phieuPhanCongNoiBoData.mau.soLo}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Sản Xuất:</p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.ngaySanXuat}
                </p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Thời Gian Hoàn Thành:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.thoiGianHoanThanh}
                </p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Ngày Dự Kiến Trả Kết Quả:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.ngayDuKienTraKetQua}
                </p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Hạn Sử Dụng:</p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.hanSuDung}
                </p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Số Lượng:</p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.soLuong}{" "}
                  {phieuPhanCongNoiBoData.mau.donViTinh}
                </p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Điều Kiện Bảo Quản:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.dieuKienBaoQuan}
                </p>
              </Box>

              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Đơn Vị Sản Xuất:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.donViSanXuat}
                </p>
              </Box>
              <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Tình Trạng Mẫu:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.tinhTrangMau}
                </p>
              </Box>
              <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Yêu Cầu Kiểm Nghiệm:
                </p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.yeuCauKiemNghiem}
                </p>
              </Box>
              <Box className="col-span-full flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ghi Chú:</p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.ghiChu}
                </p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Lưu Mẫu:</p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.luuMau}
                </p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Xuất Kết Quả:</p>
                <p className="capitalize">
                  {phieuPhanCongNoiBoData.mau.xuatKetQua}
                </p>
              </Box>
              <Box className="col-span-12 ">
                <TableImages tableHead={tableHeadImages} />
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default XemChiTietPhanCongNoiBo;
