import { Snackbar } from "@mui/material";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { useStoreNotification } from "../../configs/stores/useStoreNotification";

const HandleSnackbar = () => {
  const { message, status, open, hideNotification } = useStoreNotification();

  return (
    <>
      {status === 200 ? (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={5000}
          onClose={hideNotification}
          message={
            <div className="text-cyan-800 flex justify-between items-center">
              <p className="text-base/6 font-medium flex gap-2 items-center">
                <RiErrorWarningLine className="w-6 h-6" />
                {message}
              </p>
              <button
                className="cursor-pointer hover:bg-gray-200 rounded-full"
                onClick={hideNotification}
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
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={5000}
          onClose={hideNotification}
          message={
            <div className="text-red-600 flex justify-between items-center">
              <p className="text-base/6 font-medium flex gap-2 items-center">
                <RiErrorWarningLine className="w-6 h-6" />
                {message}
              </p>
              <button
                className="cursor-pointer hover:bg-gray-200 rounded-full"
                onClick={hideNotification}
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
