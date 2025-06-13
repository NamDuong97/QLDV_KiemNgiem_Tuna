import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { FormAccountCustomerSignUp } from "../../../../models/Account-Customer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextField } from "../../../InputTextField";
import yup from "../../../../configs/yup.custom";
import { useDangKyKhachHang } from "../../../../hooks/access/useAccess";
import { queryClient } from "../../../../lib/reactQuery";
import VerifyYourEmail from "./Verify_Your_Email";

interface Props {
  btnLogin: () => void;
}

const SignUpForm = (props: Props) => {
  const { btnLogin } = props;

  const [isSignIn, setisSignIn] = useState(false);

  let schema = useMemo(() => {
    return yup.object().shape({
      tenKh: yup
        .string()
        .required("Yêu cầu nhập Tên khách hàng")
        .max(200, "Tên khách hàng nhập phải dưới 200 ký tự"),
      tenNguoiDaiDien: yup
        .string()
        .required("Yêu cầu nhập Tên người đại diện")
        .max(200, "Tên người đại diện nhập phải dưới 200 ký tự"),
      email: yup
        .string()
        .required("Yêu cầu nhập Email")
        .email("Yêu cầu nhập đúng định dạng email")
        .max(50, "Email nhập phải dưới 50 ký tự"),
      soDienThoai: yup
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
      matKhau: yup
        .string()
        .required("Yêu cầu nhập Mật khẩu")
        .max(200, "Mật khẩu nhập phải dưới 200 ký tự"),
      xacNhanMatKhau: yup
        .string()
        .required("Yêu cầu nhập Xác nhận mật khẩu")
        .max(200, "Xác nhận mật khẩu nhập phải dưới 200 ký tự")
        .oneOf([yup.ref("matKhau")], "Xác nhận mật khẩu không khớp"),
      diaChi: yup
        .string()
        .required("Yêu cầu nhập Địa chỉ")
        .max(500, "Địa chỉ nhập phải dưới 500 ký tự"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormAccountCustomerSignUp>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleOnSettled = async (response: any) => {
    await queryClient.invalidateQueries({
      queryKey: ["dangKyKhachHang"],
    });
    if (response.status === 200) {
      setisSignIn(true);
      reset({
        tenKh: "",
        email: "",
        matKhau: "",
        xacNhanMatKhau: "",
        tenNguoiDaiDien: "",
        soDienThoai: "",
        diaChi: "",
      });
    }
  };

  const { mutate } = useDangKyKhachHang({
    queryKey: "dangKyKhachHang",
    onSettled: handleOnSettled,
  });

  const SignUpSubmit = (data: FormAccountCustomerSignUp) => {
    const dataFinal = {
      tenKh: data.tenKh,
      diaChi: data.diaChi,
      tenNguoiDaiDien: data.tenNguoiDaiDien,
      soDienThoai: data.soDienThoai,
      email: data.email,
      matKhau: data.matKhau,
    };
    mutate(dataFinal);
  };

  useEffect(() => {
    reset({
      tenKh: "",
      email: "",
      matKhau: "",
      xacNhanMatKhau: "",
      tenNguoiDaiDien: "",
      soDienThoai: "",
      diaChi: "",
    });
  }, []);

  return (
    <motion.div
      key="signup"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isSignIn ? (
        <VerifyYourEmail handleRedirectLogin={btnLogin} />
      ) : (
        <Box className="grid gap-6">
          <Box className="text-center grid gap-4">
            <h1 className="font-bold text-4xl">Đăng Ký</h1>
            <p className="text-base/6 font-medium grid sm:block">
              <span> Đã có tài khoản vui lòng đăng nhập? </span>
              <span
                className="font-bold text-blue-500 hover:underline cursor-pointer"
                onClick={btnLogin}
              >
                Đăng Nhập
              </span>
            </p>
          </Box>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(SignUpSubmit)}
            className="grid gap-6"
          >
            <Box className="grid gap-2">
              <Box className="flex gap-6">
                <InputTextField
                  title="Tên người đại diện"
                  variant="standard"
                  className="w-full"
                  name="tenNguoiDaiDien"
                  inputRef={register("tenNguoiDaiDien")}
                  errorMessage={errors.tenNguoiDaiDien?.message}
                />

                <InputTextField
                  title="Số điện thoại"
                  type="number"
                  variant="standard"
                  className="w-full"
                  name="soDienThoai"
                  inputRef={register("soDienThoai")}
                  errorMessage={errors.soDienThoai?.message}
                  placeholder="VD: 03976*****"
                  sx={{
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
              <InputTextField
                title="Email"
                variant="standard"
                type="email"
                className="w-full"
                inputRef={register("email")}
                errorMessage={errors.email?.message}
              />
              <InputTextField
                title="Tên Đơn vị"
                variant="standard"
                className="w-full"
                inputRef={register("tenKh")}
                errorMessage={errors.tenKh?.message}
              />
              <InputTextField
                title="Địa chỉ"
                variant="standard"
                className="w-full"
                name="diaChi"
                inputRef={register("diaChi")}
                errorMessage={errors.diaChi?.message}
              />
              <InputTextField
                title="Mật khẩu"
                variant="standard"
                type="password"
                className="w-full"
                inputRef={register("matKhau")}
                errorMessage={errors.matKhau?.message}
              />
              <InputTextField
                title="Xác nhận mật khẩu"
                variant="standard"
                type="password"
                className="w-full"
                inputRef={register("xacNhanMatKhau")}
                errorMessage={errors.xacNhanMatKhau?.message}
              />
            </Box>
            <Box>
              <button className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">
                Đăng ký
              </button>
            </Box>
          </form>
        </Box>
      )}
    </motion.div>
  );
};

export default SignUpForm;
