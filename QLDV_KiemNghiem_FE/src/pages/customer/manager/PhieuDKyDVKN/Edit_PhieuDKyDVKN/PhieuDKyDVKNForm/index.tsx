import { Box, IconButton } from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { FormPhieuDangKy } from "../../../../../../models/PhieuDangKy";
import yup from "../../../../../../configs/yup.custom";
import { Inputs } from "../../../../../../components/Inputs";
import InputSelect from "../../../../../../components/InputSelect";
import { APP_ROUTES } from "../../../../../../constants/routers";
import { MdOutlineDoorBack } from "react-icons/md";
import ThongBao from "./ThongBao";

interface Props {
  dataPhieuDangKy?: any;
}

const dataHinhThucGuiTra = [
  { value: "Trực tiếp", label: "Trực tiếp" },
  { value: "Bưu điện", label: "Bưu điện" },
];

const PhieuDKyDVKNForm = (props: Props) => {
  const { dataPhieuDangKy } = props;

  const navigate = useNavigate();
  const [openThongBao, setOpenThongBao] = useState(false);

  const handleClickOpenThongBao = () => {
    setOpenThongBao(true);
  };

  const handleCloseThongBao = () => {
    setOpenThongBao(false);
  };

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
        .max(50, "Số điện thoại nhập phải dưới 50 ký tự")
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
      KetQuaTiengAnh: yup.number().transform((_, item) => (item ? 1 : 0)),
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

  const onSubmitPhieuDkyDV = (data: FormPhieuDangKy) => {
    // sessionStorage.setItem("PhieuDangKy", JSON.stringify(data));
    console.log("data,", data);
  };

  useEffect(() => {
    if (dataPhieuDangKy) reset(dataPhieuDangKy);
    else
      reset({
        DonViGuiMau: "",
        NguoiGuiMau: "",
        SoDienThoai: "",
        Email: "",
        DiaChiLienHe: "",
        HinhThucGuiMau: "",
        HinhThucTraKQ: "",
        DiaChiGiaoMau: "",
        KetQuaTiengAnh: 0,
        NgayGiaoMau: "",
      });
  }, [reset, dataPhieuDangKy]);

  return (
    <form className="pt-6 pb-12 px-6">
      <motion.div
        key="phieu-dang-ky"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4"
      >
        <Box className="flex justify-between items-center">
          <Box className="flex items-center gap-2">
            <IconButton
              className="cursor-pointer !rounded !p-1"
              onClick={() => {
                navigate(
                  `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}?tuna=cho-xet-duyet`
                );
              }}
            >
              <MdOutlineDoorBack className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-blue-600" />
            </IconButton>

            <p className="text-[22px]/6 lg:text-3xl/6 font-bold text-gray-800">
              Thông tin chung
            </p>
          </Box>
          <Box className="hidden sm:block">
            <button
              type="button"
              onClick={handleClickOpenThongBao}
              className="px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer border border-solid border-blue-500 text-blue-500 group hover:bg-blue-500"
            >
              <span className="text-base/6 md:text-lg/6 font-bold text-blue-500 group-hover:text-white">
                Lưu
              </span>
            </button>
          </Box>
        </Box>
        <hr className="text-gray-300" />
        <Box className="sm:border sm:border-solid sm:border-gray-300 sm:rounded-[10px]">
          <Box className="sm:p-5 grid grid-cols-12 gap-1 md:gap-[0px_24px]">
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
                title="Số Điện Thoại"
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
              <p className="!font-semibold text-base/6 text-gray_80">Kết Quả</p>
              <Box className="gap-2 flex items-center border border-solid border-gray-300 rounded py-[10px] px-4 w-full">
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer"
                  {...register("KetQuaTiengAnh")}
                />
                <span className="text-base/6 font-medium">Tiếng Anh</span>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="block sm:hidden">
          <button
            type="button"
            onClick={handleClickOpenThongBao}
            className="py-2 w-full rounded cursor-pointer border border-solid border-blue-500 text-blue-500 group hover:bg-blue-500"
          >
            <span className="text-base/6 md:text-lg/6 font-bold text-blue-500 group-hover:text-white">
              Lưu
            </span>
          </button>
        </Box>
      </motion.div>
      <ThongBao
        open={openThongBao}
        handleClose={handleCloseThongBao}
        onSubmit={handleSubmit(onSubmitPhieuDkyDV)}
      />
    </form>
  );
};

export default PhieuDKyDVKNForm;
