import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Link, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VerifyYourEmail from "./Verify_Your_Email";
import yup from "../../../../configs/yup.custom";
import { InputTextField } from "../../../InputTextField";
import { useQuenMatKhau } from "../../../../hooks/access/useAccess";
import { queryClient } from "../../../../lib/reactQuery";

interface LoginForm {
  email: string;
}

interface Props {
  btnLogin: () => void;
}

const ForgotPassword = (props: Props) => {
  const { btnLogin } = props;
  const [tabPage, setTabPage] = useState(true);
  const [isSentEmail, setIsSentEmail] = useState(false);
  const [dataEmail, setDataEmail] = useState({});
  console.log("dataEmail", dataEmail);
  const handleOnSettled = async (response: any) => {
    await queryClient.invalidateQueries({
      queryKey: ["QuenMatKhau"],
    });
    if (response.status === 200) {
      setIsSentEmail(true);
      setTabPage(!tabPage);
      reset({ email: "" });
    }
  };
  const { mutate } = useQuenMatKhau({
    queryKey: "QuenMatKhau",
    onSettled: handleOnSettled,
  });

  let schema = useMemo(() => {
    return yup.object().shape({
      email: yup
        .string()
        .required("Yêu cầu nhập email")
        .max(50, "Email nhập phải dưới 50 ký tự")
        .email("Yêu cầu nhập đúng định dạng email"),
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = (data: LoginForm) => {
    setDataEmail(data);
    mutate(data.email);
  };

  useEffect(() => {
    reset({ email: "" });
  }, []);

  return (
    <>
      {!isSentEmail ? (
        <Box>
          <Box className="flex gap-10 mb-10 px-6">
            <Box
              className={`${
                tabPage ? "bg-cyan-700" : "bg-gray-400"
              } h-1 w-full rounded-r-full`}
            />
            <Box
              className={`${
                !tabPage ? "bg-cyan-700" : "bg-gray-400"
              } h-1 w-full rounded-l-full`}
            />
          </Box>
          <Box className="gap-5 grid">
            <Box className="text-center gap-2 grid">
              <h1 className="text-3xl font-bold">Quên mật khẩu</h1>
              <Typography className="text-base/6 font-medium text-gray-400">
                Nhập tài khoản bạn đã sử dụng khi tham gia và chúng tôi sẽ gửi
                cho bạn mật khẩu mới.
              </Typography>
            </Box>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Box className="gap-3 grid">
                <Box className="gap-6 grid">
                  <InputTextField
                    title="Email"
                    name="email"
                    variant="standard"
                    className="w-full"
                    inputRef={register("email")}
                    errorMessage={errors.email?.message}
                  />
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    className="w-full !py-3 !capitalize"
                    type="submit"
                  >
                    Sent Email
                  </Button>
                </Box>
              </Box>
            </form>
            <Box>
              <Link
                className="flex justify-center items-center gap-2 cursor-pointer"
                onClick={btnLogin}
                underline="hover"
              >
                <ExitToAppIcon className="rotate-180 text-blue-500" />
                <Typography className="!text-blue-500 !text-sm/4">
                  Back to Login
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      ) : (
        <VerifyYourEmail tabPage={tabPage} />
      )}
    </>
  );
};

export default ForgotPassword;
