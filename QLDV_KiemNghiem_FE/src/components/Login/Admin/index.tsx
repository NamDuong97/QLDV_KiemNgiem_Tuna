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

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const router = useNavigate();

  const [isError, setIsError] = useState(false);

  let schema = useMemo(() => {
    return yup.object().shape({
      email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address"),
      password: yup.string().required("Password is required"),
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
    if (data.email === "admin123@gmail.com" && data.password === "123")
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
      email: "",
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
                      <Inputs
                        type="email"
                        name="email"
                        inputRef={register("email")}
                        errorMessage={errors.email?.message}
                        placeholder="Enter your email/username"
                        readOnly
                        onFocus={(e) => e.target.removeAttribute("readOnly")}
                      />
                    </Box>
                    <Box>
                      <Box>
                        <Inputs
                          type="password"
                          name="password"
                          inputRef={register("password")}
                          errorMessage={errors.password?.message}
                          placeholder="Enter your password"
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
