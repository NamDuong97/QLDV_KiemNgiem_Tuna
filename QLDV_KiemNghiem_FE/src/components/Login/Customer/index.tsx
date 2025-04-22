import { Box, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "motion/react";

interface LoginCustomerProps {
  openLoginCustomer: boolean;
  handleCloseLoginCustomer: () => void;
}

const LoginCustomer = (props: LoginCustomerProps) => {
  const { openLoginCustomer, handleCloseLoginCustomer } = props;
  const [isBtnSignup, setIsBtnSignup] = useState(false);
  return (
    <Dialog
      open={openLoginCustomer}
      maxWidth={"lg"}
      onClose={() => {
        handleCloseLoginCustomer();
        setIsBtnSignup(false);
      }}
    >
      <Box className="relative px-7 py-6 w-auto sm:w-[458px]">
        <Box className="absolute top-2 right-5">
          <button
            className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
            onClick={() => {
              handleCloseLoginCustomer();
              setIsBtnSignup(false);
            }}
          >
            <IoMdClose className="w-6 h-6 text-gray-300" />
          </button>
        </Box>
        <AnimatePresence mode="wait">
          {isBtnSignup ? (
            <motion.div
              key="signup"
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Box className="grid gap-6">
                <Box className="text-center grid gap-4">
                  <h1 className="font-bold text-4xl">Đăng Ký</h1>
                  <p className="text-base/6 font-medium grid sm:block">
                    <span> Đã có tài khoản vui lòng đăng nhập? </span>
                    <span
                      className="font-bold text-blue-500 hover:underline cursor-pointer"
                      onClick={() => setIsBtnSignup(false)}
                    >
                      Đăng Nhập
                    </span>
                  </p>
                </Box>
                <Box className="grid gap-6">
                  <Box className="flex gap-10">
                    <TextField
                      label="Họ"
                      variant="standard"
                      className="w-full"
                    />
                    <TextField
                      label="Tên"
                      variant="standard"
                      className="w-full"
                    />
                  </Box>
                  <TextField
                    label="Tài khoản"
                    variant="standard"
                    className="w-full"
                  />
                  <TextField
                    label="Mật khẩu"
                    type="password"
                    variant="standard"
                    className="w-full"
                  />
                  <TextField
                    label="Xác nhận mật khẩu"
                    type="password"
                    variant="standard"
                    className="w-full"
                  />
                </Box>
                <Box>
                  <button className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">
                    Đăng ký
                  </button>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Box className="grid gap-6">
                <Box className="text-center grid gap-4">
                  <h1 className="font-bold text-4xl">Đăng nhập</h1>
                  <p className="text-base/6 font-medium">
                    Chưa có tài khoản vui lòng đăng ký?{" "}
                    <span
                      className="font-bold text-blue-500 hover:underline cursor-pointer"
                      onClick={() => setIsBtnSignup(true)}
                    >
                      Đăng ký
                    </span>
                  </p>
                </Box>
                <Box className="grid gap-6">
                  <TextField
                    label="Tài Khoản"
                    variant="standard"
                    className="w-full"
                  />
                  <Box>
                    <TextField
                      label="Mật Khẩu"
                      type="password"
                      variant="standard"
                      className="w-full"
                    />
                    <p className="text-end text-base/6 font-medium text-gray-500 hover:underline cursor-pointer">
                      Quên mật khẩu?
                    </p>
                  </Box>
                </Box>
                <Box>
                  <button className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">
                    Đăng nhập
                  </button>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Dialog>
  );
};

export default LoginCustomer;
