import { Snackbar } from "@mui/material";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

interface Props {
  setIsSuccess: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      message: string;
      status: number;
    }>
  >;
  isSuccess: {
    open: boolean;
    message: string;
    status: number;
  };
}

const HandleSnackbar = (props: Props) => {
  const { setIsSuccess, isSuccess } = props;

  const handleClose = () => {
    setIsSuccess({
      open: false,
      message: "",
      status: 0,
    });
  };

  return (
    <>
      {isSuccess.status === 200 ? (
        <Snackbar
          open={isSuccess.open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={5000}
          onClose={handleClose}
          message={
            <div className="text-cyan-800 flex justify-between items-center">
              <p className="text-base/6 font-medium flex gap-2 items-center">
                <RiErrorWarningLine className="w-6 h-6" />
                {isSuccess.message}
              </p>
              <button
                className="cursor-pointer hover:bg-gray-200 rounded-full"
                onClick={handleClose}
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
          }
          sx={{
            ".MuiPaper-root": {
              backgroundColor: "white",
              border: "2px solid #007161",
            },
            ".MuiSnackbarContent-message": {
              width: "100%",
            },
          }}
        />
      ) : (
        <Snackbar
          open={isSuccess.open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={5000}
          onClose={handleClose}
          message={
            <div className="text-red-600 flex justify-between items-center">
              <p className="text-base/6 font-medium flex gap-2 items-center">
                <RiErrorWarningLine className="w-6 h-6" />
                {isSuccess.message}
              </p>
              <button
                className="cursor-pointer hover:bg-gray-200 rounded-full"
                onClick={handleClose}
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
          }
          sx={{
            ".MuiPaper-root": {
              backgroundColor: "white",
              border: "2px solid #ff0000de",
            },
            ".MuiSnackbarContent-message": {
              width: "100%",
            },
          }}
        />
      )}
    </>
  );
};

export default HandleSnackbar;
