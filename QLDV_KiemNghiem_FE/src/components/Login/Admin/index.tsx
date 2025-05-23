import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router";
import yup from "../../../configs/yup.custom";
import { APP_ROUTES } from "../../../constants/routers";
import { Inputs } from "../../Inputs";
import { InputTextField } from "../../InputTextField";

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const router = useNavigate();

  const [isError, setIsError] = useState(false);

  let schema = useMemo(() => {
    return yup.object().shape({
      username: yup
        .string()
        .required("Yêu cầu nhập Tài khoản")
        .max(200, "Tài khoản nhập phải dưới 200 ký tự"),
      password: yup
        .string()
        .required("Yêu cầu nhập mật khẩu")
        .max(200, "Mật khẩu nhập phải dưới 200 ký tự"),
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = (data: LoginForm) => {
    // const form = new FormData();
    // form.append("email", data.email)
    // form.append("password", data.password)
    if (data.username === "admin123" && data.password === "123")
      router(APP_ROUTES.TUNA_ADMIN.DASHBOARD.to);
    else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  };

  const handleRedirectForgot = () => {
    router(APP_ROUTES.TUNA_ADMIN.FORGOTPASSWORD.to);
  };

  // const onSubmit: SubmitHandler<LoginForm> = (data) => console.log(data)

  useEffect(() => {
    reset({
      username: "",
      password: "",
    });
  }, []);

  return (
    <Container className="pt-32">
      <Box className="py-5 flex justify-center">
        <Card
          sx={{ width: 518, borderRadius: "10px", border: "1px solid #d1d5dc" }}
        >
          <CardContent className="!p-8">
            <Box className="gap-6 grid">
              <Box className="text-center gap-2 grid">
                <h1 className="text-3xl font-bold">Log In</h1>
              </Box>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Box className="gap-3 grid">
                  <Box className="gap-6 grid">
                    <Box>
                      <InputTextField
                        title="Tài Khoản"
                        name="username"
                        variant="standard"
                        className="w-full"
                        inputRef={register("username")}
                        errorMessage={errors.username?.message}
                      />
                    </Box>
                    <Box>
                      <Box>
                        <InputTextField
                          title="Mật Khẩu"
                          type="password"
                          name="password"
                          variant="standard"
                          className="w-full"
                          inputRef={register("password")}
                          errorMessage={errors.password?.message}
                        />
                      </Box>
                      <Box className="text-end">
                        <Link
                          className="cursor-pointer !text-gray-400 !text-sm/4"
                          onClick={handleRedirectForgot}
                          underline="hover"
                        >
                          Forgot Password?
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                  {isError && (
                    <Box className="border-2 border-red-200 rounded-sm py-2 px-3 flex gap-3 items-center">
                      <CancelIcon className="text-[#af1c10]" />
                      <Typography className="text-[#af1c10] font-medium text-xs/[140%]">
                        Vui lòng nhập đúng Email/Password
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Remember me"
                      className="text-gray-400"
                    />
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      className="w-full !py-3"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
