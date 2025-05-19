import { Box, TextField } from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import {
  FormAccountCustomerLogin,
  FormAccountCustomerSignUp,
} from "../../../../models/Account-Customer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextField } from "../../../InputTextField";
import yup from "../../../../configs/yup.custom";

interface Props {
  btnLogin: () => void;
}

const SignUpForm = (props: Props) => {
  const { btnLogin } = props;

  let schema = useMemo(() => {
    return yup.object().shape({
      tenKH: yup
        .string()
        .required("Yêu cầu nhập Tên khách hàng")
        .max(200, "Tên khách hàng nhập phải dưới 200 ký tự"),
      email: yup
        .string()
        .required("Yêu cầu nhập Email")
        .max(50, "Email nhập phải dưới 50 ký tự"),
      username: yup
        .string()
        .required("Yêu cầu nhập Tài khoản")
        .max(200, "Tài khoản nhập phải dưới 200 ký tự"),
      password: yup
        .string()
        .required("Yêu cầu nhập Mật khẩu")
        .max(200, "Mật khẩu nhập phải dưới 200 ký tự"),
      rePassword: yup
        .string()
        .required("Yêu cầu nhập Xác nhận mật khẩu")
        .max(200, "Xác nhận mật khẩu nhập phải dưới 200 ký tự")
        .oneOf([yup.ref("password")], "Xác nhận mật khẩu không khớp"),
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

  const SignUpSubmit = (data: FormAccountCustomerSignUp) => {
    console.log("data", data);
  };

  useEffect(() => {
    reset({
      tenKH: "",
      email: "",
      username: "",
      password: "",
      rePassword: "",
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
          <Box className="grid gap-1">
            <Box className="flex gap-10">
              <InputTextField
                title="Họ và tên"
                variant="standard"
                className="w-full"
                inputRef={register("tenKH")}
                errorMessage={errors.tenKH?.message}
              />
              <InputTextField
                title="Email"
                variant="standard"
                type="email"
                className="w-full"
                inputRef={register("email")}
                errorMessage={errors.email?.message}
              />
            </Box>
            <InputTextField
              title="Tài khoản"
              variant="standard"
              className="w-full"
              inputRef={register("username")}
              errorMessage={errors.username?.message}
            />
            <InputTextField
              title="Mật khẩu"
              variant="standard"
              type="password"
              className="w-full"
              inputRef={register("password")}
              errorMessage={errors.password?.message}
            />
            <InputTextField
              title="Xác nhận mật khẩu"
              variant="standard"
              type="password"
              className="w-full"
              inputRef={register("rePassword")}
              errorMessage={errors.rePassword?.message}
            />
          </Box>
          <Box>
            <button className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">
              Đăng ký
            </button>
          </Box>
        </form>
      </Box>
    </motion.div>
  );
};

export default SignUpForm;
