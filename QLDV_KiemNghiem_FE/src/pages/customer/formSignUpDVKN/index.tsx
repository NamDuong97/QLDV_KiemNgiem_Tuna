import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import PopupNofitication from "./components/PopupNofitication";
import Maus from "./components/Maus";
import PhuLieuHoaChat from "./components/PhuLieuHoaChat";
// import { useNavigate } from "react-router";
import { MdDoorBack } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { Inputs } from "../../../components/Inputs";
import InputSelect from "../../../components/InputSelect";
import { FormPhieuDangKy } from "../../../models/PhieuDangKy";
import yup from "../../../configs/yup.custom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdAccountBox } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { MdScience } from "react-icons/md";
import { useCreatePhieuDKyDVKN } from "../../../hooks/customers/usePhieuDKyDVKN";
import PopupThoatForm from "./components/PopupThoatForm";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";

const dataHinhThucGuiTra = [
  { value: "Trực tiếp", label: "Trực tiếp" },
  { value: "Bưu điện", label: "Bưu điện" },
];

const dataKhachHang = {
  tenKH: "Công ty ABC",
  tenNguoiDaiDien: "Nguyễn Nguyễn",
  email: "abc@gmail.com",
  soDienThoai: "0397426194",
  diaChi: "78 ABC, phường 2, Quận Cam, TPHCM",
};

