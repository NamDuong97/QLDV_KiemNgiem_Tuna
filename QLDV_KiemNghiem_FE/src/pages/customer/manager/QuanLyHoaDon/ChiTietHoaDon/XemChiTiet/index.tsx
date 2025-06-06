import { Box } from "@mui/material";
import { APP_ROUTES } from "../../../../../../constants/routers";
import { MdDoorBack } from "react-icons/md";
import { motion } from "motion/react";
import { FaAddressCard } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPhoneIphone } from "react-icons/md";
import { Align } from "../../../../../../models/Table";
import TableCTHoaDonThu from "./Table";
import { MdOutlineHomeWork } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaHourglassHalf } from "react-icons/fa";
import { SlNote } from "react-icons/sl";
import { useNavigate } from "react-router";

const data = {
  thongtinchung: {
    donViGuiMau: "Công ty ABC",
    nguoiGuiMau: "Nguyễn Văn A",
    soDienThoai: "0912345678",
    email: "nguyenthic@gmail.com",
    diaChi: "123 Đường DEF, Phường 12, Quận Bình Thạnh, TPHCM",
    ghiChu:
      "Đang chờ xử lý...",
  },
  hoaDon: {
    maHoaDon: "281514",
    ngayTao: "06/06/2025",
    tongTien: "80797 VND",
    trangThai: "Đang chờ xử lý",
  },
};

const tableHead = [
  {
    id: "tenMau",
    sort: false,
    label: "Tên Mẫu",
    align: Align.Center,
  },
  {
    id: "soLuong",
    sort: false,
    label: "Số Lượng",
    align: Align.Center,
  },

  {
    id: "donViTinh",
    sort: false,
    label: "Đơn Vị Tính",
    align: Align.Center,
  },
  {
    id: "thanhTien",
    sort: false,
    label: "Thành Tiền",
    align: Align.Center,
  },
];

const tableBody = [
  {
    tenMau: "Mẫu A",
    soLuong: "2",
    donViTinh: "Kg",
    thanhTien: "600.000",
  },
  {
    tenMau: "Mẫu B",
    soLuong: "2",
    donViTinh: "Kg",
    thanhTien: "600.000",
  },
  {
    tenMau: "Mẫu C",
    soLuong: "2",
    donViTinh: "Kg",
    thanhTien: "600.000",
  },
  {
    tenMau: "Mẫu D",
    soLuong: "5",
    donViTinh: "lọ",
    thanhTien: "600.000",
  },
];

const XemChiTiet = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      key="XemChiTiet"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="grid gap-4 px-20 py-6 sm:py-8"
    >
      <Box className="flex items-center justify-between">
        <Box className="flex items-center gap-2 sm:gap-4">
          <button
            className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
            onClick={() =>
              navigate(APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to)
            }
          >
            <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
          </button>
          <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-cyan-900">
            Hóa Đơn:
          </h1>
        </Box>
      </Box>
      <Box className="grid gap-6">
        <Box className="p-4 border border-gray-300 rounded-md grid grid-cols-3 gap-10">
          <Box className="col-span-1 text-cyan-900 grid gap-2">
            <div className="text-lg/6 flex justify-between gap-2 items-center">
              <span className="font-semibold flex items-center gap-2">
                <RiBillLine className="text-sky-500 w-6 h-6" />
                Mã hóa đơn:
              </span>
              <span className="font-medium">{data.hoaDon.maHoaDon}</span>
            </div>
            <div className="text-lg/6 flex justify-between gap-2 items-center">
              <div className="font-semibold flex items-center gap-2">
                <CiCalendarDate className="text-blue-500 w-6 h-6" /> Ngày tạo:
              </div>
              <span className="font-medium">{data.hoaDon.ngayTao}</span>
            </div>
            <div className="text-lg/6 flex justify-between gap-2 items-center">
              <span className="font-semibold flex items-center gap-2">
                <FaMoneyCheckDollar className="text-emerald-600 w-6 h-6" />
                Tổng tiền:
              </span>
              <span className="font-medium text-red-500">
                {data.hoaDon.tongTien}
              </span>
            </div>
            <div className="text-lg/6 flex justify-between gap-2 items-center">
              <span className="font-semibold flex items-center gap-2">
                <FaHourglassHalf className="text-blue-500 text w-6 h-6" />
                Trạng thái:
              </span>
              <span className="font-medium text-green-500">
                {data.hoaDon.trangThai}
              </span>
            </div>
          </Box>
          <Box className="col-span-1 grid gap-2 pl-4 border-l border-gray-300">
            <div className="font-semibold text-lg/6 flex gap-2 items-center">
              <MdOutlineHomeWork className="text-cyan-700 w-6 h-6" />
              <span className="text-cyan-900">
                {data.thongtinchung.donViGuiMau}
              </span>
            </div>
            <div className="font-semibold text-lg/6 flex gap-2 items-center">
              <FaAddressCard className="text-cyan-700 w-6 h-6" />
              <span className="text-cyan-900">{data.thongtinchung.diaChi}</span>
            </div>
            <div className="font-semibold text-lg/6 flex gap-2 items-center">
              <FaUser className="text-cyan-700 w-6 h-6" />
              <span className="text-cyan-900">
                {data.thongtinchung.nguoiGuiMau}
              </span>
            </div>
            <div className="font-semibold text-lg/6 flex gap-2 items-center">
              <MdPhoneIphone className="text-cyan-950 w-6 h-6" />
              <span className="text-cyan-900">
                {data.thongtinchung.soDienThoai}
              </span>
            </div>
            <div className="font-semibold text-lg/6 flex gap-2 items-center">
              <MdEmail className="text-cyan-700 w-6 h-6" />
              <span className="text-blue-500">{data.thongtinchung.email}</span>
            </div>
          </Box>
          <Box className="col-span-1 grid gap-2 pl-4 border-l border-gray-300">
            <div className="text-lg/6 grid gap-2 text-cyan-900">
              <span className="font-semibold flex items-center gap-2">
                <SlNote className="text-blue-500 w-5 h-5" />
                Ghi chú:
              </span>
              <span className="font-medium whitespace-normal">
                {data.thongtinchung.ghiChu}
              </span>
            </div>
          </Box>
        </Box>
        <Box className="w-full border border-gray-200 rounded-md">
          <div className="px-4 pt-4 pb-2">
            <p className="text-xl/6 font-bold text-cyan-900">
              Chi tiết hóa đơn
            </p>
          </div>
          <TableCTHoaDonThu tableHead={tableHead} tableBody={tableBody} />
        </Box>
        <Box className="flex justify-end">
          <Box className="grid gap-4">
            <div className="p-4 border border-gray-300 rounded-md grid gap-3">
              <p className="flex justify-between gap-44 font-bold">
                <span className="text-red-600 text-2xl/6">Thành Tiền:</span>
                <span className="text-red-600 text-xl/6">12.000.000</span>
              </p>
            </div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default XemChiTiet;
