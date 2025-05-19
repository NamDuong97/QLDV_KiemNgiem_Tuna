import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import { FormAccountCustomerLogin } from "../../../../models/Account-Customer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextField } from "../../../InputTextField";
import yup from "../../../../configs/yup.custom";

interface Props {
  btnSignUp: () => void;
  btnRepassword: () => void;
}

const LoginForm = (props: Props) => {
  const { btnSignUp, btnRepassword } = props;

  let schemaLogin = useMemo(() => {
    return yup.object().shape({
      username: yup
        .string()
        .required("Yêu cầu nhập Tài khoản")
        .max(200, "Tài khoản nhập phải dưới 200 ký tự"),
      password: yup
        .string()
        .required("Yêu cầu nhập Mật khẩu")
        .max(200, "Mật khẩu nhập phải dưới 200 ký tự"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormAccountCustomerLogin>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
  });

  const LoginSubmit = (data: FormAccountCustomerLogin) => {
    console.log("data", data);
  };

  useEffect(() => {
    reset({ username: "", password: "" });
  }, []);

  return (
    <motion.div
      key="login"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box className="grid gap-6">
        <Box className="text-center grid gap-4">
          <h1 className="font-bold text-4xl">Đăng nhập</h1>
          <p className="text-base/6 font-medium">
            Chưa có tài khoản vui lòng đăng ký?{" "}
            <span
              className="font-bold text-blue-500 hover:underline cursor-pointer"
              onClick={btnSignUp}
            >
              Đăng ký
            </span>
          </p>
        </Box>
        <Box>
          <form onSubmit={handleSubmit(LoginSubmit)} className="grid gap-2">
            <Box className="grid gap-4">
              <InputTextField
                title="Tài Khoản"
                variant="standard"
                className="w-full"
                inputRef={register("username")}
                errorMessage={errors.username?.message}
              />
              <Box className="mb-4 grid gap-1">
                <InputTextField
                  title="Mật Khẩu"
                  type="password"
                  variant="standard"
                  className="w-full"
                  inputRef={register("password")}
                  errorMessage={errors.password?.message}
                />

                <p
                  className="text-end text-base/6 font-medium text-gray-500 hover:underline cursor-pointer"
                  onClick={btnRepassword}
                >
                  Quên mật khẩu?
                </p>
              </Box>
            </Box>
            <Box>
              <button className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">
                Đăng nhập
              </button>
            </Box>
          </form>
        </Box>
      </Box>
    </motion.div>
  );
};

export default LoginForm;
