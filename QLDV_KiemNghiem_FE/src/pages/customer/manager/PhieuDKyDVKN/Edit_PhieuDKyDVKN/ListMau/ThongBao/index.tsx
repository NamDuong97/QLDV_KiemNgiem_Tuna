import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../../../constants/routers";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const ThongBao = (props: Props) => {
  const { open, handleClose } = props;

  const navigate = useNavigate();
  const url = useLocation().pathname;

  const handleRedirectListMau = () => {
    navigate(`${url}?tuna=danh-sach-phu-lieu-hoa-chat`);
  };

  const handleXacNhan = () => {
    navigate(
      `${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}?tuna=cho-xet-duyet`
    );
  };

  const handleCloseNofitication = () => {
    handleClose?.();
  };

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      onClose={handleCloseNofitication}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box className="relative px-7 py-6 w-auto md:w-[785px]">
        <Box className="absolute top-2 right-5">
          <button
            className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
            onClick={handleCloseNofitication}
          >
            <IoMdClose className="w-6 h-6 text-gray-300" />
          </button>
        </Box>
        <AnimatePresence mode="wait">
          <motion.div
            key="signup"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box className="grid gap-6">
              <Box className="py-2">
                <h1 className="font-bold text-3xl">Thông Báo</h1>
              </Box>
              <Box className="grid gap-1 px">
                <p className="text-lg/6 font-medium text-center">
                  Bạn có muốn tiếp tục sửa Danh sách Phù Liệu Hóa Chất Cung Cấp
                  hay Quay lại trang Quản lý Phiếu đăng ký dịch vụ?
                </p>
              </Box>
              <Box className="grid sm:flex gap-6 sm:justify-center">
                <button
                  type="button"
                  className="font-bold text-center text-white bg-[#f8cf00] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-yellow-500 cursor-pointer"
                  onClick={handleClose}
                >
                  Quay Lại
                </button>
                <button
                  type="button"
                  className="font-bold text-center text-white bg-[#0099f8] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-blue-500 cursor-pointer"
                  onClick={handleRedirectListMau}
                >
                  Tiếp tục
                </button>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Dialog>
  );
};

export default ThongBao;
