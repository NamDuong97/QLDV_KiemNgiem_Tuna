import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { FormAccountCustomerLogin } from "../../../../models/Account-Customer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextField } from "../../../InputTextField";
import yup from "../../../../configs/yup.custom";
import { queryClient } from "../../../../lib/reactQuery";
import { useDangNhapKhachHang } from "../../../../hooks/access/useAccess";

interface Props {
  btnSignUp: () => void;
  btnRepassword: () => void;
  handleCloseLoginCustomer: () => void;
}

const LoginForm = (props: Props) => {
  const { btnSignUp, btnRepassword, handleCloseLoginCustomer } = props;

  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  let schemaLogin = useMemo(() => {
    return yup.object().shape({
      email: yup
        .string()
        .required("Yêu cầu nhập Tài khoản")
        .email("Yêu cầu nhập đúng định dạng")
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

  const handleOnSettled = async (response: any) => {
    await queryClient.invalidateQueries({
      queryKey: ["DangNhapKhachHang"],
    });
    if (response && response.status === 200) {
      handleCloseLoginCustomer?.();
      reset({ email: "", password: "" });
    } else {
      setCount(count + 1);
    }
  };
  console.log("count", count);

  const { mutate } = useDangNhapKhachHang({
    queryKey: "DangNhapKhachHang",
    onSettled: handleOnSettled,
  });

  const LoginSubmit = (data: FormAccountCustomerLogin) => {
    mutate(data);
  };
  useEffect(() => {
    if (count === 3) {
      setDisabled(true);
      const timer = setTimeout(() => {
        setDisabled(false);
        setCount(0);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  useEffect(() => {
    reset({ email: "", password: "" });
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
                title="Email"
                type="email"
                variant="standard"
                className="w-full"
                inputRef={register("email")}
                errorMessage={errors.email?.message}
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

                <div className="flex justify-end">
                  <p
                    className="text-end text-base/6 font-medium text-gray-500 hover:underline cursor-pointer"
                    onClick={btnRepassword}
                  >
                    Quên mật khẩu?
                  </p>
                </div>
              </Box>
            </Box>
            <Box>
              <button
                disabled={disabled}
                className={`font-bold text-center w-full  py-2 text-white rounded-md  ${
                  disabled
                    ? "cursor-no-drop bg-blue-400"
                    : "cursor-pointer bg-blue-500 hover:bg-blue-400"
                }`}
              >
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
