import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import { useState } from "react";

const employeeData = {
  // I. Thông tin cá nhân
  maNV: "NV001",
  hoTen: "Nguyễn Văn An",
  gioiTinh: "Nam",
  ngaySinh: "1990-05-15",
  noiSinh: "Hà Nội",
  diaChi: "123 Đường Trần Phú, Quận Hà Đông, Hà Nội",
  cccd: "012345678901",
  ngayCapCCCD: "2015-08-20",
  noiCap: "Cục Cảnh sát QLHC về TTXH",
  diaChiThuongTru: "123 Đường Trần Phú, Quận Hà Đông, Hà Nội",
  emailCaNhan: "an.nguyen@example.com",
  soDienThoai: "0912345678",

  // II. Thông tin công việc
  maKhoa: "KHS01", // Khoa Hóa Sinh
  maBoPhan: "BP01", // Phòng Phân tích
  maChucVu: "CV01", // Kỹ thuật viên
  trangThai: "Đang làm việc",
  ngayLamViec: "2018-01-10",
  ngayThoiViec: null,
  lamViec: true,

  // III. Thông tin hệ thống
  tenTaiKhoan: "nv.an",
  matKhau: "hashed_password_123",
  maLoaiTK: "NV",
  ngaySuaMatKhau: "2025-03-01",
  ngayHetHanMatKhau: "2026-03-01",

  // IV. Nhật ký hệ thống
  nguoiTao: "admin",
  nguoiSua: "admin",
  ngayTao: "2018-01-10T08:00:00Z",
  ngaySua: "2025-06-01T10:15:00Z",
};

const XemChiTietTTNhanVien = () => {
  const navigate = useNavigate();

  const [isPws, setIsPws] = useState(false);

  return (
    <Box className="relative">
      <motion.div
        key="XemChiTietTTNhanVien"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-12 px-14 py-20"
      >
        <Box className="flex items-center justify-between bg-cyan-800 px-6 py-3 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Box className="flex items-center gap-4">
            <button
              className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
              onClick={() =>
                navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_NHAN_VIEN.to)
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="uppercase text-xl/4 sm:text-3xl/6 font-bold text-white">
              Thông tin chi tiết Nhân viên
            </h1>
          </Box>
        </Box>
        <Box className="grid gap-20">
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-4 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                Thông tin nhân viên
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Mã Nhân Viên:</p>
                <p className="capitalize">{employeeData.maNV}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Họ Tên:</p>
                <p className="capitalize">{employeeData.hoTen}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Giới Tính:</p>
                <p className="capitalize">{employeeData.gioiTinh}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Sinh:</p>
                <p className="capitalize">{employeeData.ngaySinh}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Nơi Sinh:</p>
                <p className="capitalize">{employeeData.noiSinh}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Email Cá Nhân:</p>
                <p className="capitalize">{employeeData.emailCaNhan}</p>
              </Box>
              <Box className="col-span-3 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">CCCD:</p>
                <p className="capitalize">{employeeData.cccd}</p>
              </Box>
              <Box className="col-span-3 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Cấp CCCD:</p>
                <p className="capitalize">{employeeData.ngayCapCCCD}</p>
              </Box>
              <Box className="col-span-3 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Nơi Cấp:</p>
                <p className="capitalize">{employeeData.noiCap}</p>
              </Box>
              <Box className="col-span-3 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Số Điện Thoại:</p>
                <p className="capitalize">{employeeData.soDienThoai}</p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Địa Chỉ:</p>
                <p className="capitalize">{employeeData.diaChi}</p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  {" "}
                  Địa Chỉ Thường Trú:
                </p>
                <p className="capitalize">{employeeData.diaChiThuongTru}</p>
              </Box>
            </Box>
          </Box>
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-4 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                Thông tin công việc
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Khoa:</p>
                <p className="capitalize">{employeeData.maKhoa}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Bộ Phận:</p>
                <p className="capitalize">{employeeData.maBoPhan}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Chức Vụ:</p>
                <p className="capitalize">{employeeData.maChucVu}</p>
              </Box>
              <Box className="col-span-3 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Trạng Thái:</p>
                <p className="capitalize">{employeeData.trangThai}</p>
              </Box>
              <Box className="col-span-3 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Làm Việc:</p>
                <p className="capitalize">{employeeData.ngayLamViec}</p>
              </Box>
              <Box className="col-span-3 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Ngày Thôi Việc:
                </p>
                <p className="capitalize">
                  {employeeData.ngayThoiViec || "N/A"}
                </p>
              </Box>
              <Box className="col-span-3 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Làm Việc:</p>
                <p className="capitalize">
                  {employeeData.lamViec ? "Có" : "Không"}
                </p>
              </Box>
            </Box>
          </Box>
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-4 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                Thông tin hệ thống
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Tên Tài Khoản:</p>
                <p className="capitalize">{employeeData.tenTaiKhoan}</p>
              </Box>
              <Box className="col-span-4 flex gap-2 items-center justify-between text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <Box className="flex gap-2">
                  <p className="font-bold text-lg/6 capitalize">Mật Khẩu:</p>
                  <p className="capitalize">
                    {isPws ? employeeData.matKhau : " ******"}
                  </p>
                </Box>
                <Box className="flex items-center">
                  <button
                    className="cursor-pointer"
                    onClick={() => setIsPws(!isPws)}
                  >
                    {isPws ? (
                      <FaRegEye className="w-6 h-6" />
                    ) : (
                      <FaRegEyeSlash className="w-6 h-6" />
                    )}
                  </button>
                </Box>
              </Box>
              <Box className="col-span-4 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Mã Loại TK:</p>
                <p className="capitalize">{employeeData.maLoaiTK}</p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Ngày Sửa Mật Khẩu:
                </p>
                <p className="capitalize">{employeeData.ngaySuaMatKhau}</p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">
                  Ngày Hết Hạn Mật Khẩu:
                </p>
                <p className="capitalize">{employeeData.ngayHetHanMatKhau}</p>
              </Box>
            </Box>
          </Box>
          <Box className="relative flex items-center justify-between bg-cyan-800 px-6 py-8 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-4 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                Nhật ký hệ thống
              </p>
            </Box>
            <Box className="grid grid-cols-12 gap-6 w-full">
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Người Tạo:</p>
                <p className="capitalize">{employeeData.nguoiTao}</p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Người Sửa:</p>
                <p className="capitalize">{employeeData.nguoiSua}</p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Tạo:</p>
                <p className="capitalize">{employeeData.ngayTao}</p>
              </Box>
              <Box className="col-span-6 flex gap-2 text-cyan-950 bg-white w-full px-4 py-2 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="font-bold text-lg/6 capitalize">Ngày Sửa:</p>
                <p className="capitalize">{employeeData.ngaySua}</p>
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default XemChiTietTTNhanVien;