const FormSignUpDVKN = () => {
  const [openPopupNofitication, setOpenPopupNofitication] = useState(false);
  const [openPopupThoatForm, setOpenPopupThoatForm] = useState(false);

  const [isThongTinChung, setThongTinChung] = useState(true);
  const [isMaus, setIsMaus] = useState(false);
  const [isPLHCs, setIsPLHCs] = useState(false);
  const queryClient = useQueryClient();

  const dataSession = sessionStorage.getItem("PhieuDangKy");
  const [data, setData] = useState<any>(
    dataSession ? JSON.parse(dataSession) : {}
  );

  let schema = useMemo(() => {
    return yup.object().shape({
      DonViGuiMau: yup
        .string()
        .required("Yêu cầu nhập đơn vị gửi mẫu")
        .max(500, "Ký tự nhập không vượt quá 500 ký tự"),
      NguoiGuiMau: yup
        .string()
        .required("Yêu cầu nhập người gửi mẫu")
        .max(200, "Ký tự nhập không vượt quá 200 ký tự"),
      SoDienThoai: yup
        .string()
        .required("Yêu cầu nhập số điện thoại")
        .test(
          "Bắt đầu bằng số 0",
          "Số điện thoại nhập phải bắt đầu bằng số 0",
          (value) => {
            return value?.startsWith("0");
          }
        )
        .max(12, "Số điện thoại nhập phải dưới 12 ký tự")
        .min(8, "Số điện thoại nhập phải trên 8 ký tự"),
      Email: yup
        .string()
        .required("Yêu cầu nhập địa chỉ email")
        .max(50, "Ký tự nhập không vượt quá 50 ký tự"),
      DiaChiLienHe: yup.string().required("Yêu cầu nhập địa chỉ liên hệ"),
      HinhThucGuiMau: yup.string().required("Yêu cầu chọn hình thức gửi mẫu"),
      HinhThucTraKQ: yup
        .string()
        .required("Yêu cầu chọn hình thức trả kết quả"),
      DiaChiGiaoMau: yup.string().when("HinhThucTraKQ", {
        is: "Bưu điện",
        then: (schema) => schema.required("Yêu cầu nhập địa chỉ giao mẫu"),
        otherwise: (schema) => schema.notRequired().transform(() => undefined),
      }),
      NgayGiaoMau: yup.string().required("Yêu cầu chọn ngày giao mẫu"),
      KetQuaTiengAnh: yup
        .boolean()
        .transform((_, item) => (item ? true : false)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormPhieuDangKy>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const HinhThucTraKQ = useWatch({ control, name: "HinhThucTraKQ" });
  const handleClickOpenPopupNofitication = () => {
    setOpenPopupNofitication(true);
  };

  const handleClosePopupNofitication = () => {
    setOpenPopupNofitication(false);
  };

  const handleClickOpenPopupThoatForm = () => {
    setOpenPopupThoatForm(true);
  };

  const handleClosePopupThoatForm = () => {
    setOpenPopupThoatForm(false);
  };
  const handleOnSettled = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["CreatePhieuDKyDVKN"],
    });
  };
  const { mutate } = useCreatePhieuDKyDVKN({
    queryKey: "CreatePhieuDKyDVKN",
    onSettled: handleOnSettled,
  });

  const onSubmitPhieuDkyDV = (dataForm: FormPhieuDangKy) => {
    if (data.donViGuiMau !== dataForm.DonViGuiMau) {
      const dataFinal = {
        ...data,
        maId: "",
        maKh: "KH001",
        manvNhanMau: "NV001",
        nguoiNhanMau: "Nguyễn Văn A",
        donViGuiMau: dataForm.DonViGuiMau,
        nguoiGuiMau: dataForm.NguoiGuiMau,
        soDienThoai: dataForm.SoDienThoai,
        email: dataForm.Email,
        diaChiLienHe: dataForm.DiaChiLienHe,
        hinhThucGuiMau: dataForm.HinhThucGuiMau,
        hinhThucTraKq: dataForm.HinhThucTraKQ,
        diaChiGiaoMau: dataForm.DiaChiGiaoMau ? dataForm.DiaChiGiaoMau : "",
        trangThaiId: "TT01",
        ketQuaTiengAnh: dataForm.KetQuaTiengAnh ? true : false,
        ngayGiaoMau: dataForm.NgayGiaoMau,
        ngayThucHien: "2025-05-10T00:00:00",
      };
      setData(dataFinal);
      sessionStorage.setItem("PhieuDangKy", JSON.stringify(dataFinal));
    }
  };

  const handleGui = (dataForm: FormPhieuDangKy) => {
    const dataMaus: any = [];
    const dataPLHC: any = [];

    data?.Maus.map((itemMau: any) => {
      dataMaus.push({
        maId: "",
        maDmMau: itemMau.maDmMau,
        tenMau: itemMau.tenMau,
        maTieuChuan: itemMau.maTieuChuan,
        maPhieuDangKy: itemMau.maPhieuDangKy,
        manvThucHien: "NV002",
        maLoaiDV: "DV001",
        soLo: itemMau.soLo,
        donViSanXuat: itemMau.donViSanXuat,
        ngaySanXuat: itemMau.ngaySanXuat,
        hanSuDung: itemMau.hanSuDung,
        donViTinh: itemMau.donViTinh,
        soLuong: Number(itemMau.soLuong),
        yeuCauKiemNghiem: itemMau.yeuCauKiemNghiem,
        tinhTrangMau: itemMau.tinhTrangMau,
        dieuKienBaoQuan: itemMau.dieuKienBaoQuan,
        luuMau: itemMau.luuMau,
        xuatKetQua: itemMau.xuatKetQua,
        trangThaiNhanMau: itemMau.trangThaiNhanMau,
        ghiChu: itemMau.ghiChu,
        nguoiTao: itemMau.nguoiTao,
        nguoiSua: "admin",
        ngayTao: "2025-04-18T00:00:00",
        ngaySua: "2025-04-18T00:00:00",
        thoiGianTieuChuan: null,
        maPdkMau: null,
        loaiDv: itemMau.loaiDv,
        phieuDangKyMauHinhAnhs: itemMau.phieuDangKyMauHinhAnhs
          ? itemMau.phieuDangKyMauHinhAnhs.map((itemImage: any) => {
              return {
                maId: "",
                maMau: "",
                ten: itemImage.ten,
                dinhDang: itemImage.dinhDang ? itemImage.dinhDang : "",
                ghiChu: itemImage.ghiChu,
                loaiAnh: itemImage.loaiAnh,
                trangThai: true,
                nguoiTao: itemImage.nguoiTao,
                nguoiSua: null,
                ngayTao: null,
                ngaySua: null,
              };
            })
          : [],
      });
    });

    data?.PLHC.map((itemPLHC: any) =>
      dataPLHC.push({
        maId: itemPLHC.maId,
        maPhieuDangKy: itemPLHC.maPhieuDangKy,
        maPlhc: itemPLHC.maPlhc,
        tenPlhc: itemPLHC.tenPlhc,
        tenHienThi: itemPLHC.tenHienThi,
        soLuong: itemPLHC.soLuong,
        donViTinh: itemPLHC.donViTinh,
        ghiChu: itemPLHC.ghiChu,
        ngayHetHan: itemPLHC.ngayHetHan,
        tenNhaCungCap: itemPLHC.tenNhaCungCap,
        soLo: itemPLHC.soLo,
        nguoiTao: itemPLHC.nguoiTao,
        nguoiSua: itemPLHC.nguoiSua,
        ngayTao: null,
        ngaySua: null,
      })
    );

    if (isThongTinChung) {
      const dataPhieuDKY: any = {
        maId: "",
        maKh: "KH001",
        manvNhanMau: "NV001",
        nguoiNhanMau: "Nguyễn Văn A",
        donViGuiMau: dataForm.DonViGuiMau,
        nguoiGuiMau: dataForm.NguoiGuiMau,
        soDienThoai: dataForm.SoDienThoai,
        email: dataForm.Email,
        diaChiLienHe: dataForm.DiaChiLienHe,
        hinhThucGuiMau: dataForm.HinhThucGuiMau,
        hinhThucTraKq: dataForm.HinhThucTraKQ,
        diaChiGiaoMau: dataForm.DiaChiGiaoMau ? dataForm.DiaChiGiaoMau : "",
        trangThaiId: "TT01",
        ketQuaTiengAnh: dataForm.KetQuaTiengAnh ? true : false,
        ngayGiaoMau: dataForm.NgayGiaoMau,
        ngayThucHien: "2025-05-10T00:00:00",
        Maus: dataMaus,
        PhieuDangKyPhuLieuHoaChats: dataPLHC,
      };
      mutate(dataPhieuDKY);
    } else {
      const dataPhieuDKY: any = {
        maId: "",
        maKh: "KH001",
        manvNhanMau: "NV001",
        nguoiNhanMau: "Nguyễn Văn A",
        donViGuiMau: data.donViGuiMau,
        nguoiGuiMau: data.nguoiGuiMau,
        soDienThoai: data.soDienThoai,
        email: data.email,
        diaChiLienHe: data.diaChiLienHe,
        hinhThucGuiMau: data.hinhThucGuiMau,
        hinhThucTraKq: data.hinhThucTraKq,
        diaChiGiaoMau: data.diaChiGiaoMau ? data.diaChiGiaoMau : "",
        trangThaiId: "TT01",
        ketQuaTiengAnh: data.ketQuaTiengAnh ? true : false,
        ngayGiaoMau: data.ngayGiaoMau,
        ngayThucHien: "2025-05-10T00:00:00",
        Maus: dataMaus,
        PhieuDangKyPhuLieuHoaChats: dataPLHC,
      };
      mutate(dataPhieuDKY);
    }

    sessionStorage.removeItem("PhieuDangKy");
    handleClickOpenPopupNofitication();
  };

  useEffect(() => {
    const defaultFormValues = {
      DonViGuiMau: "",
      NguoiGuiMau: "",
      SoDienThoai: "",
      Email: "",
      DiaChiLienHe: "",
      HinhThucGuiMau: "",
      HinhThucTraKQ: "",
      DiaChiGiaoMau: "",
      KetQuaTiengAnh: false,
      NgayGiaoMau: "",
    };
    if (data && data?.nguoiGuiMau) {
      reset({
        DonViGuiMau: data.donViGuiMau,
        NguoiGuiMau: data.nguoiGuiMau,
        SoDienThoai: data.soDienThoai,
        Email: data.email,
        DiaChiLienHe: data.diaChiLienHe,
        HinhThucGuiMau: data.hinhThucGuiMau,
        HinhThucTraKQ: data.hinhThucTraKq,
        DiaChiGiaoMau: data.diaChiGiaoMau,
        KetQuaTiengAnh: data.ketQuaTiengAnh,
        NgayGiaoMau: data.ngayGiaoMau,
      });
    } else if (dataKhachHang) {
      reset({
        ...defaultFormValues,
        NguoiGuiMau: dataKhachHang.tenNguoiDaiDien,
        DonViGuiMau: dataKhachHang.tenKH,
        SoDienThoai: dataKhachHang.soDienThoai,
        Email: dataKhachHang.email,
        DiaChiLienHe: dataKhachHang.diaChi,
      });
    } else {
      reset(defaultFormValues);
    }
  }, [reset, dataKhachHang, data]);

  return (
    <Box>
      <motion.div
        key="FormSignUpDVKN"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid gap-4 px-6 py-6 sm:py-8">
          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-2 sm:gap-4">
              <button
                className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
                onClick={handleClickOpenPopupThoatForm}
              >
                <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
              </button>
              <h1 className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-gray-700">
                Đăng Ký Dịch Vụ Kiểm Nghiệm
              </h1>
            </Box>
            <button
              type="button"
              onClick={handleSubmit(handleGui)}
              disabled={
                data?.donViGuiMau &&
                data?.Maus?.length >= 1 &&
                data?.PLHC?.length >= 1
                  ? false
                  : true
              }
              className={clsx(
                "hidden px-4 py-[5px] sm:px-6 sm:py-2 sm:flex items-center text-white  border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
                data?.donViGuiMau &&
                  data?.Maus?.length >= 1 &&
                  data?.PLHC?.length >= 1
                  ? "cursor-pointer bg-indigo-600 hover:bg-indigo-700"
                  : "cursor-no-drop bg-indigo-400"
              )}
            >
              <span className="text-[10px] sm:text-lg/6 font-bold text-amber-50">
                Gửi
              </span>
            </button>
          </Box>
          <hr className="text-gray-300" />
          <Box className="overflow-x-auto whitespace-nowrap grid gap-6">
            <Box>
              <button
                onClick={() => {
                  handleSubmit(onSubmitPhieuDkyDV)();
                  setThongTinChung(!isThongTinChung);
                  setIsMaus(false);
                  setIsPLHCs(false);
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
                  <form className="p-5 grid grid-cols-12 gap-1 md:gap-[0px_24px]">
                    <Box className="col-span-12 md:col-span-6">
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
                    <Box className="col-span-12 md:col-span-6">
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
                    <Box className="col-span-12 md:col-span-6">
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
                    <Box className="col-span-12 md:col-span-6">
                      <Inputs
                        title="Số điện thoại"
                        type="number"
                        className="h-[42px]"
                        name="SoDienThoai"
                        inputRef={register("SoDienThoai")}
                        errorMessage={errors.SoDienThoai?.message}
                        placeholder="VD: 03976*****"
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
                      <InputSelect
                        title="Hình thức gửi mẫu"
                        name="HinhThucGuiMau"
                        control={control}
                        options={dataHinhThucGuiTra}
                        selectProps={{
                          isSearchable: false,
                          placeholder: "Chọn hình thức gửi mẫu",
                        }}
                        errorMessage={(errors.HinhThucGuiMau as any)?.message}
                      />
                    </Box>
                    <Box className="col-span-12 md:col-span-6">
                      <InputSelect
                        title="Hình thức trả kết quả"
                        name="HinhThucTraKQ"
                        control={control}
                        options={dataHinhThucGuiTra}
                        selectProps={{
                          isSearchable: false,
                          placeholder: "Chọn hình thức trả mẫu",
                        }}
                        errorMessage={(errors.HinhThucTraKQ as any)?.message}
                      />
                    </Box>
                    {HinhThucTraKQ === "Bưu điện" && (
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
                    )}
                    <Box className="col-span-12 md:col-span-6">
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
                    <Box className="col-span-12 md:col-span-6">
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
                    <Box className="col-span-12 md:col-span-6 gap-2 grid">
                      <p className="!font-semibold text-base/6 text-gray_80">
                        Kết quả
                      </p>
                      <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full">
                        <input
                          type="checkbox"
                          className="w-5 h-5 cursor-pointer"
                          {...register("KetQuaTiengAnh")}
                        />
                        <span className="text-base/6 font-medium">
                          Tiếng Anh
                        </span>
                      </Box>
                    </Box>
                  </form>
                </motion.div>
              )}
            </Box>
            <Box className="overflow-x-auto whitespace-nowrap">
              <button
                type="button"
                onClick={() => {
                  handleSubmit(onSubmitPhieuDkyDV)();
                  setIsMaus(!isMaus);
                  setThongTinChung(false);
                  setIsPLHCs(false);
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
              {isMaus && <Maus setData={setData} />}
              {/* {errors.Maus?.message && (
                <p className="text-red-800 text-sm mt-2">
                  {errors.Maus?.message}
                </p>
              )} */}
            </Box>
            <Box className="overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => {
                  handleSubmit(onSubmitPhieuDkyDV)();
                  setIsPLHCs(!isPLHCs);
                  setIsMaus(false);
                  setThongTinChung(false);
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
              {isPLHCs && <PhuLieuHoaChat setData={setData} />}
              {/* {errors.PLHC?.message && (
                <p className="text-red-800 text-sm mt-2">
                  {errors.PLHC?.message}
                </p>
              )} */}
            </Box>
          </Box>
          <Box className="sm:hidden">
            <button
              type="button"
              onClick={handleSubmit(onSubmitPhieuDkyDV)}
              className="px-4 py-[6px] w-full flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              <span className="text-[14px]/6 font-bold text-amber-50">Gửi</span>
            </button>
          </Box>
        </div>
      </motion.div>
      <PopupNofitication
        openPopupNofitication={openPopupNofitication}
        handleClosePopupNofitication={handleClosePopupNofitication}
      />
      <PopupThoatForm
        open={openPopupThoatForm}
        handleClose={handleClosePopupThoatForm}
      />
    </Box>
  );
};

export default FormSignUpDVKN;
