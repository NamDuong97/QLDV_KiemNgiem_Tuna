import { Box } from "@mui/material";
import { motion } from "motion/react";
import { Inputs } from "../../../../../components/Inputs";
import InputSelect from "../../../../../components/InputSelect";
import { useEffect, useMemo, useState } from "react";
import yup from "../../../../../configs/yup.custom";
import { FormPhieuDangKy } from "../../../../../models/PhieuDangKy";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../constants/routers";

interface Props {
  handleRedirectTag2?: () => void;
}

const dataHinhThucGuiTra = [
  { value: "Trực tiếp", label: "Trực tiếp" },
  { value: "Bưu điện", label: "Bưu điện" },
];

const PhieuDKyDVKNForm = (props: Props) => {
  const { handleRedirectTag2 } = props;
  const dataSession = sessionStorage.getItem("PhieuDangKy");
  const [data] = useState<FormPhieuDangKy>(
    dataSession ? JSON.parse(dataSession) : {}
  );

  const naginate = useNavigate();

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
    sessionStorage.setItem("PhieuDangKy", JSON.stringify(data));
    handleRedirectTag2?.();
  };

  useEffect(() => {
    if (data) reset(data);
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
  }, [reset, data]);

  return (
    <form onSubmit={handleSubmit(onSubmitPhieuDkyDV)}>
      <motion.div
        key="tag1"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="p-5 grid grid-cols-12 gap-1 md:gap-[0px_24px]">
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

          <Box className="col-span-6 gap-2 grid">
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
      </motion.div>

      <Box
        className={`border-t border-solid border-gray-300 p-5 flex justify-between`}
      >
        <motion.div
          key="btn_back"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="bg-amber-400 px-3 py-1 lg:px-6 lg:py-2 rounded cursor-pointer hover:bg-amber-500 shadow-[inset_0_0_6px_rgba(0,0,0,0.2)] hover:shadow-none"
            onClick={() => naginate(APP_ROUTES.TUNA_CUSTOMER.HOME.to)}
          >
            <span className="text-base/4 sm:text-lg/6 font-bold text-white">
              Thoát
            </span>
          </button>
        </motion.div>

        <motion.div
          key="btn_next"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="bg-blue-500 px-4 py-1 lg:px-6 lg:py-2 rounded cursor-pointer hover:bg-blue-400 shadow-[inset_0_0_6px_rgba(0,0,0,0.2)] hover:shadow-none"
            type="submit"
          >
            <span className="text-base/4 sm:text-lg/6 font-bold text-white">
              Tiếp
            </span>
          </button>
        </motion.div>
      </Box>
    </form>
  );
};

export default PhieuDKyDVKNForm;
