import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { Inputs } from "../../../components/Inputs";
import { Align } from "../../../models/Table";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../constants/routers";
import { FaVideo } from "react-icons/fa";
import { Textarea } from "../../../components/Textarea";
import SelectComponent from "../../../components/Select";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import PopupSignUpPKHC from "./PopupSignUpPK-HC";
import Tables from "./Table";

interface CreateMauProps {}

const dataLoaiMau = [
  {
    name: "Gấp 1 (G1)",
  },
  {
    name: "Gấp 2 (G2)",
  },
  {
    name: "Gấp 3 (G3)",
  },
];

const tableHead = [
  {
    id: "TenPhuLieu_HC",
    sort: false,
    label: "Tên Phụ Liệu Hóa Chất",
    align: Align.Left,
  },
  {
    id: "SoLuong",
    sort: false,
    label: "Số Lượng",
    align: Align.Center,
  },
  {
    id: "DonViTinh",
    sort: false,
    label: "Đơn Vị Tính",
    align: Align.Center,
  },
  {
    id: "LoaiPhuLieu_HC",
    sort: false,
    label: "Loại Phụ Liệu Hóa Chất",
    align: Align.Center,
  },
  {
    id: "GhiChu",
    sort: false,
    label: "Ghi Chú",
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
];

const CreateMau = (props: CreateMauProps) => {
  const [isTag2, setIsTag2] = useState(false);
  const [isCheckboxAll, setIsCheckboxAll] = useState(false);
  const naginate = useNavigate();
  const [openPopupSignUpPKHC, setOpenPopupSignUpPKHC] = useState(false);
  const [dataVideo, setDataVideo] = useState<string | undefined>(undefined);

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const videoUrl = reader.result as string;
        setDataVideo(videoUrl);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleClickOpenPopupSignUpPKHC = () => {
    setOpenPopupSignUpPKHC(true);
  };

  const handleClosePopupSignUpPKHC = () => {
    setOpenPopupSignUpPKHC(false);
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
              <Box className="flex items-center gap-3">
                <p className="p-2 w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xl/6">1</span>
                </p>
                <p className="text-blue-500 text-xl/6">
                  Thông tin mẫu gửi kiểm nghiệm
                </p>
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
                    Danh sách phụ kiện - hóa chất
                  </motion.p>
                </Box>
              </AnimatePresence>
            ) : (
              <>
                <hr className="text-gray-300 w-52 border-[1px] rounded-lg hidden md:block" />
                <Box className="hidden md:flex items-center gap-3">
                  <p className="p-2 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
                    <span className="text-white text-xl/6">2</span>
                  </p>
                  <p className="text-gray-600 text-xl/6">
                    Danh sách phụ kiện - hóa chất
                  </p>
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
                    <Box className="col-span-1 grid grid-cols-12 gap-1 2xl:gap-16">
                      <Box className="col-span-12 2xl:col-span-4 h-52 sm:h-[265px] 2xl:h-52">
                        <Box className="flex gap-2">
                          <p className="text-xl/2 font-bold mt-2 pb-4">Video</p>
                          {dataVideo && acceptedFiles[0]?.size < 5000000 && (
                            <button
                              {...getRootProps()}
                              className="flex items-start border border-solid border-gray-300 px-2 h-6 cursor-pointer rounded-sm hover:border-none hover:bg-blue-500 hover:text-white"
                            >
                              Upload Video
                            </button>
                          )}
                        </Box>
                        <input {...getInputProps()} />
                        {dataVideo && acceptedFiles[0]?.size < 5000000 ? (
                          <Box className="rounded-lg h-[150px] sm:h-52 2xl:h-[150px]">
                            <ReactPlayer
                              url={dataVideo}
                              width="100%"
                              height="100%"
                              controls={true}
                              style={{
                                borderRadius: 8,
                              }}
                              className="bg-amber-300"
                            />
                          </Box>
                        ) : (
                          <button
                            className="bg-[#D1D5DC] rounded-lg w-full sm:h-52 2xl:h-auto flex justify-center items-center py-11 cursor-pointer"
                            {...getRootProps()}
                          >
                            <FaVideo className="w-[60px] h-[60px] text-gray-500" />
                          </button>
                        )}
                        {acceptedFiles[0]?.size >= 5000000 && (
                          <Typography className="text-[#af1c10] font-medium text-xs/[140%] pt-2">
                            Kích thước file phải dưới 5Mb
                          </Typography>
                        )}
                      </Box>
                      <Box className="col-span-12 2xl:col-span-4 grid grid-cols-1">
                        <Box className="col-span-12 2xl:col-span-6">
                          <Inputs
                            title="Tên Mẫu"
                            placeholder="Nhập Tên Mẫu"
                            className="h-[42px]"
                            sx={{
                              input: {
                                padding: "9.5px 14px",
                              },
                            }}
                          />
                        </Box>
                        <Box className="col-span-12 2xl:col-span-6">
                          <SelectComponent
                            title="Loại Mẫu"
                            data={dataLoaiMau}
                            dataDefault="Vui lòng chọn Loại Mẫu"
                          />
                        </Box>
                      </Box>
                      <Box className="col-span-12 2xl:col-span-4 grid grid-cols-1">
                        <Box className="col-span-12 2xl:col-span-6">
                          <Inputs
                            title="Tiêu Chuẩn"
                            placeholder="Nhập Tiêu Chuẩn"
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
                            title="Số Lô"
                            placeholder="Nhập Số Lô"
                            className="h-[42px]"
                            sx={{
                              input: {
                                padding: "9.5px 14px",
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box className="col-span-1 grid grid-cols-12 gap-1 2xl:gap-16">
                      <Box className="col-span-12 2xl:col-span-4 grid grid-cols-1">
                        <Box className="col-span-12 2xl:col-span-6">
                          <Inputs
                            title="Đơn Vị Sản Xuất"
                            placeholder="Nhập Đơn Vị Sản Xuất"
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
                            title="Ngày Sản Xuất"
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
                      <Box className="col-span-12 2xl:col-span-4 grid grid-cols-1">
                        <Box className="col-span-12 2xl:col-span-6">
                          <Inputs
                            title="Hạn Sử Dụng"
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
                            title="Khối Lượng"
                            placeholder="Nhập Khối Lượng"
                            className="h-[42px]"
                            sx={{
                              input: {
                                padding: "9.5px 14px",
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Box className="col-span-12 2xl:col-span-4 grid grid-cols-1">
                        <Box className="col-span-12 2xl:col-span-6">
                          <Inputs
                            title="Đơn Vị Tính"
                            placeholder="Nhập Đơn Vị Tính"
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
                            title="Tình Trạng Mãu"
                            placeholder="Nhập Tình Trạng Mãu"
                            className="h-[42px]"
                            sx={{
                              input: {
                                padding: "9.5px 14px",
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box className="col-span-1 grid grid-cols-12 gap-6 2xl:gap-[24px_64px]">
                      <Box className="col-span-12 2xl:col-span-6">
                        <p className="!font-semibold text-base/6 text-gray_80 mb-2">
                          Lưu Mẫu
                        </p>
                        <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full">
                          <input type="checkbox" className="w-5 h-5" />
                          <span className="text-base/6 font-medium">
                            (Nếu có vui lòng tích chọn)
                          </span>
                        </Box>
                      </Box>
                      <Box className="col-span-12 2xl:col-span-6 gap-2">
                        <p className="!font-semibold text-base/6 text-gray_80 mb-2">
                          Xuất Kết Quả
                        </p>
                        <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full h-[42px]">
                          <input type="checkbox" className="w-5 h-5" />
                          <span className="text-base/6 font-medium">
                            (Nếu có vui lòng tích chọn)
                          </span>
                        </Box>
                      </Box>
                      <Box className="col-span-12 2xl:col-span-12">
                        <Inputs
                          title="Điều Kiện Bảo Quản"
                          placeholder="Điều Kiện Bảo Quản"
                          className="h-[42px]"
                          sx={{
                            input: {
                              padding: "9.5px 14px",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    <Box className="col-span-1 grid grid-cols-12 gap-6 2xl:gap-16 mt-6 2xl:mt-0">
                      <Box className="col-span-12 2xl:col-span-6 grid grid-cols-1">
                        <Textarea
                          title="Ghi Chú"
                          className="max-h-[149px] min-h-[149px]"
                          height="h-auto"
                        />
                      </Box>
                      <Box className="col-span-12 2xl:col-span-6 grid grid-cols-1">
                        <Textarea
                          title="Yêu Cầu Kiểm Nghiệm"
                          className="max-h-[149px] min-h-[149px]"
                          height="h-auto"
                        />
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
                      onClick={handleClickOpenPopupSignUpPKHC}
                    >
                      <span className="text-lg/6 font-bold text-white">
                        Thêm thông tin phụ kiện hóa chất
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
                </motion.div>
              </AnimatePresence>
            )}

            <Box
              className={`border-t border-solid border-gray-300 py-4 px-4 sm:px-8 flex justify-between`}
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
                    key="btn_back_page"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      className="bg-amber-400 px-6 py-2 rounded cursor-pointer hover:bg-amber-500 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                      onClick={() =>
                        naginate(APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to)
                      }
                    >
                      <span className="text-lg/6 font-bold text-amber-50">
                        Trở về
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
                      //   onClick={() => setIsTag2(true)}
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
      <PopupSignUpPKHC
        openPopupSignUpPKHC={openPopupSignUpPKHC}
        handleClosePopupSignUpPKHC={handleClosePopupSignUpPKHC}
      />
    </AnimatePresence>
  );
};

export default CreateMau;
