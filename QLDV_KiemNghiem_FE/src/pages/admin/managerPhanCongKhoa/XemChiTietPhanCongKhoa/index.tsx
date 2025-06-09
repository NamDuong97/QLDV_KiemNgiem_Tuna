import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { MdAccountBox, MdDescription, MdPerson } from "react-icons/md";
import { motion } from "motion/react";
import FeedIcon from "@mui/icons-material/Feed";
import { FaPerson } from "react-icons/fa6";
import DateRangeIcon from "@mui/icons-material/DateRange";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Maus from "./Maus";
import { FaDoorOpen } from "react-icons/fa";
import { APP_ROUTES } from "../../../../constants/routers";
import { useState } from "react";
import PopupTuChoiPhongChuyenMon from "./PopupTuChoiPhongChuyenMon";

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

const XemChiTietPhanCongKhoa = () => {
  const navigate = useNavigate();

  const [isTag, setIsTag] = useState(1);

  const isNhanVien = "Ban Lãnh Đạo"; //Nhân viên KH&DT || Ban Lãnh Đạo

  const [openPopupTuChoiPhongChuyenMon, setOpenPopupTuChoiPhongChuyenMon] =
    useState(false);
  const handleClickOpenPopupTuChoiPhongChuyenMon = () => {
    setOpenPopupTuChoiPhongChuyenMon(true);
  };
  const handleClosePopupTuChoiPhongChuyenMon = () => {
    setOpenPopupTuChoiPhongChuyenMon(false);
  };

  const handleRedirectPhanCongLai = () => {
    navigate(APP_ROUTES.TUNA_ADMIN.PHAN_CONG_PHONG_CHUYEN_MON.to);
  };

  const handleTag = () => {
    switch (isTag) {
      case 2: {
        return (
          <div className="px-1 py-1 bg-[#e9ecf1] flex gap-4 justify-between rounded-[8px] ">
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className="text-base/6 capitalize sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />{" "}
                Thông Tin phân công
              </p>
            </div>

            <div
              className="flex items-center justify-center py-2 border-[2px] border-solid border-gray-400 rounded-[8px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-100 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-base/6 capitalize sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />{" "}
                Mẫu Từ chối
              </p>
            </div>
          </div>
        );
      }
      default: {
        return (
          <div className="px-1 py-1 bg-[#e9ecf1] flex gap-4 justify-between rounded-[8px] ">
            <div
              className="flex items-center justify-center py-2 border-[2px] border-solid border-gray-400 rounded-[8px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-100 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className="text-base/6 sm:text-xl/6 capitalize text-cyan-800 font-bold flex gap-2 items-center leading-6">
                <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />
                Thông Tin phân công
              </p>
            </div>
            <div
              className="flex items-center justify-center py-2 border-[2px] border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-base/6 capitalize sm:text-xl/6 text-cyan-800 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />{" "}
                Mẫu Từ chối
              </p>
            </div>
          </div>
        );
      }
    }
  };

  const handleShowByTag = () => {
    switch (isTag) {
      case 2:
        return (
          <motion.div
            key="mautuchoi"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box className="grid gap-6">
              <Box className="border-[2px] border-cyan-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-3xl grid gap-2">
                <Maus />
              </Box>
            </Box>
          </motion.div>
        );
      default: {
        return (
          <motion.div
            key="thongtinphancong"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
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
                    <span className="font-medium">
                      {data.thongtinchung.maPDKy}
                    </span>
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
        );
      }
    }
  };

  const handleButton = () => {
    if (isTag === 2) {
      switch (isNhanVien as string) {
        case "Nhân viên KH&DT":
          return (
            <button
              onClick={handleRedirectPhanCongLai}
              className="border-[2px] uppercase border-solid bg-cyan-700 hover:bg-cyan-800 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-white border-gray-300 px-6 py-2 font-bold text-base/6 flex justify-center cursor-pointer items-center gap-2 rounded-br-2xl rounded-bl-2xl"
            >
              Phân Công lại
            </button>
          );
        case "Ban Lãnh Đạo":
          return (
            <button
              onClick={handleClickOpenPopupTuChoiPhongChuyenMon}
              className="border-[2px] uppercase border-solid bg-cyan-700 hover:bg-cyan-800 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-white border-gray-300 px-6 py-2 font-bold text-base/6 flex justify-center cursor-pointer items-center gap-2 rounded-br-2xl rounded-bl-2xl"
            >
              Lý Do từ chối
            </button>
          );
      }
    }
  };

  return (
    <Box className="!relative">
      <motion.div
        key="ChoXetDuyet"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="grid gap-4 px-14 py-20"
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
              Thông tin chi tiết phân công khoa nội
            </h1>
          </Box>
        </Box>
        {handleTag()}
        {handleShowByTag()}
        <Box className="fixed top-80 -right-[68px] rotate-90">
          {handleButton()}
        </Box>
      </motion.div>
      <PopupTuChoiPhongChuyenMon
        open={openPopupTuChoiPhongChuyenMon}
        handleClose={handleClosePopupTuChoiPhongChuyenMon}
      />
    </Box>
  );
};

export default XemChiTietPhanCongKhoa;
