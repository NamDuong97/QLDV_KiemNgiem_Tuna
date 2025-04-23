import {
  Box,
  Pagination,
  PaginationItem,
  SelectChangeEvent,
} from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Inputs } from "../../../components/Inputs";
import { Align } from "../../../models/Table";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../constants/routers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Tables from "./Table";
import PopupNofitication from "./PopupNofitication";
import yup from "../../../configs/yup.custom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TablePLHC from "./Table";
import { FormPhieuDangKy } from "../../../models/PhieuDangKy";
import SelectComponent from "../../../components/Select";

interface FormSignUpDVKNProps {}

const dataHinhThucGuiTra = [{ name: "Trực tiếp" }, { name: "Bưu điện" }];

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
    id: "DuocDien",
    sort: false,
    label: "Dược Điển",
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
    DuocDien: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    DuocDien: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    DuocDien: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    DuocDien: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    DuocDien: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
];

const tableHeadTag3 = [
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

const tableBodyTag3 = [
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    DuocDien: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    DuocDien: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    DuocDien: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
  {
    TenMau: "A",
    LoaiMau: "Gap 1",
    DuocDien: "Dược Điển VN5",
    SoLo: "SKGJHF",
    KhoiLuong: "25(kg)",
  },
];

const FormSignUpDVKN = (props: FormSignUpDVKNProps) => {
  const [isTag, setIsTag] = useState<number>(1);
  const [isCheckboxAll, setIsCheckboxAll] = useState(false);
  const naginate = useNavigate();
  const [openPopupNofitication, setOpenPopupNofitication] = useState(false);

  const [selectHinhThucTraKQ, setSelectHinhThucTraKQ] = useState("");
  const handleChangeHinhThucTraKQ = (event: SelectChangeEvent) => {
    const value: string = event.target.value;
    setSelectHinhThucTraKQ(value);
  };

  const [selectHinhThucGuiMau, setSelectHinhThucGuiMau] = useState("");
  const handleChangeHinhThucGuiMau = (event: SelectChangeEvent) => {
    const value: string = event.target.value;
    setSelectHinhThucGuiMau(value);
  };

  const handleClickOpenPopupNofitication = () => {
    setOpenPopupNofitication(true);
  };

  const handleClosePopupNofitication = () => {
    setOpenPopupNofitication(false);
  };

  let schema = useMemo(() => {
    return yup
      .object()
      .shape({
        DonViGuiMau: yup.string().required("Yêu cầu nhập đơn vị gửi mẫu"),
        NguoiGuiMau: yup.string().required("Yêu cầu nhập người gửi mẫu"),
        SoDienThoai: yup
          .string()
          .required("Yêu cầu nhập số điện thoại")
          .max(12, "Số điện thoại phải nhập là 12 ký tự"),
        Email: yup.string().required("Yêu cầu nhập địa chỉ email"),
        DiaChiLienHe: yup.string().required("Yêu cầu nhập địa chỉ liên hệ"),
        HinhThucGuiMau: yup.string().required("Yêu cầu chọn hình thức gửi mẫu"),
        HinhThucTraKQ: yup
          .string()
          .required("Yêu cầu chọn hình thức trả kết quả"),
        DiaChiGiaoMau: yup.string().when([], {
          is: () => selectHinhThucTraKQ === "Bưu điện",
          then: (schema) => schema.required("Yêu cầu nhập địa chỉ liên hệ"),
          otherwise: (schema) => schema.notRequired(),
        }),
        KetQuaTiengViet: yup
          .number()
          .oneOf([0, 1], "Chọn kết quả tiếng Việt hoặc không"),
        KetQuaTiengAnh: yup
          .number()
          .oneOf([0, 1], "Chọn kết quả tiếng Anh hoặc không"),
        NgayGiaoMau: yup.string().required("Yêu cầu chọn ngày giao mẫu"),
      })
      .test(
        "at-least-one-selected",
        "Vui lòng chọn ít nhất một ngôn ngữ kết quả",
        function (value) {
          const { KetQuaTiengViet, KetQuaTiengAnh } = value;
          return KetQuaTiengViet === 1 || KetQuaTiengAnh === 1;
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormPhieuDangKy>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormPhieuDangKy) => {
    // const form = new FormData();
    // form.append("email", data.email)
    // form.append("password", data.password)
    // if (data.email === "admin123@gmail.com" && data.password === "123")
    //   router(APP_ROUTES.TUNA_ADMIN.DASHBOARD.to);
    // else {
    //   setIsError(true);
    //   setTimeout(() => {
    //     setIsError(false);
    //   }, 5000);
    // }
  };

  const handleSwitchTagTitle = () => {
    switch (isTag) {
      case 2:
        return (
          <AnimatePresence mode="wait" key="tag2">
            <motion.hr
              initial={{ color: "#d1d5dc" }}
              animate={{ color: "#2b7fff" }}
              exit={{ color: "#4a5565" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-52 border-[1px] rounded-lg hidden md:block"
            />
            <Box
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsTag(2)}
            >
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
            <hr className="text-gray-300 w-52 border-[1px] rounded-lg hidden md:block" />
            <Box
              className="items-center gap-3 hidden md:flex cursor-pointer"
              onClick={() => setIsTag(3)}
            >
              <p className="p-2 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xl/6">3</span>
              </p>
              <p className="text-gray-600 text-xl/6">
                Danh sách Phụ Liệu Hóa Chất
              </p>
            </Box>
          </AnimatePresence>
        );
      case 3:
        return (
          <AnimatePresence mode="wait" key="tag2">
            <motion.hr
              initial={{ color: "#d1d5dc" }}
              animate={{ color: "#2b7fff" }}
              exit={{ color: "#4a5565" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-52 border-[1px] rounded-lg hidden md:block"
            />
            <Box
              className="items-center gap-3 cursor-pointer hidden md:flex"
              onClick={() => setIsTag(2)}
            >
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
            <motion.hr
              initial={{ color: "#d1d5dc" }}
              animate={{ color: "#2b7fff" }}
              exit={{ color: "#4a5565" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-52 border-[1px] rounded-lg hidden md:block"
            />
            <Box
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsTag(3)}
            >
              <motion.p
                initial={{ backgroundColor: "#99a1af" }}
                animate={{ backgroundColor: "#2b7fff" }}
                exit={{ backgroundColor: "#99a1af" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="p-2 w-9 h-9 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xl/6">3</span>
              </motion.p>
              <motion.p
                initial={{ color: "#4a5565" }}
                animate={{ color: "#2b7fff" }}
                exit={{ color: "#4a5565" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="text-xl/6"
              >
                Danh sách Phụ Liệu Hóa Chất
              </motion.p>
            </Box>
          </AnimatePresence>
        );
      default:
        return (
          <>
            <hr className="text-gray-300 w-52 border-[1px] rounded-lg hidden md:block" />
            <Box
              className="items-center gap-3 hidden md:flex cursor-pointer"
              onClick={() => setIsTag(2)}
            >
              <p className="p-2 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xl/6">2</span>
              </p>
              <p className="text-gray-600 text-xl/6">Danh sách mẫu</p>
            </Box>
            <hr className="text-gray-300 w-52 border-[1px] rounded-lg hidden md:block" />
            <Box
              className="items-center gap-3 hidden md:flex cursor-pointer"
              onClick={() => setIsTag(3)}
            >
              <p className="p-2 w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xl/6">3</span>
              </p>
              <p className="text-gray-600 text-xl/6">
                Danh sách Phụ Liệu Hóa Chất
              </p>
            </Box>
          </>
        );
    }
  };

  const handleSwitchTagItem = () => {
    switch (isTag) {
      case 1:
        return (
          <AnimatePresence mode="wait" key="tag1">
            <motion.div
              key="tag1"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box className="px-12 py-7 grid grid-cols-1 gap-1">
                <Box className="col-span-1 grid grid-cols-12 gap-1 2xl:gap-6">
                  <Box className="col-span-12 2xl:col-span-6">
                    <Inputs
                      title="Người gửi mẫu"
                      className="h-[42px]"
                      name="NguoiGuiMau"
                      inputRef={register("NguoiGuiMau")}
                      errorMessage={errors.NguoiGuiMau?.message}
                      placeholder="VD: Nguyễn Văn A"
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
                      name="DonViGuiMau"
                      inputRef={register("DonViGuiMau")}
                      errorMessage={errors.DonViGuiMau?.message}
                      placeholder="VD: Công ty TNHH ABC"
                      sx={{
                        input: {
                          padding: "9.5px 14px",
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box className="col-span-1 grid grid-cols-12 2xl:gap-6">
                  <Box className="col-span-12 2xl:col-span-6">
                    <Inputs
                      title="Email"
                      type="email"
                      name="Email"
                      inputRef={register("Email")}
                      errorMessage={errors.Email?.message}
                      placeholder="VD: abc@gmail.com"
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
                      name="SoDienThoai"
                      inputRef={register("SoDienThoai")}
                      errorMessage={errors.SoDienThoai?.message}
                      placeholder="VD: 03976*****"
                      sx={{
                        input: {
                          padding: "9.5px 14px",
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box className="col-span-1 grid grid-cols-12 2xl:gap-6">
                  <Box className="col-span-12 2xl:col-span-6">
                    <SelectComponent
                      title="Hình thức gửi mẫu"
                      data={dataHinhThucGuiTra}
                      dataDefault="Vui Lòng chọn hình thức gửi mẫu"
                      select={selectHinhThucGuiMau}
                      errors={errors.HinhThucGuiMau?.message}
                      handleChange={handleChangeHinhThucGuiMau}
                    />
                  </Box>
                  <Box className="col-span-12 2xl:col-span-6">
                    <SelectComponent
                      title="Hình thức trả kết quả"
                      data={dataHinhThucGuiTra}
                      dataDefault="Vui Lòng chọn hình thức trả kết quả"
                      select={selectHinhThucTraKQ}
                      errors={errors.HinhThucTraKQ?.message}
                      handleChange={handleChangeHinhThucTraKQ}
                    />
                  </Box>
                </Box>

                {selectHinhThucTraKQ === "Bưu điện" && (
                  <Box className="col-span-1 grid grid-cols-12 2xl:gap-6">
                    <Box className="col-span-12">
                      <Inputs
                        title="Địa chỉ giao mẫu"
                        name="DiaChiGiaoMau"
                        inputRef={register("DiaChiGiaoMau")}
                        errorMessage={errors.DiaChiGiaoMau?.message}
                        placeholder="VD: 607 Cao Sơn,...."
                        className="h-[42px]"
                        sx={{
                          input: {
                            padding: "9.5px 14px",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                )}

                <Box className="col-span-1 grid grid-cols-12 2xl:gap-6">
                  <Box className="col-span-12 2xl:col-span-6">
                    <Inputs
                      title="Ngày giao mẫu"
                      type="date"
                      name="NgayGiaoMau"
                      inputRef={register("NgayGiaoMau")}
                      errorMessage={errors.NgayGiaoMau?.message}
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
                      title="Địa chỉ liên hệ"
                      name="DiaChiLienHe"
                      inputRef={register("DiaChiLienHe")}
                      errorMessage={errors.DiaChiLienHe?.message}
                      placeholder="VD: 607 Cao Sơn,...."
                      className="h-[42px]"
                      sx={{
                        input: {
                          padding: "9.5px 14px",
                        },
                      }}
                    />
                  </Box>
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
                      <span className="text-base/6 font-medium">Tiếng Anh</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        );
      case 2:
        return (
          <AnimatePresence mode="wait" key="tag2">
            <motion.div
              key="tag2"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
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
        );
      case 3:
        return (
          <AnimatePresence mode="wait" key="tag3">
            <motion.div
              key="tag3"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box className="px-4 py-2">
                <TablePLHC
                  tableHead={tableHeadTag3}
                  setIsCheckboxAll={() => setIsCheckboxAll(!isCheckboxAll)}
                  isCheckboxAll={isCheckboxAll}
                  tableBody={tableBodyTag3}
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
        );
    }
  };

  const handleSwitchTagButton = () => {
    switch (isTag) {
      case 1:
        return (
          <Box
            className={`border-t border-solid border-gray-300 py-4 px-4 sm:px-12 flex justify-between`}
          >
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
                  onClick={() => setIsTag(isTag + 1)}
                >
                  <span className="text-lg/6 font-bold text-amber-50">
                    Tiếp
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </Box>
        );
      case 2:
        return (
          <Box
            className={`border-t border-solid border-gray-300 py-4 px-4 sm:px-12 flex justify-between`}
          >
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
                  onClick={() => setIsTag(isTag - 1)}
                >
                  <span className="text-lg/6 font-bold text-amber-50">
                    Quay lại
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key="btn_next_2"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  className="bg-blue-500 px-6 py-2 rounded cursor-pointer hover:bg-blue-600 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                  onClick={() => setIsTag(isTag + 1)}
                >
                  <span className="text-lg/6 font-bold text-amber-50">
                    Tiếp
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </Box>
        );
      case 3:
        return (
          <Box
            className={`border-t border-solid border-gray-300 py-4 px-4 sm:px-12 flex justify-between`}
          >
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
                  onClick={() => setIsTag(isTag - 1)}
                >
                  <span className="text-lg/6 font-bold text-amber-50">
                    Quay lại
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
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
                  <span className="text-lg/6 font-bold text-amber-50">Gửi</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </Box>
        );
    }
  };

  useEffect(() => {
    reset({
      DonViGuiMau: "",
      NguoiGuiMau: "",
      SoDienThoai: "",
      Email: "",
      DiaChiLienHe: "",
      HinhThucGuiMau: "",
      HinhThucTraKQ: "",
      DiaChiGiaoMau: "",
      KetQuaTiengViet: 0,
      KetQuaTiengAnh: 0,
      NgayGiaoMau: "",
    });
  }, []);

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
            <Box
              className={`cursor-pointer ${isTag !== 1 && "hidden md:block"}`}
              onClick={() => setIsTag(1)}
            >
              <Box className={`flex items-center gap-3`}>
                <p className="p-2 w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xl/6">1</span>
                </p>
                <p className="text-blue-500 text-xl/6">Thông tin chung</p>
              </Box>
            </Box>

            {handleSwitchTagTitle()}
          </Box>
          <Box className="border border-solid border-gray-300 rounded-[10px]">
            {handleSwitchTagItem()}
            {handleSwitchTagButton()}
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
