import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const PopupTuChoiPhongKHDT = (props: Props) => {
  const { open, handleClose } = props;

  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="PopupTuChoiPhongKHDT"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <Box className="!relative px-7 py-6 w-auto md:w-[785px]">
            <Box className="!absolute top-2 right-5">
              <button
                className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
                onClick={handleClose}
              >
                <IoMdClose className="w-6 h-6 text-gray-300" />
              </button>
            </Box>
            <Box className="grid gap-6">
              <Box className="py-2 text-center">
                <h1 className="font-bold text-3xl">Thông báo</h1>
              </Box>
              <Box className="text-center">
                <p className="text-xl/6 font-medium text-gray-800">
                  Lorem ipsum is a dummy text used to replace text in some areas
                  just for the purpose of an example.
                </p>
              </Box>
              <Box className="flex justify-center gap-6">
                <button
                  // onClick={() =>
                  //   navigate(
                  //     APP_ROUTES.TUNA_ADMIN
                  //       .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                  //   )
                  // }
                  className="font-bold text-center text-white bg-yellow-400 border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-yellow-500 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                  Chấp nhận đề xuất hủy
                </button>
                <button
                  // onClick={() =>
                  //   navigate(
                  //     APP_ROUTES.TUNA_ADMIN
                  //       .QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
                  //   )
                  // }
                  className="font-bold text-center text-white bg-[#0099f8] border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-blue-500 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                  Tiếp tục dịch vụ
                </button>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupTuChoiPhongKHDT;
