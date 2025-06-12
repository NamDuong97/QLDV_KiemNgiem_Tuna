import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { IoWarningOutline } from "react-icons/io5";
import { APP_ROUTES } from "../../../../constants/routers";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const PopupThoatForm = (props: Props) => {
  const { open, handleClose } = props;

  const navigate = useNavigate();

  const handleRedirectHome = () => {
    sessionStorage.removeItem("phan-cong-PCM");
    navigate(
      APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
    );
  };
  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={handleClose}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <Box className=" px-7 py-6 w-auto md:w-[450px] bg-[#F2F2F2]">
        <AnimatePresence mode="wait">
          <motion.div
            key="signup"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box className="grid gap-6">
              <Box className="py-2 flex justify-center">
                <IoWarningOutline className="w-16 h-16 text-[#FFAB40]" />
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
        </AnimatePresence>
      </Box>
    </Dialog>
  );
};

export default PopupThoatForm;
