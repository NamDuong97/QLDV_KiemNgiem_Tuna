import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import {
  FormAccountCustomerRepassword,
} from "../../../../../models/Account-Customer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTextField } from "../../../../InputTextField";
import yup from "../../../../../configs/yup.custom";

interface Props {
  btnLogin: () => void;
  isAccount: () => void;
}

const RepasswordForm = (props: Props) => {
  const { btnLogin, isAccount } = props;

  let schemaLogin = useMemo(() => {
    return yup.object().shape({
      username: yup
        .string()
        .required("Yêu cầu nhập Tài khoản")
        .max(200, "Tài khoản nhập phải dưới 200 ký tự"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormAccountCustomerRepassword>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
  });

  const RepasswordSubmit = (data: FormAccountCustomerRepassword) => {
    console.log("data", data);
    isAccount?.();
  };

  useEffect(() => {
    reset({ username: "" });
  }, []);

  return (
    <motion.div
      key="RepasswordForm"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box className="grid gap-6">
        <Box className="text-center grid gap-4">
          <h1 className="font-bold text-4xl">Quên Mật Khẩu</h1>
          <p className="text-base/6 font-medium">
            Đã có tài khoản vui lòng đăng nhập?{" "}
            <span
              className="font-bold text-blue-500 hover:underline cursor-pointer"
              onClick={btnLogin}
            >
              Đăng nhập
            </span>
          </p>
        </Box>
        <Box>
          <form
            onSubmit={handleSubmit(RepasswordSubmit)}
            className="grid gap-6"
          >
            <Box className="grid gap-4">
              <InputTextField
                title="Tài Khoản"
                variant="standard"
                className="w-full"
                inputRef={register("username")}
                errorMessage={errors.username?.message}
              />
            </Box>
            <Box>
              <button className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">
                Gửi
              </button>
            </Box>
          </form>
        </Box>
      </Box>
    </motion.div>
  );
};

export default RepasswordForm;
