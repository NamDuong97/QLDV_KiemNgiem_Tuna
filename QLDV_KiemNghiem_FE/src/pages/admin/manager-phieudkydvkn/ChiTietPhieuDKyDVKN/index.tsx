import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useState } from "react";
import { useLocation } from "react-router";
import { Inputs } from "../../../../components/Inputs";

const ChiTietPhieuDKyDVKN = () => {
  const NameID = useLocation().pathname.split("/")[3];
  const [isTag, setIsTag] = useState(1);

  const userName = "Phòng Kế Hoạch và Đầu Tư";

  const HinhThucTraKQ = "Bưu điện";

  const handleShowByUserName = () => {
    switch (userName) {
      case "Phòng Kế Hoạch và Đầu Tư": {
        return (
          <div className="pt-6 flex justify-between">
            <div>
              <p className="text-2xl/6 font-bold text-gray-800">{NameID}</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 text-base/4 font-medium text-white bg-yellow-400 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-yellow-500 cursor-pointer">
                Từ chối tiếp nhận
              </button>
              <button className="px-6 py-3 text-base/4 font-medium text-white bg-blue-500 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-blue-600 cursor-pointer">
                Duyệt sơ bộ
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
              <p className="text-white text-xl/6 font-bold">Danh sách Mẫu</p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-gray-600 group-hover:text-white group-hover:transition-all group-hover:ease-in-out group-hover:duration-200 text-xl/6 font-bold">
                Danh sách Phù Liệu Hóa Chất
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
                Danh sách Mẫu
              </p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer bg-blue-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all ease-in-out duration-200 hover:bg-blue-500 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className=" text-white  text-xl/6 font-bold">
                Danh sách Phù Liệu Hóa Chất
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
                Danh sách Mẫu
              </p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600 hover:transition-all hover:ease-in-out hover:duration-200"
              onClick={() => setIsTag(3)}
            >
              <p className="text-gray-600 group-hover:text-white group-hover:transition-all group-hover:ease-in-out group-hover:duration-200 text-xl/6 font-bold">
                Danh sách Phù Liệu Hóa Chất
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
        return (
          <div className="px-3 py-2 bg-[#D1D5DC] flex gap-4 justify-between rounded-[8px] border border-solid border-[#999999]">
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600"
              onClick={() => setIsTag(1)}
            >
              <p className=" text-gray-600 group-hover:text-white text-xl/6 font-bold">
                Thông tin Chung
              </p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] bg-blue-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full cursor-pointer"
              onClick={() => setIsTag(2)}
            >
              <p className="text-white text-xl/6 font-bold">Danh sách Mẫu</p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600"
              onClick={() => setIsTag(3)}
            >
              <p className="text-gray-600 group-hover:text-white text-xl/6 font-bold">
                Danh sách Phù Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
      }
      case 3: {
        return (
          <div className="px-3 py-2 bg-[#D1D5DC] flex gap-4 justify-between rounded-[8px] border border-solid border-[#999999]">
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] group hover:bg-blue-600  w-full cursor-pointer"
              onClick={() => setIsTag(1)}
            >
              <p className="text-gray-600 group-hover:text-white text-xl/6 font-bold">
                Thông tin Chung
              </p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer group hover:bg-blue-600"
              onClick={() => setIsTag(2)}
            >
              <p className="text-gray-600 group-hover:text-white text-xl/6 font-bold">
                Danh sách Mẫu
              </p>
            </div>
            <div
              className="text-center py-2 border border-solid border-white rounded-[8px] w-full cursor-pointer bg-blue-600 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              onClick={() => setIsTag(3)}
            >
              <p className=" text-white  text-xl/6 font-bold">
                Danh sách Phù Liệu Hóa Chất
              </p>
            </div>
          </div>
        );
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
              />
            </Box>
            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Số Điện Thoại"
                type="number"
                className="h-[42px]"
                name="SoDienThoai"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                  'input[type="number"]': {
                    MozAppearance: "textfield",
                  },
                  'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                }}
              />
            </Box>

            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Hình thức gửi mẫu"
                className="h-[42px]"
                name="HinhThucGuiMau"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                  'input[type="number"]': {
                    MozAppearance: "textfield",
                  },
                  'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                }}
              />
            </Box>
            <Box className="col-span-12 md:col-span-6">
              <Inputs
                title="Hình thức trả kết quả"
                className="h-[42px]"
                name="HinhThucTraKQ"
                sx={{
                  input: {
                    padding: "9.5px 14px",
                  },
                  'input[type="number"]': {
                    MozAppearance: "textfield",
                  },
                  'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                }}
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
    </motion.div>
  );
};

export default ChiTietPhieuDKyDVKN;
