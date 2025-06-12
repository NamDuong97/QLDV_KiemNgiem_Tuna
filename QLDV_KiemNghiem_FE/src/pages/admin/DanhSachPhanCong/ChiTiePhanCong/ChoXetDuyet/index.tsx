import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { MdPerson } from "react-icons/md";
import { motion } from "motion/react";
import { useState } from "react";
import { APP_ROUTES } from "../../../../../constants/routers";
import FeedIcon from "@mui/icons-material/Feed";
import { FaPerson } from "react-icons/fa6";
import DateRangeIcon from "@mui/icons-material/DateRange";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Maus from "./Maus";
import PopupHuyPhieu from "./PopupHuyPhieu";
import { FaDoorOpen } from "react-icons/fa";

const data = {
  thongtinchung: {
    maPhieuDeXuat: "SDS281514",
    maPDKy: "SoDKPT281514",
    tenKH: "Nguyễn Văn A",
    nvDXuat: "Phạm Văn A",
    timeGiaoMau: "11/01/2025",
    trangThai: "Chờ Xử Lý",
    ngayPhanCong: "10/01/2025",
  },
};

const ChoXetDuyet = () => {
  const navigate = useNavigate();

  const [openPopupHuyPhieu, setOpenPopupHuyPhieu] = useState(false);

  const handleClickOpenPopupHuyPhieu = () => {
    setOpenPopupHuyPhieu(true);
  };

  const handleClosePopupHuyPhieu = () => {
    setOpenPopupHuyPhieu(false);
  };

  return (
    <Box className="!relative">
      <motion.div
        key="ChoXetDuyet"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="grid gap-4 px-10 py-20"
      >
        <Box className="flex items-center justify-between bg-cyan-800 px-6 py-3 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Box className="flex items-center gap-4">
            <button
              className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
              onClick={() =>
                navigate(
                  APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_PHONG_CHUYEN_MON.to
                )
              }
            >
              <FaDoorOpen className="w-4 h-4 sm:w-7 sm:h-7 text-sky-600" />
            </button>
            <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
              Thông tin chi tiết phân công:
            </h1>
          </Box>
          <Box className="flex items-center gap-4">
            <button
              onClick={handleClickOpenPopupHuyPhieu}
              className="capitalize border-[2px] border-solid bg-yellow-500 hover:bg-yellow-600 text-white border-gray-300 rounded-md px-4 py-[6px] font-medium text-base/6 flex justify-center cursor-pointer items-center gap-2 shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
            >
              Từ chối
            </button>
            <button className="capitalize border-[2px] border-solid bg-cyan-700 hover:bg-cyan-800 text-white border-gray-300 rounded-md px-6 py-[6px] font-medium text-base/6 flex justify-center cursor-pointer items-center gap-2 shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
              Duyệt
            </button>
          </Box>
        </Box>
        <Box className="grid gap-6">
          <Box className="p-4 border-[2px] border-cyan-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-3xl grid grid-cols-2 gap-6">
            <Box className="col-span-1 text-cyan-900 grid gap-2">
              <div className="text-lg/6 flex justify-between gap-2 items-center">
                <span className="font-semibold flex items-center gap-1">
                  <FeedIcon className="!w-6 !h-6 text-blue-500" />
                  Mã phiếu đề xuất:
                </span>
                <span className="font-medium text-cyan-400">
                  {data.thongtinchung.maPhieuDeXuat}
                </span>
              </div>
              <div className="text-lg/6 flex justify-between gap-2 items-center">
                <span className="font-semibold flex items-center gap-2">
                  <FeedIcon className="!w-6 !h-6 text-blue-500" />
                  Mã phiếu đăng ký:
                </span>
                <span className="font-medium">{data.thongtinchung.maPDKy}</span>
              </div>
              <div className="text-lg/6 flex justify-between gap-2 items-center">
                <span className="font-semibold flex items-center gap-2">
                  <FaPerson className="!w-6 !h-6 text-emerald-500" />
                  Tên khách hàng:
                </span>
                <span className="font-medium text-red-500">
                  {data.thongtinchung.tenKH}
                </span>
              </div>
              <div className="text-lg/6 flex justify-between gap-2 items-center">
                <span className="font-semibold flex items-center gap-2">
                  <MdPerson className="!w-6 !h-6 text-indigo-600" />
                  Nhân viên đề xuất:
                </span>
                <span className="font-medium">
                  {data.thongtinchung.nvDXuat}
                </span>
              </div>
            </Box>
            <Box className="col-span-1 text-cyan-900 grid gap-2 pl-6 border-l border-gray-300">
              <div className="text-lg/6 flex justify-between gap-2 items-center">
                <span className="font-semibold flex items-center gap-2">
                  <DateRangeIcon className="!w-6 !h-6 text-blue-500" />
                  Thời gian giao mẫu:
                </span>
                <span className="font-medium">
                  {data.thongtinchung.timeGiaoMau}
                </span>
              </div>
              <div className="text-lg/6 flex justify-between gap-2 items-center">
                <span className="font-semibold flex items-center gap-2">
                  <VerifiedUserIcon className="!w-6 !h-6 text-green-400" />
                  Trạng thái:
                </span>
                <span className="font-medium text-yellow-500">
                  {data.thongtinchung.trangThai}
                </span>
              </div>
              <div className="text-lg/6 flex justify-between gap-2 items-center">
                <span className="font-semibold flex items-center gap-2">
                  <DateRangeIcon className="!w-6 !h-6 text-blue-500" />
                  Ngày phân công:
                </span>
                <span className="font-medium">
                  {data.thongtinchung.ngayPhanCong}
                </span>
              </div>
            </Box>
          </Box>
          <Box className="border-[2px] border-cyan-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-3xl grid gap-2">
            <Maus />
          </Box>
        </Box>
      </motion.div>
      <PopupHuyPhieu
        open={openPopupHuyPhieu}
        handleClose={handleClosePopupHuyPhieu}
      />
    </Box>
  );
};

export default ChoXetDuyet;
