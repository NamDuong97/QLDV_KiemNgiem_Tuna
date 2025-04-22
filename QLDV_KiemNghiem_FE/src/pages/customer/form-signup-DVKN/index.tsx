import { Box, Pagination, PaginationItem } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Inputs } from "../../../components/Inputs";
import { Align } from "../../../models/Table";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../constants/routers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Tables from "./Table";
import PopupNofitication from "./PopupNofitication";

interface FormSignUpDVKNProps {}

const tableHead = [
  {
    id: "TenMau",
    sort: false,
    label: "Tên Mẫu",
    align: Align.Left,
  },
  {
    id: "LoaiMau",
    sort: false,
    label: "Loại Mẫu",
    align: Align.Center,
  },
  {
    id: "TieuChuan",
    sort: false,
    label: "Tiêu Chuẩn",
    align: Align.Center,
  },
  {
    id: "Solo",
    sort: false,
    label: "Số Lô",
    align: Align.Center,
  },
  {
    id: "KhoiKuong_DVT",
    sort: false,
    label: "Khối Lượng",
    align: Align.Center,
  },
];

const tableBody = [
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    TieuChuan: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    TieuChuan: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    TieuChuan: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    TieuChuan: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    TieuChuan: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
];

const FormSignUpDVKN = (props: FormSignUpDVKNProps) => {
  const [isTag2, setIsTag2] = useState(false);
  const [isCheckboxAll, setIsCheckboxAll] = useState(false);

  const naginate = useNavigate();
  const [openPopupNofitication, setOpenPopupNofitication] = useState(false);

  const handleClickOpenPopupNofitication = () => {
    setOpenPopupNofitication(true);
  };

  const handleClosePopupNofitication = () => {
    setOpenPopupNofitication(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="form-signup-dvkm"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box className="grid gap-6 py-16 px-6">
          <Box className="flex items-center gap-6 justify-center">
            <Box className={`${isTag2 && "hidden md:block"}`}>
              <Box className={`flex items-center gap-3`}>
                <p className="p-2 w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xl/6">1</span>
                </p>
                <p className="text-blue-500 text-xl/6">Thông tin chung</p>
              </Box>
            </Box>

            {isTag2 ? (
              <AnimatePresence mode="wait">
                <motion.hr
                  initial={{ color: "#d1d5dc" }}
                  animate={{ color: "#2b7fff" }}
                  exit={{ color: "#4a5565" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="w-52 border-[1px] rounded-lg hidden md:block"
                />
                <Box className="flex items-center gap-3">
                  <motion.p
                    initial={{ backgroundColor: "#99a1af" }}
                    animate={{ backgroundColor: "#2b7fff" }}
                    exit={{ backgroundColor: "#99a1af" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="p-2 w-9 h-9 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xl/6">2</span>
                  </motion.p>
                  <motion.p
                    initial={{ color: "#4a5565" }}
                    animate={{ color: "#2b7fff" }}
                    exit={{ color: "#4a5565" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="text-xl/6"
                  >
                    Danh sách mẫu
                  </motion.p>
                </Box>
              </AnimatePresence>
            ) : (
              <>
                <hr className="text-gray-300 w-52 border-[1px] rounded-lg hidden md:block" />
                <Box className="items-center gap-3 hidden md:flex">
                  <p className="p-2 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
                    <span className="text-white text-xl/6">2</span>
                  </p>
                  <p className="text-gray-600 text-xl/6">Danh sách mẫu</p>
                </Box>
              </>
            )}
          </Box>
          <Box className="border border-solid border-gray-300 rounded-[10px]">
            {!isTag2 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="tag1"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 10, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box className="px-12 py-7 grid grid-cols-1 gap-1">
                    <Box className="col-span-1 grid grid-cols-12 gap-1 2xl:gap-30">
                      <Box className="col-span-12 2xl:col-span-6">
                        <Inputs
                          title="Người gửi mẫu"
                          className="h-[42px]"
                          sx={{
                            input: {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      </Box>
                      <Box className="col-span-12 2xl:col-span-6">
                        <Inputs
                          title="Đơn vị gửi mẫu"
                          className="h-[42px]"
                          sx={{
                            input: {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    <Box className="col-span-1 grid grid-cols-12 2xl:gap-30">
                      <Box className="col-span-12 2xl:col-span-6">
                        <Inputs
                          title="Email"
                          type="email"
                          className="h-[42px]"
                          sx={{
                            input: {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      </Box>
                      <Box className="col-span-12 2xl:col-span-6">
                        <Inputs
                          title="Số Điện Thoại"
                          className="h-[42px]"
                          sx={{
                            input: {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    <Box className="col-span-1 grid grid-cols-12 2xl:gap-30">
                      <Box className="col-span-12 2xl:col-span-6">
                        <Inputs
                          title="Hình thức gửi mẫu"
                          className="h-[42px]"
                          sx={{
                            input: {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      </Box>
                      <Box className="col-span-12 2xl:col-span-6">
                        <Inputs
                          title="Hình thức trả kết quả"
                          className="h-[42px]"
                          sx={{
                            input: {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    <Box className="col-span-1 grid grid-cols-12 2xl:gap-30">
                      <Box className="col-span-12 2xl:col-span-6">
                        <Inputs
                          title="Ngày lập phiếu"
                          type="date"
                          className="h-[42px]"
                          sx={{
                            input: {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      </Box>
                      <Box className="col-span-12 2xl:col-span-6">
                        <Inputs
                          title="Ngày giao mẫu"
                          type="date"
                          className="h-[42px]"
                          sx={{
                            input: {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    <Box className="col-span-1">
                      <Inputs
                        title="Địa chỉ liên hệ"
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                    <Box className="col-span-1 gap-2 grid">
                      <p className="!font-semibold text-base/6 text-gray_80">
                        Kết Quả
                      </p>
                      <Box className="flex">
                        <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full">
                          <input type="checkbox" className="w-5 h-5" />
                          <span className="text-base/6 font-medium">
                            Tiếng Việt
                          </span>
                        </Box>
                        <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full">
                          <input type="checkbox" className="w-5 h-5" />
                          <span className="text-base/6 font-medium">
                            Tiếng Anh
                          </span>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key="tag2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    className={`border-b border-solid border-gray-300 py-4 px-4 sm:px-8 flex justify-end`}
                  >
                    <button
                      className="bg-gray-500 px-6 py-2 rounded cursor-pointer hover:bg-gray-400 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                      onClick={() =>
                        naginate(APP_ROUTES.TUNA_CUSTOMER.CREATE_MAU.to)
                      }
                    >
                      <span className="text-lg/6 font-bold text-white">
                        Thêm Mẫu
                      </span>
                    </button>
                  </Box>
                  <Box className="px-4 py-2">
                    <Tables
                      tableHead={tableHead}
                      setIsCheckboxAll={() => setIsCheckboxAll(!isCheckboxAll)}
                      isCheckboxAll={isCheckboxAll}
                      tableBody={tableBody}
                    />
                  </Box>
                  <Box className="px-4 py-2 flex justify-center">
                    <Pagination
                      count={5}
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                      sx={{
                        '[aria-label="Go to next page"],[aria-label="Go to previous page"]':
                          {
                            backgroundColor: "#1976d21f",
                            border: "1px solid #1976d280",
                            color: "#1976d2",
                          },
                      }}
                    />
                  </Box>
                </motion.div>
              </AnimatePresence>
            )}

            <Box
              className={`border-t border-solid border-gray-300 py-4 px-4 sm:px-12 flex justify-between`}
            >
              {isTag2 ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="btn_back"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      className="bg-amber-400 px-6 py-2 rounded cursor-pointer hover:bg-amber-500 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                      onClick={() => setIsTag2(false)}
                    >
                      <span className="text-lg/6 font-bold text-amber-50">
                        Quay lại
                      </span>
                    </button>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="btn_back"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      className="bg-amber-400 px-6 py-2 rounded cursor-pointer hover:bg-amber-500 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                      onClick={() => naginate(APP_ROUTES.TUNA_CUSTOMER.HOME.to)}
                    >
                      <span className="text-lg/6 font-bold text-amber-50">
                        Thoát
                      </span>
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
              {isTag2 ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="btn_submit"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      className="bg-blue-500 px-6 py-2 rounded cursor-pointer hover:bg-blue-600 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                      onClick={handleClickOpenPopupNofitication}
                    >
                      <span className="text-lg/6 font-bold text-amber-50">
                        Gửi
                      </span>
                    </button>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="btn_next"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      className="bg-blue-500 px-6 py-2 rounded cursor-pointer hover:bg-blue-600 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                      onClick={() => setIsTag2(true)}
                    >
                      <span className="text-lg/6 font-bold text-amber-50">
                        Tiếp
                      </span>
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </Box>
          </Box>
        </Box>
      </motion.div>
      <PopupNofitication
        openPopupNofitication={openPopupNofitication}
        handleClosePopupNofitication={handleClosePopupNofitication}
      />
    </AnimatePresence>
  );
};

export default FormSignUpDVKN;
