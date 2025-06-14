import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../constants/routers";

interface Props {
  open: boolean;
  handleClose?: () => void;
}

const PopupThongBao = (props: Props) => {
  const { open, handleClose } = props;

  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="PopupThongBao"
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
          <Box className="px-7 py-6 w-auto md:w-[600px]">
            <Box className="grid gap-6">
              <Box className="text-center">
                <Box className="grid gap-2">
                  <div className="flex justify-center">
                    <IoMdNotifications className="w-[70px] h-[70px] text-yellow-400" />
                  </div>
                  <p className="text-cyan-900 font-bold text-3xl/6">
                    Thông báo
                  </p>
                </Box>
              </Box>
              <Box className="text-center">
                <p className="text-xl/6 font-medium text-cyan-950">
                  Lorem ipsum is a dummy text used to replace text in some areas
                  just for the purpose of an example.
                </p>
              </Box>
              <Box className="flex justify-center gap-6">
                <button
                  onClick={handleClose}
                  className="w-full font-bold text-center capitalize text-white bg-cyan-600 border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-cyan-500 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                  tắt thông báo
                </button>
                <button
                  onClick={() =>
                    navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to)
                  }
                  className="w-full font-bold text-center capitalize text-white bg-[#0099f8] border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-blue-500 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
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

export default PopupThongBao;
