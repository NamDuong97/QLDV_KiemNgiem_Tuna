import { Box, Dialog } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../constants/routers";
import { IoWarningOutline } from "react-icons/io5";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const PopupThoatForm = (props: Props) => {
  const { open, handleClose } = props;

  const navigate = useNavigate();

  const handleRedirectHome = () => {
    sessionStorage.removeItem("PhieuDangKy");
    navigate(APP_ROUTES.TUNA_CUSTOMER.HOME.to);
  };
  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={handleClose}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 3,
        },
      }}
    >
      <Box className="px-7 py-6 w-auto md:w-[550px] bg-[#F2F2F2]">
        <motion.div
          key="PopupThoatForm"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box className="grid gap-6">
            <Box className="py-2 flex justify-center">
              <IoWarningOutline className="w-12 h-12 text-[#FFAB40]" />
            </Box>
            <Box className="grid gap-1">
              <p className="text-lg/6 font-medium text-center text-[#424242]">
                Nếu bạn thoát thông tin trong form sẽ bị xóa toàn bộ.
              </p>
            </Box>
            <Box className="grid sm:flex gap-6 sm:justify-center">
              <button
                className="font-bold capitalize text-center text-white bg-[#26A69A] px-5 py-2 rounded-md hover:bg-[#4DB6AC] cursor-pointer"
                onClick={handleClose}
              >
                Tắt Thông Báo
              </button>
              <button
                className="font-bold text-center text-white bg-[#FFCA28] px-14 py-2 rounded-md hover:bg-[#FBC02D] cursor-pointer"
                onClick={handleRedirectHome}
              >
                Thoát
              </button>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Dialog>
  );
};

export default PopupThoatForm;
