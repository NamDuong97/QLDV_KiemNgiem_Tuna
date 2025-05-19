import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormAccountCustomerResetPassword } from "../../../../../models/Account-Customer";
import yup from "../../../../../configs/yup.custom";
import { InputTextField } from "../../../../InputTextField";

interface Props {
  btnLogin: () => void;
}

const ResetPasswordForm = (props: Props) => {
  const { btnLogin } = props;

  let schemaLogin = useMemo(() => {
    return yup.object().shape({
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
  } = useForm<FormAccountCustomerResetPassword>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
  });

  const ResetPasswordSubmit = (data: FormAccountCustomerResetPassword) => {
    console.log("data", data);
    btnLogin?.();
  };

  useEffect(() => {
    reset({ password: "", rePassword: "" });
  }, []);

  return (
    <motion.div
      key="ResetPasswordForm"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box className="grid gap-6">
        <Box className="text-center grid gap-4">
          <h1 className="font-bold text-4xl">Quên Mật Khẩu</h1>
        </Box>
        <Box>
          <form
            onSubmit={handleSubmit(ResetPasswordSubmit)}
            className="grid gap-6"
          >
            <Box className="grid gap-4">
              <InputTextField
                title="Mật khẩu mới"
                variant="standard"
                type="password"
                className="w-full"
                inputRef={register("password")}
                errorMessage={errors.password?.message}
              />
              <InputTextField
                title="Xác nhận mật khẩu mới"
                variant="standard"
                type="password"
                className="w-full"
                inputRef={register("rePassword")}
                errorMessage={errors.rePassword?.message}
              />
            </Box>
            <Box>
              <button className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">
                Cập nhật mật khẩu
              </button>
            </Box>
          </form>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ResetPasswordForm;
