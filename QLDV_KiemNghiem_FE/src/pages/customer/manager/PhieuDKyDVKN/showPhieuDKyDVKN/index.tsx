import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useState } from "react";
import Maus from "./components/Maus";
import PhuLieuHoaChat from "./components/PhuLieuHoaChat";
import { MdDoorBack } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAccountBox } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdScience } from "react-icons/md";

import { Inputs } from "../../../../../components/Inputs";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../constants/routers";
import { image } from "../../../../../constants/image";

const ShowPhieuDKyDVKN = () => {
  const [isThongTinChung, setThongTinChung] = useState(true);
  const [isMaus, setIsMaus] = useState(false);
  const [isPLHCs, setIsPLHCs] = useState(false);
  const navigate = useNavigate();
  const dataSession = sessionStorage.getItem("xem-phieuDky");
  const dataPhieu = dataSession ? JSON.parse(dataSession) : {};

  return (
    <motion.div
      key="ShowPhieuDKyDVKN"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="grid gap-4">
        <Box className="flex items-center justify-between">
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
            <Box className="!absolute bottom-0 flex items-center gap-2 sm:gap-4 px-6 py-6">
              <button
                className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
                onClick={() =>
                  navigate(APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to)
                }
              >
                <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
              </button>
              <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white">
                Số ĐKPT: {dataPhieu?.soDkpt}
              </h1>
            </Box>{" "}
          </Box>
        </Box>
        <Box className="overflow-x-auto whitespace-nowrap grid gap-6 px-6 py-6 sm:py-8">
          <Box>
            <button
              onClick={() => {
                setThongTinChung(!isThongTinChung);
              }}
              className={`border-gray-300 ${
                isThongTinChung
                  ? "rounded-tr-[6px] rounded-tl-[6px] border-t border-l border-r bg-gray-100"
                  : "rounded-[6px] border"
              } p-2 sm:p-4 flex items-center justify-between w-full cursor-pointer hover:bg-gray-100 transition-colors`}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 font-bold flex gap-2 items-center leading-6">
                <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />{" "}
                Thông Tin Chung
              </p>
              <IoMdArrowDropdown
                className={`w-5 h-5 sm:w-7 sm:h-7 text-gray-700 ${
                  isThongTinChung && "rotate-180"
                }`}
              />
            </button>
            {isThongTinChung && (
              <motion.div
                key="form-signup-thongtinchung"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-gray-300 rounded-br-[6px] rounded-bl-[6px]"
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
                      value={dataPhieu.nguoiGuiMau}
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
                      value={dataPhieu.donViGuiMau}
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
                      value={dataPhieu.email}
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
                      value={dataPhieu.soDienThoai}
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
                      value={dataPhieu.hinhThucGuiMau}
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
                      value={dataPhieu.hinhThucTraKq}
                    />
                  </Box>
                  {dataPhieu.diaChiGiaoMau && (
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
                  )}
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
                      value={dataPhieu.ngayGiaoMau.split("T")[0]}
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
                      value={dataPhieu.diaChiLienHe}
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
                      value={
                        dataPhieu.ketQuaTiengAnh ? "Tiếng Anh" : "Tiếng Việt"
                      }
                    />
                  </Box>
                </Box>
              </motion.div>
            )}
          </Box>
          <Box className="overflow-x-auto whitespace-nowrap">
            <button
              type="button"
              onClick={() => {
                setIsMaus(!isMaus);
              }}
              className={`border-gray-300 ${
                isMaus
                  ? "rounded-tr-[6px] rounded-tl-[6px] border-t border-l border-r bg-gray-100"
                  : "rounded-[6px] border"
              } p-2 sm:p-4 flex items-center justify-between w-full cursor-pointer hover:bg-gray-100 transition-colors`}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 font-bold flex gap-2 items-center leading-6">
                <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />{" "}
                Mẫu
              </p>
              <IoMdArrowDropdown
                className={`w-5 h-5 sm:w-7 sm:h-7 text-gray-700 ${
                  isMaus && "rotate-180"
                }`}
              />
            </button>
            {isMaus && <Maus dataMau={dataPhieu.maus} />}
          </Box>
          <Box className="overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => {
                setIsPLHCs(!isPLHCs);
              }}
              className={`border-gray-300 ${
                isPLHCs
                  ? "rounded-tr-[6px] rounded-tl-[6px] border-t border-l border-r bg-gray-100"
                  : "rounded-[6px] border"
              }   p-2 sm:p-4 flex items-center justify-between w-full cursor-pointer hover:bg-gray-100 transition-colors`}
            >
              <p className="text-base/6 sm:text-xl/6 text-gray-700 font-bold flex gap-2 items-center leading-6">
                <MdScience className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-orange-300" />{" "}
                Phụ Liệu Hóa Chất
              </p>
              <IoMdArrowDropdown
                className={`w-5 h-5 sm:w-7 sm:h-7 text-gray-700 ${
                  isPLHCs && "rotate-180"
                }`}
              />
            </button>
            {isPLHCs && (
              <PhuLieuHoaChat
                dataPhuLieuHoaChat={dataPhieu.phieuDangKyPhuLieuHoaChats}
              />
            )}
          </Box>
        </Box>
      </div>
    </motion.div>
  );
};

export default ShowPhieuDKyDVKN;
