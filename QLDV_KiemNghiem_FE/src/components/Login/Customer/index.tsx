import { Box, Dialog } from "@mui/material";
import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";
import { useLocation } from "react-router";
import { APP_ROUTES } from "../../../constants/routers";
import { StoreContext } from "../../../contexts/storeProvider";

interface LoginCustomerProps {
  openLoginCustomer: boolean;
  handleCloseLoginCustomer: () => void;
}

const LoginCustomer = (props: LoginCustomerProps) => {
  const { openLoginCustomer, handleCloseLoginCustomer } = props;
  const { isLogin } = useContext(StoreContext);
  const [isSignUpLoginRepassword, setIsSignUpLoginRepassword] =
    useState("login");
  const pathName = useLocation().pathname;
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
            handleCloseLoginCustomer={handleCloseLoginCustomer}
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
        if (
          pathName === APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to &&
          !isLogin
        ) {
          return;
        }
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
          {pathName === APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to &&
          !isLogin ? null : (
            <button
              className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                handleCloseLoginCustomer();
                setIsSignUpLoginRepassword("login");
              }}
            >
              <IoMdClose className="w-4 h-4 text-gray-300" />
            </button>
          )}
        </Box>

        {handleForm()}
      </Box>
    </Dialog>
  );
};

export default LoginCustomer;
