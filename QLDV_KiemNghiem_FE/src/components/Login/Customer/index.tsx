import { Box, Dialog } from "@mui/material";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";

interface LoginCustomerProps {
  openLoginCustomer: boolean;
  handleCloseLoginCustomer: () => void;
}

const LoginCustomer = (props: LoginCustomerProps) => {
  const { openLoginCustomer, handleCloseLoginCustomer } = props;
  const [isSignUpLoginRepassword, setIsSignUpLoginRepassword] =
    useState("login");

  const handleForm = () => {
    switch (isSignUpLoginRepassword) {
      case "signup":
        return (
          <SignUpForm btnLogin={() => setIsSignUpLoginRepassword("login")} />
        );
      case "login":
        return (
          <LoginForm
            btnSignUp={() => setIsSignUpLoginRepassword("signup")}
            btnRepassword={() => setIsSignUpLoginRepassword("repassword")}
          />
        );
      case "repassword":
        return (
          <ForgotPassword
            btnLogin={() => setIsSignUpLoginRepassword("login")}
          />
        );
    }
  };

  return (
    <Dialog
      open={openLoginCustomer}
      maxWidth={"lg"}
      onClose={() => {
        handleCloseLoginCustomer();
        setIsSignUpLoginRepassword("login");
      }}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <Box className="!relative px-7 py-6 w-auto sm:w-[550px]">
        <Box className="!absolute top-4 right-4">
          <button
            className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
            onClick={() => {
              handleCloseLoginCustomer();
              setIsSignUpLoginRepassword("login");
            }}
          >
            <IoMdClose className="w-4 h-4 text-gray-300" />
          </button>
        </Box>

        {handleForm()}
      </Box>
    </Dialog>
  );
};

export default LoginCustomer;
