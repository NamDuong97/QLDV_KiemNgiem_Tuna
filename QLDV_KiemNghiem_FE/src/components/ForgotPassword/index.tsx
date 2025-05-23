import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VerifyYourEmail from "./Verify_Your_Email";
import { useNavigate } from "react-router";
import yup from "../../configs/yup.custom";
import { APP_ROUTES } from "../../constants/routers";
import { InputTextField } from "../InputTextField";

interface LoginForm {
  TenTaiKhoan: string;
  EmailCaNhan: string;
}

const ForgotPassword = () => {
  const router = useNavigate();
  const [tabPage, setTabPage] = useState(true);
  const [isSentEmail, setIsSentEmail] = useState(false);
  const [dataEmail, setDataEmail] = useState({});

  let schema = useMemo(() => {
    return yup.object().shape({
      TenTaiKhoan: yup
        .string()
        .required("Yêu cầu nhập Tài khoản")
        .max(200, "Tài khoản nhập phải dưới 200 ký tự"),
      EmailCaNhan: yup
        .string()
        .required("Yêu cầu nhập email")
        .max(50, "Email nhập phải dưới 50 ký tự")
        .email("Yêu cầu nhập đúng định dạng email"),
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = (data: LoginForm) => {
    // const form = new FormData();
    // form.append("email", data.email)
    setDataEmail(data);
    setIsSentEmail(true);
    setTabPage(!tabPage);
  };

  const handleRedirectLogin = () => {
    router(APP_ROUTES.TUNA_ADMIN.LOGIN.to);
  };

  return (
    <>
      {!isSentEmail ? (
        <Container className="pt-32">
          <Box className="py-5 flex justify-center">
            <Card sx={{ width: 518, borderRadius: "10px" }}>
              <CardContent className="!p-8">
                <Box className="flex gap-10 mb-10">
                  <Box
                    className={`${
                      tabPage ? "bg-cyan-700" : "bg-gray-400"
                    } h-1 w-full rounded-r-full`}
                  ></Box>
                  <Box
                    className={`${
                      !tabPage ? "bg-cyan-700" : "bg-gray-400"
                    } h-1 w-full rounded-l-full`}
                  ></Box>
                </Box>
                <Box className="gap-7 grid">
                  <Box className="text-center gap-2 grid">
                    <h1 className="text-3xl font-bold">Forgot password?</h1>
                    <Typography className="text-base/6 font-medium text-gray-400">
                      Nhập tài khoản bạn đã sử dụng khi tham gia và chúng tôi sẽ
                      gửi cho bạn mật khẩu mới.
                    </Typography>
                  </Box>
                  <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <Box className="gap-3 grid">
                      <Box className="gap-6 grid">
                        <InputTextField
                          title="Tài Khoản"
                          variant="standard"
                          className="w-full"
                          inputRef={register("TenTaiKhoan")}
                          errorMessage={errors.TenTaiKhoan?.message}
                        />
                        <InputTextField
                          title="Email"
                          variant="standard"
                          className="w-full"
                          inputRef={register("EmailCaNhan")}
                          errorMessage={errors.EmailCaNhan?.message}
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
                      onClick={handleRedirectLogin}
                      underline="hover"
                    >
                      <ExitToAppIcon className="rotate-180 text-blue-500" />
                      <Typography className="!text-blue-500 !text-sm/4">
                        Back to Login
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      ) : (
        <VerifyYourEmail
          tabPage={tabPage}
          dataEmail={dataEmail}
          handleRedirectLogin={handleRedirectLogin}
        />
      )}
    </>
  );
};

export default ForgotPassword;
