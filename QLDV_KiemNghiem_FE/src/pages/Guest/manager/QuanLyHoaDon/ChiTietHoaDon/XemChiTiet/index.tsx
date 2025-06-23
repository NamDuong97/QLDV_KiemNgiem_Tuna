import { Box } from "@mui/material";
import { APP_ROUTES } from "../../../../../../constants/routers";
import { motion } from "motion/react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPhoneIphone } from "react-icons/md";
import { Align } from "../../../../../../models/Table";
import { MdOutlineHomeWork } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaHourglassHalf } from "react-icons/fa";
import { SlNote } from "react-icons/sl";
import { useNavigate } from "react-router";
import TableCTHoaDonThu from "./Table";
import { LuDoorOpen, LuMapPin } from "react-icons/lu";
import { image } from "../../../../../../constants/image";

const data = {
  thongtinchung: {
    donViGuiMau: "Công ty ABC",
    nguoiGuiMau: "Nguyễn Văn A",
    soDienThoai: "0912345678",
    email: "nguyenthic@gmail.com",
    diaChi: "123 Đường DEF, Phường 12, Quận Bình Thạnh, TPHCM",
    ghiChu: "Đang chờ xử lý...",
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
    >
      <Box className="relative w-full h-[200px]">
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${image.imageBannerPage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(50%)",
            zIndex: 0,
          }}
        />
        <Box className="!absolute py-6 px-6 2xl:px-20 sm:py-8 bottom-0 w-full flex items-center gap-2 sm:gap-4">
          <button
            className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
            onClick={() =>
              navigate(APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to)
            }
          >
            <LuDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
          </button>
          <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
            Hóa Đơn:
          </h1>
        </Box>{" "}
      </Box>
      <Box className="grid gap-6 py-6 px-6 2xl:px-20 sm:py-8">
        <Box className="p-4 border border-gray-300 rounded-md grid grid-cols-6 gap-10">
          <Box className="col-span-6 lg:col-span-3 2xl:col-span-2 text-cyan-900 grid gap-2">
            <div className="text-base/6 sm:text-lg/6 flex justify-between gap-2 items-center">
              <span className="font-semibold flex items-center gap-2">
                <RiBillLine className="text-sky-500 w-5 h-5 sm:w-6 sm:h-6" />
                Mã hóa đơn:
              </span>
              <span className="font-medium">{data.hoaDon.maHoaDon}</span>
            </div>
            <div className="text-base/6 sm:text-lg/6 flex justify-between gap-2 items-center">
              <div className="font-semibold flex items-center gap-2">
                <CiCalendarDate className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />{" "}
                Ngày tạo:
              </div>
              <span className="font-medium">{data.hoaDon.ngayTao}</span>
            </div>
            <div className="text-base/6 sm:text-lg/6  flex justify-between gap-2 items-center">
              <span className="font-semibold flex items-center gap-2">
                <FaMoneyCheckDollar className="text-emerald-600 w-5 h-5 sm:w-6 sm:h-6" />
                Tổng tiền:
              </span>
              <span className="font-medium text-red-500">
                {data.hoaDon.tongTien}
              </span>
            </div>
            <div className="text-base/6 sm:text-lg/6  flex justify-between gap-2 items-center">
              <span className="font-semibold flex items-center gap-2">
                <FaHourglassHalf className="text-blue-500 text w-5 h-5 sm:w-6 sm:h-6" />
                Trạng thái:
              </span>
              <span className="font-medium text-green-500">
                {data.hoaDon.trangThai}
              </span>
            </div>
          </Box>
          <Box className="col-span-6 lg:col-span-3 2xl:col-span-2 grid gap-2 border-t pt-4 lg:pl-4 lg:border-l lg:border-t-0 lg:pt-0 border-gray-300">
            <div className="font-semibold text-base/6 sm:text-lg/6  flex gap-2 items-center">
              <MdOutlineHomeWork className="text-cyan-700 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-cyan-900">
                {data.thongtinchung.donViGuiMau}
              </span>
            </div>
            <div className="font-semibold text-base/6 sm:text-lg/6 sm:flex gap-2 items-start">
              <div className="text-cyan-900 whitespace-normal flex gap-2">
                <LuMapPin className="text-cyan-700 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sm:hidden"> Địa chỉ:</span>
              </div>
              <span className="text-cyan-900 whitespace-normal">
                {data.thongtinchung.diaChi}
              </span>
            </div>
            <div className="font-semibold text-base/6 sm:text-lg/6  flex gap-2 items-center">
              <FaUser className="text-cyan-700 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-cyan-900">
                {data.thongtinchung.nguoiGuiMau}
              </span>
            </div>
            <div className="font-semibold text-base/6 sm:text-lg/6  flex gap-2 items-center">
              <MdPhoneIphone className="text-cyan-950 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-cyan-900">
                {data.thongtinchung.soDienThoai}
              </span>
            </div>
            <div className="font-semibold text-base/6 sm:text-lg/6  flex gap-2 items-center">
              <MdEmail className="text-cyan-700 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-blue-500">{data.thongtinchung.email}</span>
            </div>
          </Box>
          <Box className="col-span-6 2xl:col-span-2 grid gap-2 border-t pt-4 2xl:pl-4 2xl:border-l 2xl:border-t-0 2xl:pt-0 border-gray-300">
            <div className="text-base/6 sm:text-lg/6  grid gap-2 text-cyan-900">
              <span className="font-semibold flex items-center gap-2">
                <SlNote className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
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
          <Box className="grid lg:hidden px-4 gap-4 py-4 border-t border-gray-300">
            {tableBody.map((item, index) => (
              <Box
                key={index}
                className={`grid gap-2 text-cyan-800 ${
                  tableBody.length > index + 1 &&
                  "border-b pb-4 border-gray-300"
                } `}
              >
                <p className="text-lg/6 font-semibold">{item.tenMau}</p>
                <p className="text-lg/6 font-medium flex justify-between">
                  <span>{`${item.soLuong} 
                  ${item.donViTinh}`}</span>
                  <span className="text-orange-500">{item.thanhTien}</span>
                </p>
              </Box>
            ))}
          </Box>
          <Box className="hidden lg:block">
            <TableCTHoaDonThu tableHead={tableHead} tableBody={tableBody} />
          </Box>
        </Box>
        <Box className="flex justify-end">
          <Box className="grid gap-4 w-full sm:w-auto">
            <div className="p-4 border border-gray-300 rounded-md grid gap-3">
              <p className="flex justify-between sm:gap-44 font-bold">
                <span className="text-red-600 text-xl/6 sm:text-2xl/6">
                  Thành Tiền:
                </span>
                <span className="text-red-600 text-lg/6 sm:text-xl/6">
                  12.000.000
                </span>
              </p>
            </div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default XemChiTiet;
