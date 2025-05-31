import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../constants/routers";
import { Inputs } from "../../../components/Inputs";
import { useEffect, useState } from "react";
import DetailMaus from "../manager-phieudkydvkn/ChiTietPhieuDKyDVKN/Detail-Maus";
import DetailPLHCs from "../manager-phieudkydvkn/ChiTietPhieuDKyDVKN/Detail-PLHC";
import { Align } from "../../../models/Table";
import TablePhieuDKDVKN from "./TablePhieuDKDVKN";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const tableHead = [
  {
    id: "SoDKPT",
    sort: false,
    label: "Số đăng ký phân tích",
    align: Align.Left,
  },
  {
    id: "NguoiGuiMau",
    sort: false,
    label: "Người gửi mẫu",
    align: Align.Center,
  },
  {
    id: "DonViGuiMau",
    sort: false,
    label: "Đơn vị gửi mẫu",
    align: Align.Center,
  },
  {
    id: "NgayGiaoMau",
    sort: false,
    label: "Ngày giao mẫu",
    align: Align.Center,
  },
  {
    id: "KetQua",
    sort: false,
    label: "Kết Quả",
    align: Align.Center,
  },
];

const tableBody = [
  {
    SoDKPT: "KD02546",
    NguoiGuiMau: "Nguyễn Văn A",
    DonViGuiMau: "Công ty ABC",
    NgayGiaoMau: "25/04/2025",
    KetQua: 1,
  },
];

const PopupThongBaoPhieuDKDVKN = (props: Props) => {
  const { open, handleClose } = props;

  const navigate = useNavigate();
  const HinhThucTraKQ = "Bưu điện";
  const [isTag, setIsTag] = useState(1);
  const [isListData, setIsListData] = useState(false);
  const data: number = 1;

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

  const handleData = () => {
    switch (isListData) {
      case false: {
        return (
          <div className="grid gap-2 px-7 pt-6 overflow-y-auto whitespace-nowrap h-[500px]">
            {handleTag()}
            {handleShowByTag()}
          </div>
        );
      }
      case true: {
        return (
          <div className="grid gap-2 px-7">
            <TablePhieuDKDVKN tableBody={tableBody} tableHead={tableHead} />
          </div>
        );
      }
    }
  };

  useEffect(() => {
    if (data > 1) {
      setIsListData(true);
    } else setIsListData(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="PopupDuyetBo"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <Box className="w-auto md:w-[1024px]">
            <Box className="py-3 text-center flex border-b border-solid border-gray-300 px-7">
              <h1 className="ml-12 font-bold text-3xl flex-1">Thông báo</h1>
              <button
                className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
                onClick={handleClose}
              >
                <IoMdClose className="w-6 h-6 text-gray-300" />
              </button>
            </Box>
            {handleData()}
            <Box className="px-7 py-6 flex justify-center gap-6">
              <button
                onClick={() => {
                  handleClose?.();
                  navigate(
                    APP_ROUTES.TUNA_ADMIN
                      .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                  );
                }}
                className={`font-bold text-center text-white bg-[#0099f8] border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-blue-500 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                  `}
              >
                Vào Trang quản lý phiếu đăng ký chưa duyệt.
              </button>
              {data === 1 && (
                <button
                  // onClick={() =>
                  //   navigate(
                  //     APP_ROUTES.TUNA_ADMIN
                  //       .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                  //   )
                  // }
                  className="font-bold text-center text-white bg-green-500 border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-32 lg:py-2 rounded-md hover:bg-green-600 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                  Duyệt sơ bộ
                </button>
              )}
            </Box>
          </Box>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupThongBaoPhieuDKDVKN;
