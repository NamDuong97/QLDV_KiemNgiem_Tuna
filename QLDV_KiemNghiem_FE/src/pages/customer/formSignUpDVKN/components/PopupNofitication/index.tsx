import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../constants/routers";

interface Props {
  openPopupNofitication: boolean;
  handleClosePopupNofitication?: () => void;
}

const PopupNofitication = (props: Props) => {
  const { openPopupNofitication, handleClosePopupNofitication } = props;

  const navigate = useNavigate();

  const handleRedirectManagerPhieuDKy = () => {
    navigate(APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to);
  };

  const handleCloseNofitication = () => {
    handleClosePopupNofitication?.();
  };

  return (
    <Dialog
      open={openPopupNofitication}
      maxWidth="lg"
      onClose={handleCloseNofitication}
    >
      <Box className="!relative px-7 py-6 w-auto md:w-[785px]">
        <Box className="!absolute top-2 right-5">
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
              <Box className="py-2 text-center">
                <h1 className="font-bold text-3xl">Thông Báo</h1>
              </Box>
              <Box className="grid gap-1">
                <p className="text-base/6 font-medium text-center">
                  Yêu cầu kiểm nghiệm đã được gửi thành công. Bộ phận chuyên
                  trách sẽ tiếp nhận và phản hồi đến Quý khách trong thời gian
                  sớm nhất. Để theo dõi trạng thái phiếu đăng ký bạn theo dõi
                  mục quản lý phiếu đăng ký, quản lý hóa đơn!
                </p>
              </Box>
              <Box className="grid sm:flex gap-6 sm:justify-center">
                <button
                  className="font-bold text-center text-white bg-[#00c9a7] px-4 py-1 lg:px-10 lg:py-2 rounded-md hover:bg-[#23ad96] cursor-pointer"
                  onClick={() => navigate(APP_ROUTES.TUNA_CUSTOMER.HOME.to)}
                >
                  Trang Chủ
                </button>
                <button
                  className="font-bold text-center text-white bg-[#f8cf00] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-[#cfb220] cursor-pointer"
                  onClick={handleRedirectManagerPhieuDKy}
                >
                  Quay về Trang Quản lý Đăng ký dịch vụ kiểm nghiệm
                </button>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Dialog>
  );
};

export default PopupNofitication;
