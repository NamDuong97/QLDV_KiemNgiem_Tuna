import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useState } from "react";
import { useLocation } from "react-router";
import { Inputs } from "../../../../components/Inputs";
import DetailMaus from "./Detail-Maus";
import DetailPLHCs from "./Detail-PLHC";
import PopupHuyPhieu from "./PopupHuyPhieu";
import PopupDuyetBo from "./PopupDuyetBo";
import PopupTuChoiPhongKHDT from "./PopupTuChoiPhongKHDT";
import PopupPhanCongPhongCM from "./PopupPhanCongPhongCM";

const ChiTietPhieuDKyDVKN = () => {
  const NameID = useLocation().pathname.split("/")[3];
  const [isTag, setIsTag] = useState(1);
  const userName = "Phòng Kế Hoạch và Đầu Tư"; // "Phòng Kế Hoạch và Đầu Tư" || "Ban lãnh đạo"
  const statusPhieuDKyDVKN = "Chờ BLĐ xét duyệt"; // "Chờ tiếp nhận xử lý" || "Chờ BLĐ xét duyệt"

  const HinhThucTraKQ = "Bưu điện";
  const [openPopupHuyPhieu, setOpenPopupHuyPhieu] = useState(false);
  const [openPopupDuyetBo, setOpenPopupDuyetBo] = useState(false);
  const [openPopupTuChoiPhongKHDT, setOpenPopupTuChoiPhongKHDT] =
    useState(false);
  const [openPopupPhanCongPhongCM, setOpenPopupPhanCongPhongCM] =
    useState(false);

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
                <div>
                  <p className="text-2xl/6 font-bold text-gray-800">{NameID}</p>
                </div>
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
                <div>
                  <p className="text-2xl/6 font-bold text-gray-800">{NameID}</p>
                </div>
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
      case "Ban lãnh đạo": {
        return (
          <div className="pt-6 flex justify-between">
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
      }
    }
  };

  const handleTag = () => {
    switch (isTag) {
      case 2: {
        return (
          <div className="px-3 py-2 bg-[#D1D5DC] flex gap-4 justify-between rounded-[8px] border border-solid border-[#999999]">
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className=" text-gray-600 group-hover:text-white group-hover:transition-all group-hover:ease-in-out group-hover:duration-200 text-xl/6 font-bold">
                Thông tin Chung
              </p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] bg-blue-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all ease-in-out duration-200 w-full cursor-pointer hover:bg-blue-500 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-white text-xl/6 font-bold">Mẫu</p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-gray-600 group-hover:text-white group-hover:transition-all group-hover:ease-in-out group-hover:duration-200 text-xl/6 font-bold">
                Phù Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
      }
      case 3: {
        return (
          <div className="px-3 py-2 bg-[#D1D5DC] flex gap-4 justify-between rounded-[8px] border border-solid border-[#999999]">
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] group hover:bg-blue-600 w-full cursor-pointer hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className="text-gray-600 group-hover:text-white group-hover:transition-all group-hover:ease-in-out group-hover:duration-200 text-xl/6 font-bold">
                Thông tin Chung
              </p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-gray-600 group-hover:text-white group-hover:transition-all group-hover:ease-in-out group-hover:duration-200 text-xl/6 font-bold">
                Mẫu
              </p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer bg-blue-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all ease-in-out duration-200 hover:bg-blue-500 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className=" text-white  text-xl/6 font-bold">
                Phù Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
      }
      default: {
        return (
          <div className="px-3 py-2 bg-[#D1D5DC] flex gap-4 justify-between rounded-[8px] border border-solid border-[#999999]">
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] bg-blue-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer transition-all ease-in-out duration-200 hover:bg-blue-500 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(1)}
            >
              <p className="text-white text-xl/6 font-bold">Thông tin Chung</p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(2)}
            >
              <p className="text-gray-600 group-hover:text-white group-hover:transition-all group-hover:ease-in-out group-hover:duration-200 text-xl/6 font-bold">
                Mẫu
              </p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-gray-600 group-hover:text-white group-hover:transition-all group-hover:ease-in-out group-hover:duration-200 text-xl/6 font-bold">
                Phù Liệu Hóa Chất
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
            key="tag1"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 grid grid-cols-12 gap-1 md:gap-[0px_24px] border border-solid border-gray-300 rounded-[10px]"
          >
            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Người gửi mẫu"
                className="h-[42px]"
                name="NguoiGuiMau"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                }}
                disabled
              />
            </Box>
            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Đơn vị gửi mẫu"
                className="h-[42px]"
                name="DonViGuiMau"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                }}
                disabled
              />
            </Box>

            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Email"
                type="email"
                name="Email"
                className="h-[42px]"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                }}
                disabled
              />
            </Box>
            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Số Điện Thoại"
                className="h-[42px]"
                name="SoDienThoai"
                disabled
              />
            </Box>

            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Hình thức gửi mẫu"
                className="h-[42px]"
                name="HinhThucGuiMau"
                disabled
              />
            </Box>
            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Hình thức trả kết quả"
                className="h-[42px]"
                name="HinhThucTraKQ"
                disabled
              />
            </Box>

            {HinhThucTraKQ === "Bưu điện" && (
              <Box className="col-span-6">
                <Inputs
                  title="Địa chỉ giao mẫu"
                  name="DiaChiGiaoMau"
                  className="h-[42px]"
                  sx={{
                    input: {
                      padding: "9.5px 14px",
                    },
                  }}
                  disabled
                />
              </Box>
            )}

            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Ngày giao mẫu"
                name="NgayGiaoMau"
                className="h-[42px]"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                }}
                disabled
              />
            </Box>
            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Địa chỉ liên hệ"
                name="DiaChiLienHe"
                className="h-[42px]"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                }}
                disabled
              />
            </Box>

            <Box className="col-span-6 gap-2 grid">
              <Inputs
                title="Kết Quả"
                name="KetQua"
                className="h-[42px]"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                }}
                disabled
              />
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
      className="p-6 grid gap-6"
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
