import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import PopupNofitication from "./components/PopupNofitication";
import Maus from "./components/Maus";
import PhuLieuHoaChat from "./components/PhuLieuHoaChat";
import { MdDoorBack } from "react-icons/md";
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
import { useQueryClient } from "@tanstack/react-query";
import { image } from "../../../constants/image";
import { StoreContext } from "../../../contexts/storeProvider";
import { v4 as uuidv4 } from "uuid";

const dataHinhThucGuiTra = [
  { value: "Trực tiếp", label: "Trực tiếp" },
  { value: "Bưu điện", label: "Bưu điện" },
];

const FormSignUpDVKN = () => {
  const [openPopupNofitication, setOpenPopupNofitication] = useState(false);
  const [openPopupThoatForm, setOpenPopupThoatForm] = useState(false);
  const { userInfo, isLogin, isLoadingAuth, setOpenLoginCustomer } =
    useContext(StoreContext);
  const [isShow, setIsShow] = useState(1);
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
  const handleOnSettled = async (response: any) => {
    console.log("response", response?.status);
    if (response?.status === 200) {
      await queryClient.invalidateQueries({
        queryKey: ["CreatePhieuDKyDVKN"],
      });
      sessionStorage.removeItem("PhieuDangKy");
    }
  };

  const { mutate } = useCreatePhieuDKyDVKN({
    queryKey: "CreatePhieuDKyDVKN",
    onSettled: handleOnSettled,
    handleClickOpenPopupNofitication: handleClickOpenPopupNofitication,
  });

  const onSubmitPhieuDkyDV = (dataForm: FormPhieuDangKy) => {
    if (data.donViGuiMau !== dataForm.DonViGuiMau) {
      const dataFinal = {
        ...data,
        maId: "",
        maKh: userInfo?.maId,
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
  const handleGui = useCallback(
    async (dataForm: FormPhieuDangKy) => {
      const id = uuidv4();
      const dataMaus: any[] = [];
      const dataPLHC: any[] = [];
      const dataAnh: any[] = [];

      // Xử lý Maus
      data?.Maus?.forEach((itemMau: any) => {
        const phieuDangKyMauHinhAnhs = (
          itemMau.phieuDangKyMauHinhAnhs || []
        ).map((itemImage: any) => {
          const hinhAnh = {
            maId: "",
            maMau: id,
            ghiChu: itemImage.ghiChu,
            image: itemImage?.image,
          };
          dataAnh.push(hinhAnh); // gom luôn hình ảnh
          return hinhAnh;
        });

        dataMaus.push({
          maId: id,
          maDmMau: itemMau.maDmMau,
          tenMau: itemMau.tenMau,
          maTieuChuan: itemMau.maTieuChuan,
          maPhieuDangKy: itemMau.maPhieuDangKy,
          manvThucHien: "NV002",
          maLoaiDV: itemMau.maLoaiDV,
          madv: "DV001",
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
          thoiGianTieuChuan: Number(itemMau.thoiGianTieuChuan),
          maPdkMau: null,
          loaiDv: itemMau.loaiDv,
          phieuDangKyMauHinhAnhs,
        });
      });

      // Xử lý PLHC
      data?.PLHC?.forEach((itemPLHC: any) => {
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
        });
      });

      // Xây dựng payload
      const commonData = {
        maId: "",
        MaKh: userInfo.maId,
        manvNhanMau: "NV001",
        NguoiGuiMau: "Nguyễn Văn A",
        trangThaiId: "TT01",
        ketQuaTiengAnh: !!(dataForm?.KetQuaTiengAnh ?? data?.ketQuaTiengAnh),
        NgayGiaoMau: dataForm?.NgayGiaoMau ?? data?.ngayGiaoMau,
        ngayThucHien: "2025-05-10T00:00:00",
        Maus: dataMaus,
        PhieuDangKyPhuLieuHoaChats: dataPLHC,
      };

      let dataPhieuDKY: any;
      if (isShow === 1) {
        dataPhieuDKY = {
          ...commonData,
          DonViGuiMau: dataForm.DonViGuiMau,
          nguoiGuiMau: dataForm.NguoiGuiMau,
          SoDienThoai: dataForm.SoDienThoai,
          Email: dataForm.Email,
          diaChiLienHe: dataForm.DiaChiLienHe,
          hinhThucGuiMau: dataForm.HinhThucGuiMau,
          hinhThucTraKq: dataForm.HinhThucTraKQ,
          diaChiGiaoMau: dataForm.DiaChiGiaoMau || "",
        };

        mutate(dataPhieuDKY);
      } else {
        dataPhieuDKY = {
          ...commonData,
          DonViGuiMau: data?.donViGuiMau,
          nguoiGuiMau: data?.nguoiGuiMau,
          SoDienThoai: data?.soDienThoai,
          Email: data?.email,
          diaChiLienHe: data?.diaChiLienHe,
          hinhThucGuiMau: data?.hinhThucGuiMau,
          hinhThucTraKq: data?.hinhThucTraKq,
          diaChiGiaoMau: data?.diaChiGiaoMau || "",
        };
        mutate(dataPhieuDKY);
      }
    },
    [userInfo, data, isShow, mutate]
  );

  const handleShow = () => {
    switch (isShow as number) {
      case 2:
        return (
          <motion.div
            key="form-mau"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto whitespace-nowrap grid grid-cols-12 gap-6 px-6 py-6 sm:py-8"
          >
            <div className="relative col-span-12 xl:col-span-8 border-[2px] border-cyan-800 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.4)] p-5">
              <Maus setData={setData} />
            </div>
            <div className="col-span-12 self-start xl:col-span-4 border-[2px] border-cyan-800 bg-gray-50 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.4)] p-5">
              <div className="flex justify-center">
                <img
                  src={image.imageYelling}
                  alt="imageYelling"
                  className="w-72 h-72"
                />
              </div>
              <div className="grid gap-6">
                <button
                  onClick={() => {
                    setIsShow(1);
                    handleSubmit(onSubmitPhieuDkyDV)();
                  }}
                  className="whitespace-normal capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-center gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                >
                  <span className="w-5 sm:w-7">
                    <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />
                  </span>
                  <span className="pt-[2px] whitespace-normal">
                    Thông tin chung
                  </span>
                </button>
                <button
                  onClick={() => {
                    setIsShow(3);
                    handleSubmit(onSubmitPhieuDkyDV)();
                  }}
                  className="whitespace-normal capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-start sm:items-center sm:gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                >
                  <span className="w-7 sm:w-7">
                    <MdScience className="w-7 h-7 sm:w-7 sm:h-7 shrink-0 text-orange-300" />
                  </span>
                  <span className="pt-[2px]">
                    Điền thông tin phụ liệu hóa chất cần gửi
                  </span>
                </button>
                {data?.Maus?.length >= 1 && data?.PLHC?.length >= 1 && (
                  <button
                    onClick={handleSubmit(handleGui, () => {
                      errors && setIsShow(1);
                    })}
                    className="whitespace-normal capitalize border-[2px] bg-blue-500 border-solid hover:bg-blue-600 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-start sm:items-center sm:gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                  >
                    <span className="pt-[2px] text-white">Gửi</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="form-plhc"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto whitespace-nowrap grid grid-cols-12 gap-6 px-6 py-6 sm:py-8"
          >
            <div className="relative col-span-12 xl:col-span-8 border-[2px] border-cyan-800 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.4)] p-5">
              <PhuLieuHoaChat setData={setData} />
            </div>
            <div className="col-span-12 self-start xl:col-span-4 border-[2px] border-cyan-800 bg-gray-50 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.4)] p-5">
              <div className="flex justify-center">
                <img
                  src={image.imageYelling}
                  alt="imageYelling"
                  className="w-72 h-72"
                />
              </div>
              <div className="grid gap-6">
                <button
                  onClick={() => {
                    setIsShow(1);
                    handleSubmit(onSubmitPhieuDkyDV)();
                  }}
                  className="whitespace-normal capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-center gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                >
                  <span className="w-5 sm:w-7">
                    <MdAccountBox className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-indigo-600" />
                  </span>
                  <span className="pt-[2px] whitespace-normal">
                    Thông tin chung
                  </span>
                </button>
                <button
                  onClick={() => {
                    setIsShow(2);
                    handleSubmit(onSubmitPhieuDkyDV)();
                  }}
                  className="whitespace-normal capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-start sm:items-center sm:gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                >
                  <span className="w-5 sm:w-7">
                    <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />
                  </span>
                  <span className="pt-[2px] whitespace-normal">
                    Điền thông tin mẫu cần gửi
                  </span>
                </button>
                {data?.Maus?.length >= 1 && data?.PLHC?.length >= 1 && (
                  <button
                    onClick={handleSubmit(handleGui, () => {
                      errors && setIsShow(1);
                    })}
                    className="whitespace-normal capitalize border-[2px] bg-blue-500 border-solid hover:bg-blue-600 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-start sm:items-center sm:gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                  >
                    <span className="pt-[2px] text-white">Gửi</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="form-signup-thongtinchung"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto whitespace-nowrap grid grid-cols-12 gap-6 px-6 py-6 sm:py-8"
          >
            <div className="relative col-span-12 xl:col-span-8 border-[2px] border-cyan-800 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
              <Box className="absolute z-50 -top-5 left-1/2 -translate-x-1/2 text-center bg-cyan-800 px-6 py-1 rounded-lg border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                <p className="text-lg/6 capitalize font-medium text-white">
                  Thông tin chung
                </p>
              </Box>
              <form className="px-5 pt-8 pb-6 self-start grid grid-cols-12 gap-1 md:gap-[0px_24px]">
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
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
                        backgroundColor: "white",
                      },
                    }}
                  />
                </Box>
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
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
                        backgroundColor: "white",
                      },
                    }}
                  />
                </Box>
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
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
                        backgroundColor: "white",
                      },
                    }}
                  />
                </Box>
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
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
                        backgroundColor: "white",
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
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
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
                <Box className="col-span-12 md:col-span-6 lg:col-span-4">
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
                        backgroundColor: "white",
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
                        backgroundColor: "white",
                      },
                    }}
                  />
                </Box>
                <Box className="col-span-12 md:col-span-6 gap-2 grid">
                  <p className="!font-semibold text-base/6 text-cyan-950">
                    Kết quả
                  </p>
                  <Box className="gap-2 flex bg-white items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full">
                    <input
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer"
                      {...register("KetQuaTiengAnh")}
                    />
                    <span className="text-base/6 font-medium">Tiếng Anh</span>
                  </Box>
                </Box>
              </form>
            </div>
            <div className="col-span-12 self-start xl:col-span-4 border-[2px] border-cyan-800 bg-gray-50 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.4)] p-5">
              <div className="flex justify-center">
                <img
                  src={image.imageYelling}
                  alt="imageYelling"
                  className="w-72 h-72"
                />
              </div>
              <div className="grid gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsShow(2);
                    handleSubmit(onSubmitPhieuDkyDV)();
                  }}
                  className="whitespace-normal capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-center gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                >
                  <span className="w-5 sm:w-7">
                    <MdDescription className="w-5 h-5 sm:w-7 sm:h-7 shrink-0 text-blue-500" />
                  </span>
                  <span className="pt-[2px] whitespace-normal">
                    Điền thông tin mẫu cần gửi
                  </span>
                </button>
                <button
                  onClick={() => {
                    setIsShow(3);
                    handleSubmit(onSubmitPhieuDkyDV)();
                  }}
                  className="whitespace-normal capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-start sm:items-center sm:gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                >
                  <span className="w-7 sm:w-7">
                    <MdScience className="w-7 h-7 sm:w-7 sm:h-7 shrink-0 text-orange-300" />
                  </span>
                  <span className="pt-[2px]">
                    Điền thông tin phụ liệu hóa chất cần gửi
                  </span>
                </button>
                {data?.Maus?.length >= 1 && data?.PLHC?.length >= 1 && (
                  <button
                    onClick={handleSubmit(handleGui, () => {
                      errors && setIsShow(1);
                    })}
                    className="whitespace-normal capitalize border-[2px] bg-blue-500 border-solid  hover:bg-blue-600 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-start sm:items-center sm:gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                  >
                    <span className="pt-[2px] text-white">Gửi</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        );
    }
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
    } else if (userInfo) {
      reset({
        ...defaultFormValues,
        NguoiGuiMau: userInfo.tenNguoiDaiDien,
        DonViGuiMau: userInfo.tenKh,
        SoDienThoai: userInfo.soDienThoai,
        Email: userInfo.email,
        DiaChiLienHe: userInfo.diaChi,
      });
    } else {
      reset(defaultFormValues);
    }
  }, [reset, userInfo, data]);

  useEffect(() => {
    if (!isLogin && !isLoadingAuth) {
      setOpenLoginCustomer(true);
    }
  }, [isLogin, isLoadingAuth]);

  return isLogin ? (
    <Box>
      <motion.div
        key="FormSignUpDVKN"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
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
          <Box className="!absolute bottom-0 w-full flex items-center justify-between px-6 py-6 sm:py-8 z-10">
            <button
              className="p-1 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group cursor-pointer"
              onClick={handleClickOpenPopupThoatForm}
            >
              <MdDoorBack className="w-4 h-4 sm:w-7 sm:h-7 text-[#306fb2]" />
            </button>
            <div className="flex-1 flex justify-center">
              <p className="capitalize text-xl/4 sm:text-3xl/6 font-bold text-white border-[2px] px-6 py-2 rounded-lg bg-cyan-800 mr-16">
                Đăng Ký Dịch Vụ Kiểm Nghiệm
              </p>
            </div>
          </Box>
        </Box>
        {handleShow()}
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
  ) : null;
};

export default FormSignUpDVKN;
