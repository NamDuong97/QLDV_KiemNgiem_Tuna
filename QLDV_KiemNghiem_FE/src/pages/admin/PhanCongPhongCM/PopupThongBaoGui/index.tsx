import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const PopupThongBaoGui = (props: Props) => {
  const { open, handleClose } = props;

  const navigate = useNavigate();

  // const handleRedirectHome = () => {
  //   sessionStorage.removeItem("phan-cong-PCM");
  //   navigate(
  //     APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
  //   );
  // };

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
      <Box className=" px-7 py-6 w-auto md:w-[785px] bg-[#F2F2F2]">
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
                <CheckCircleIcon className="!w-20 !h-20 text-green-600" />
              </Box>
              <Box className="grid gap-1">
                <p className="text-lg/6 font-medium text-center text-cyan-900">
                  Đã phân công cho phòng ban chuyên môn thành công, vui lòng
                  theo dõi tại giao diện quản lý phân công phòng chuyên môn
                </p>
              </Box>
              <Box className="grid sm:flex gap-6 sm:justify-center">
                <button
                  className="font-bold capitalize text-center text-white border-[2px] border-solid border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-cyan-700 px-5 py-2 rounded-md hover:bg-cyan-600 cursor-pointer"
                  onClick={() =>
                    navigate(
                      APP_ROUTES.TUNA_ADMIN
                        .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                    )
                  }
                >
                  Quản lý phiếu phân công Khoa
                </button>
                <button
                  className="font-bold capitalize text-center text-white bg-orange-400 border-[2px] border-solid border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-5 py-2 rounded-md hover:bg-orange-500 cursor-pointer"
                  onClick={() =>
                    navigate(
                      APP_ROUTES.TUNA_ADMIN
                        .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                    )
                  }
                >
                  Quản lý phiếu đăng ký kiểm nghiệm
                </button>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Dialog>
  );
};

export default PopupThongBaoGui;
