import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaDoorOpen, FaHourglassHalf, FaUser } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import { SlNote } from "react-icons/sl";
import { MdEmail, MdOutlineHomeWork, MdPhoneIphone } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { CiCalendarDate, CiStickyNote } from "react-icons/ci";
import { RiBillLine } from "react-icons/ri";
import { Align } from "../../../../models/Table";
import TableCTHoaDonThu from "./Table";

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
    soDKPT: "SoDKPT001",
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

const XemChiTietHoaDon = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <motion.div
        key="XemChiTietHoaDon"
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
              onClick={() => navigate(APP_ROUTES.TUNA_ADMIN.LIST_HOA_DON.to)}
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="text-center uppercase text-xl/4 sm:text-3xl/6 font-bold text-white">
              Thông tin chi tiết Hóa đơn
            </h1>
          </Box>
        </Box>

        <Box className="grid gap-20">
          <Box className="flex items-center justify-between bg-cyan-800 p-5 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="grid grid-cols-6 gap-10">
              <Box className="col-span-6 lg:col-span-3 2xl:col-span-2 text-white grid gap-2">
                <div className="text-base/6 sm:text-lg/6 flex justify-between gap-2 items-center">
                  <span className="font-semibold flex items-center gap-2">
                    <RiBillLine className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    Mã hóa đơn:
                  </span>
                  <span className="font-medium">{data.hoaDon.maHoaDon}</span>
                </div>
                <div className="text-base/6 sm:text-lg/6 flex justify-between gap-2 items-center">
                  <div className="font-semibold flex items-center gap-2">
                    <CiCalendarDate className="text-white w-5 h-5 sm:w-6 sm:h-6" />{" "}
                    Ngày tạo:
                  </div>
                  <span className="font-medium">{data.hoaDon.ngayTao}</span>
                </div>
                <div className="text-base/6 sm:text-lg/6  flex justify-between gap-2 items-center">
                  <span className="font-semibold flex items-center gap-2">
                    <FaMoneyCheckDollar className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    Tổng tiền:
                  </span>
                  <span className="font-medium text-[#FF6347]">
                    {data.hoaDon.tongTien}
                  </span>
                </div>
                <div className="text-base/6 sm:text-lg/6  flex justify-between gap-2 items-center">
                  <span className="font-semibold flex items-center gap-2">
                    <FaHourglassHalf className="text-white text w-5 h-5 sm:w-6 sm:h-6" />
                    Trạng thái:
                  </span>
                  <span className="font-medium text-green-500">
                    {data.hoaDon.trangThai}
                  </span>
                </div>
                <div className="text-base/6 sm:text-lg/6  flex justify-between gap-2 items-center">
                  <span className="font-semibold flex items-center gap-2">
                    <CiStickyNote className="text-white text w-5 h-5 sm:w-6 sm:h-6" />
                    Số DKPT:
                  </span>
                  <span className="font-medium">{data.hoaDon.soDKPT}</span>
                </div>
              </Box>
              <Box className="col-span-6 lg:col-span-3 2xl:col-span-2 grid gap-2 border-t pt-4 lg:pl-4 lg:border-l lg:border-t-0 lg:pt-0 border-gray-300">
                <div className="font-semibold text-base/6 sm:text-lg/6  flex gap-2 items-center">
                  <MdOutlineHomeWork className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-white">
                    {data.thongtinchung.donViGuiMau}
                  </span>
                </div>
                <div className="font-semibold text-base/6 sm:text-lg/6 sm:flex gap-2 items-start">
                  <div className="text-white whitespace-normal flex gap-2">
                    <LuMapPin className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="sm:hidden"> Địa chỉ:</span>
                  </div>
                  <span className="text-white whitespace-normal">
                    {data.thongtinchung.diaChi}
                  </span>
                </div>
                <div className="font-semibold text-base/6 sm:text-lg/6  flex gap-2 items-center">
                  <FaUser className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-white">
                    {data.thongtinchung.nguoiGuiMau}
                  </span>
                </div>
                <div className="font-semibold text-base/6 sm:text-lg/6  flex gap-2 items-center">
                  <MdPhoneIphone className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-white">
                    {data.thongtinchung.soDienThoai}
                  </span>
                </div>
                <div className="font-semibold text-base/6 sm:text-lg/6  flex gap-2 items-center">
                  <MdEmail className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-white">{data.thongtinchung.email}</span>
                </div>
              </Box>
              <Box className="col-span-6 2xl:col-span-2 grid gap-2 border-t pt-4 2xl:pl-4 2xl:border-l 2xl:border-t-0 2xl:pt-0 border-gray-300">
                <div className="text-base/6 sm:text-lg/6  grid gap-2 text-white">
                  <span className="font-semibold flex items-center gap-2">
                    <SlNote className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    Ghi chú:
                  </span>
                  <span className="font-medium whitespace-normal">
                    {data.thongtinchung.ghiChu}
                  </span>
                </div>
              </Box>
            </Box>
          </Box>
          <Box className="relative flex items-center justify-between bg-cyan-800 pt-8 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <p className="text-lg/6 capitalize font-medium text-white">
                chi tiết hóa đơn
              </p>
            </Box>
            <Box className="w-full">
              <TableCTHoaDonThu tableHead={tableHead} tableBody={tableBody} />
            </Box>
          </Box>
          <Box className="grid gap-12">
            <Box className="flex items-center justify-between bg-cyan-800 p-5 rounded-xl border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Box className="grid grid-cols-12 gap-10 w-full">
                <Box className="col-span-4 text-white grid gap-2">
                  <div className="text-base/6 sm:text-lg/6 flex justify-between gap-2 items-center">
                    <span className="font-semibold flex items-center gap-2">
                      <RiBillLine className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      Mã hóa đơn bổ sung:
                    </span>
                    <span className="font-medium">{data.hoaDon.maHoaDon}</span>
                  </div>
                </Box>
                <Box className="col-span-4 grid gap-2 border-t pt-4 lg:pl-4 lg:border-l lg:border-t-0 lg:pt-0 border-gray-300">
                  <div className="text-base/6 sm:text-lg/6  flex justify-between gap-2 items-center">
                    <span className="font-semibold flex items-center gap-2 text-white">
                      <FaMoneyCheckDollar className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      Tổng tiền:
                    </span>
                    <span className="font-medium text-[#FF6347]">
                      {data.hoaDon.tongTien}
                    </span>
                  </div>
                </Box>
                <Box className="col-span-4 grid gap-2 border-t pt-4 2xl:pl-4 2xl:border-l 2xl:border-t-0 2xl:pt-0 border-gray-300">
                  <div className="text-base/6 sm:text-lg/6  flex justify-between gap-2 items-center">
                    <span className="font-semibold flex items-center gap-2 text-white">
                      <FaHourglassHalf className="text-white text w-5 h-5 sm:w-6 sm:h-6" />
                      Trạng thái thanh toán:
                    </span>
                    <span className="font-medium text-green-500">
                      {data.hoaDon.trangThai}
                    </span>
                  </div>
                </Box>
              </Box>
            </Box>
            <Box className="grid gap-4">
              <Box className="relative flex items-center justify-between bg-cyan-800 pt-8 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <Box className="absolute -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  <p className="text-lg/6 capitalize font-medium text-white">
                    chi tiết hóa đơn bổ sung
                  </p>
                </Box>
                <Box className="w-full">
                  <TableCTHoaDonThu
                    tableHead={tableHead}
                    tableBody={tableBody}
                  />
                </Box>
              </Box>
              <div className="flex justify-between items-center">
                <Pagination
                  count={5}
                  // page={currentPage}
                  // onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  sx={{
                    '[aria-label="Go to next page"],[aria-label="Go to previous page"]':
                      {
                        backgroundColor: "#1976d21f",
                        border: "2px solid white",
                        color: "white",
                      },
                    "&.MuiPagination-root": {
                      backgroundColor: "#005f78",
                      padding: "12px 32px",
                      borderRadius: "6px",
                      border: "2px solid #d1d5dc",
                      boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                    },
                    button: {
                      color: "white",
                      border: "2px solid white",
                      boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                    },
                    "& .Mui-selected": {
                      border: "1px solid white",
                      backgroundColor: "white",
                      color: "#005f78",
                    },
                    "& .Mui-selected:hover": {
                      backgroundColor: "#d1d5dc",
                      color: "#005f78",
                    },
                  }}
                />
                <Box className="flex gap-6 justify-center bg-gray-50 px-8 py-3 rounded-xl border-[2px] border-cyan-800 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  <Box className="grid gap-4 w-full">
                    <p className="flex justify-between sm:gap-44 font-bold">
                      <span className="text-cyan-800 text-base/6">
                        Hóa đơn bổ sung 1:
                      </span>
                      <span className="text-cyan-800 text-base/6">
                        6.000.000
                      </span>
                    </p>
                    <hr className="text-cyan-800" />
                    <p className="flex justify-between sm:gap-44 font-bold">
                      <span className="text-red-500 text-2xl/6">
                        Thành Tiền:
                      </span>
                      <span className="text-red-500 text-xl/6">12.000.000</span>
                    </p>
                  </Box>
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default XemChiTietHoaDon;
