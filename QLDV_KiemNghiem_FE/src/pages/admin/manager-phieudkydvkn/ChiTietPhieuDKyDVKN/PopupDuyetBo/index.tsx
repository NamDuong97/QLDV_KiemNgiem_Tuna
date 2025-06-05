import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../constants/routers";
import { IoMdNotifications } from "react-icons/io";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const PopupDuyetBo = (props: Props) => {
  const { open, handleClose } = props;

  const navigate = useNavigate();
  const userName = "Ban lãnh đạo";
  const handleContentByName = () => {
    switch (userName as string) {
      case "Phòng Kế Hoạch và Đầu Tư":
        return "Sơ duyệt thành công, vui lòng đợi BLĐ phê duyệt!";
      case "Ban lãnh đạo":
        return "Phiếu đăng ký dịch vụ được được phê duyệt thành công!";
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="PopupDuyetBo"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="lg"
          sx={{
            ".MuiPaper-root": {
              borderRadius: 4,
            },
          }}
        >
          <Box className="grid gap-6 w-auto md:w-[550px]">
            <Box className="py-4 pt-6 text-center">
              <Box className="grid gap-2">
                <div className="flex justify-center">
                  <IoMdNotifications className="w-[70px] h-[70px]  text-yellow-400" />
                </div>
                <p className="text-gray-80 font-bold text-3xl/6">Thông báo</p>
              </Box>
            </Box>
            <Box className="text-center">
              <p className="text-xl/6 font-medium text-gray-800">
                {handleContentByName()}
              </p>
            </Box>
            <Box className="flex justify-center pb-6">
              <button
                onClick={() =>
                  navigate(
                    APP_ROUTES.TUNA_ADMIN
                      .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                  )
                }
                className="font-bold text-center text-white bg-[#0099f8] border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-blue-500 cursor-pointer hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              >
                Quay lại danh sách phiếu đăng ký kiểm nghiệm
              </button>
            </Box>
          </Box>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupDuyetBo;
