import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Inputs } from "../../../../components/Inputs";
import DetailMaus from "./Detail-Maus";
import DetailPLHCs from "./Detail-PLHC";
import PopupHuyPhieu from "./PopupHuyPhieu";
import PopupDuyetBo from "./PopupDuyetBo";
import PopupTuChoiPhongKHDT from "./PopupTuChoiPhongKHDT";
import PopupPhanCongPhongCM from "./PopupPhanCongPhongCM";
import { APP_ROUTES } from "../../../../constants/routers";
import { MdDoorBack } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdScience } from "react-icons/md";

const ChiTietPhieuDKyDVKN = () => {
  const NameID = useLocation().pathname.split("/")[3];
  const [isTag, setIsTag] = useState(1);
  const userName = "Phòng Kế Hoạch và Đầu Tư"; // "Phòng Kế Hoạch và Đầu Tư" || "Ban lãnh đạo"
  const statusPhieuDKyDVKN = "Chờ BLĐ xét duyệt"; // "Chờ tiếp nhận xử lý" || "Chờ BLĐ xét duyệt"

  const [openPopupHuyPhieu, setOpenPopupHuyPhieu] = useState(false);
  const [openPopupDuyetBo, setOpenPopupDuyetBo] = useState(false);
  const [openPopupTuChoiPhongKHDT, setOpenPopupTuChoiPhongKHDT] =
    useState(false);
  const [openPopupPhanCongPhongCM, setOpenPopupPhanCongPhongCM] =
    useState(false);
  const navigate = useNavigate();

  const handleClickOpenPopupHuyPhieu = () => {
    setOpenPopupHuyPhieu(true);
  };

  const handleClickOpenPopupDuyetBo = () => {
    setOpenPopupDuyetBo(true);
  };

  const handleClickOpenPopupTuChoiPhongKHDT = () => {
    setOpenPopupTuChoiPhongKHDT(true);
  };

  const handleClickOpenPopupPhanCongPhongCM = () => {
    setOpenPopupPhanCongPhongCM(true);
  };

  const handleClosePopupDuyetBo = () => {
    setOpenPopupDuyetBo(false);
  };

  const handleClosePopupHuyPhieu = () => {
    setOpenPopupHuyPhieu(false);
  };

  const handleClosePopupTuChoiPhongKHDT = () => {
    setOpenPopupTuChoiPhongKHDT(false);
  };

  const handleClosePopupPhanCongPhongCM = () => {
    setOpenPopupPhanCongPhongCM(false);
  };

  const handleShowByUserName = () => {
    switch (userName as string) {
      case "Phòng Kế Hoạch và Đầu Tư": {
        switch (statusPhieuDKyDVKN as string) {
          case "Chờ tiếp nhận xử lý":
            return (
              <div className="pt-6 flex justify-between items-center">
                <Box className="flex items-center gap-2 sm:gap-4">
                  <button
                    className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
                    onClick={() =>
                      navigate(
                        APP_ROUTES.TUNA_ADMIN
                          .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                      )
                    }
                  >
                    <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
                  </button>
                  <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-gray-700">
                    Số ĐKPT:{NameID}
                  </h1>
                </Box>
                <div className="flex gap-4">
                  <button
                    onClick={handleClickOpenPopupHuyPhieu}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-yellow-400 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-yellow-500 cursor-pointer"
                  >
                    Từ chối tiếp nhận
                  </button>
                  <button
                    onClick={handleClickOpenPopupDuyetBo}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-blue-500 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-blue-600 cursor-pointer"
                  >
                    Duyệt sơ bộ
                  </button>
                </div>
              </div>
            );
          case "Chờ BLĐ xét duyệt":
            return (
              <div className="pt-6 flex justify-between items-center">
                <Box className="flex items-center gap-2 sm:gap-4">
                  <button
                    className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
                    onClick={() =>
                      navigate(
                        APP_ROUTES.TUNA_ADMIN
                          .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                      )
                    }
                  >
                    <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
                  </button>
                  <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-gray-700">
                    Số ĐKPT: {NameID}
                  </h1>
                </Box>
                <div className="flex gap-4">
                  <button
                    onClick={handleClickOpenPopupPhanCongPhongCM}
                    className="px-6 py-3 text-base/4 font-medium bg-teal-600 text-white hover:bg-teal-700 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
                  >
                    Phân Công Phòng Chuyên Môn
                  </button>
                </div>
              </div>
            );
          default:
            return (
              <div className="pt-6 flex justify-between items-center">
                <div>
                  <p className="text-2xl/6 font-bold text-gray-800">{NameID}</p>
                </div>
              </div>
            );
        }
      }
      case "Ban lãnh đạo": {
        switch (statusPhieuDKyDVKN as string) {
          case "Chờ BLĐ xét duyệt":
            return (
              <div className="pt-6 flex justify-between items-center">
                <div>
                  <p className="text-2xl/6 font-bold text-gray-800">{NameID}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleClickOpenPopupTuChoiPhongKHDT}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-green-400 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-green-500 cursor-pointer"
                  >
                    Thông báo từ chối
                  </button>
                  <button
                    onClick={handleClickOpenPopupHuyPhieu}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-yellow-400 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-yellow-500 cursor-pointer"
                  >
                    Từ chối tiếp nhận
                  </button>
                  <button
                    onClick={handleClickOpenPopupDuyetBo}
                    className="px-6 py-3 text-base/4 font-medium text-white bg-blue-500 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-blue-600 cursor-pointer"
                  >
                    Phê duyệt
                  </button>
                </div>
              </div>
            );
          default:
            return (
              <div className="pt-6 flex justify-between items-center">
                <div>
                  <p className="text-2xl/6 font-bold text-gray-800">{NameID}</p>
                </div>
              </div>
            );
        }
      }
    }
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
              <p className="text-base/6 sm:text-xl/6 text-gray-700 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />{" "}
                Thông Tin Chung
              </p>
            </div>

            <div
              className="flex items-center justify-center py-2 border border-solid border-gray-300 rounded-[8px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-100 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />{" "}
                Mẫu
              </p>
            </div>
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 font-bold flex gap-2 items-center leading-6">
                <MdScience className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-orange-300" />
                Phụ Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
      }
      case 3: {
        return (
          <div className="px-1 py-1 bg-[#e9ecf1] flex gap-4 justify-between rounded-[8px] ">
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />{" "}
                Thông Tin Chung
              </p>
            </div>
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />{" "}
                Mẫu
              </p>
            </div>

            <div
              className="flex items-center justify-center py-2 border border-solid border-gray-300 rounded-[8px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-100 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 font-bold flex gap-2 items-center leading-6">
                <MdScience className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-orange-300" />
                Phụ Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
      }
      default: {
        return (
          <div className="px-1 py-1 bg-[#e9ecf1] flex gap-4 justify-between rounded-[8px] ">
            <div
              className="flex items-center justify-center py-2 border border-solid border-gray-300 rounded-[8px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-100 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 font-bold flex gap-2 items-center leading-6">
                <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />
                Thông Tin Chung
              </p>
            </div>
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />{" "}
                Mẫu
              </p>
            </div>
            <div
              className="flex items-center justify-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 group-hover:text-blue-500 font-bold flex gap-2 items-center leading-6">
                <MdScience className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-orange-300" />{" "}
                Phụ Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
      }
    }
  };

  const handleShowByTag = () => {
    switch (isTag) {
      case 2: {
        return <DetailMaus />;
      }
      case 3: {
        return <DetailPLHCs />;
      }
      default: {
        return (
          <motion.div
            key="form-signup-thongtinchung"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-gray-300 rounded-xl"
          >
            <Box className="p-5 grid grid-cols-12 gap-1 md:gap-[0px_24px]">
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Người gửi mẫu"
                  className="h-[42px]"
                  name="NguoiGuiMau"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  // value={dataPhieu.nguoiGuiMau}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Đơn vị gửi mẫu"
                  className="h-[42px]"
                  name="DonViGuiMau"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  // value={dataPhieu.donViGuiMau}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Email"
                  name="Email"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  // value={dataPhieu.email}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Số điện thoại"
                  className="h-[42px]"
                  name="SoDienThoai"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  // value={dataPhieu.soDienThoai}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Hình thức gửi mẫu"
                  name="HinhThucGuiMau"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  // value={dataPhieu.hinhThucGuiMau}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Hình thức trả kết quả"
                  name="HinhThucTraKQ"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  // value={dataPhieu.hinhThucTraKq}
                />
              </Box>
              {/* {dataPhieu.diaChiGiaoMau && (
                <Box className="col-span-12">
                  <Inputs
                    title="Địa chỉ giao mẫu"
                    name="DiaChiGiaoMau"
                    className="h-[42px]"
                    sx={{
                      input: {
                        padding: "9.5px 14px",
                      },
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "black !important",
                      },
                    }}
                    disabled
                    value={dataPhieu.diaChiGiaoMau}
                  />
                </Box>
              )} */}
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Ngày giao mẫu"
                  name="NgayGiaoMau"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  // value={dataPhieu.ngayGiaoMau.split("T")[0]}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Địa chỉ liên hệ"
                  name="DiaChiLienHe"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  // value={dataPhieu.diaChiLienHe}
                />
              </Box>
              <Box className="col-span-12 md:col-span-6 lg:col-span-4">
                <Inputs
                  title="Kết quả"
                  name="ketQuaTiengAnh"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                    "& .Mui-disabled": {
                      WebkitTextFillColor: "black !important",
                    },
                  }}
                  disabled
                  // value={dataPhieu.ketQuaTiengAnh ? "Tiếng Anh" : "Tiếng Việt"}
                />
              </Box>
            </Box>
          </motion.div>
        );
      }
    }
  };

  return (
    <motion.div
      key="QuanLyPhieuDKyDVHN"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 grid gap-4"
    >
      {handleShowByUserName()}
      <hr className="text-gray-300" />
      <div className="grid gap-2">
        {handleTag()}
        {handleShowByTag()}
      </div>
      <PopupHuyPhieu
        open={openPopupHuyPhieu}
        handleClose={handleClosePopupHuyPhieu}
      />
      <PopupDuyetBo
        open={openPopupDuyetBo}
        handleClose={handleClosePopupDuyetBo}
      />
      <PopupTuChoiPhongKHDT
        open={openPopupTuChoiPhongKHDT}
        handleClose={handleClosePopupTuChoiPhongKHDT}
      />
      <PopupPhanCongPhongCM
        open={openPopupPhanCongPhongCM}
        handleClose={handleClosePopupPhanCongPhongCM}
      />
    </motion.div>
  );
};

export default ChiTietPhieuDKyDVKN;
