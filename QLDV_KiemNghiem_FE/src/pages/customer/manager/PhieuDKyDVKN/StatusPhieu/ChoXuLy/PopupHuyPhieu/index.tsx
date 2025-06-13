import { Box, Dialog } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useHuyPhieuDangKy } from "../../../../../../../hooks/customers/usePhieuDKyDVKN";
import { IoMdNotifications } from "react-icons/io";
import { Dispatch } from "react";
import { useStoreNotification } from "../../../../../../../configs/stores/useStoreNotification";

interface Props {
  open: boolean;
  handleClose?: () => void;
  listCheckbox?: any;
  setListCheckbox: Dispatch<any>;
}

const PopupHuyPhieu = (props: Props) => {
  const { open, handleClose, listCheckbox, setListCheckbox } = props;
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );
  const queryClient = useQueryClient();
  const handleOnSettled = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["dataChoTiepNhanXuLy"],
    });
    await queryClient.invalidateQueries({
      queryKey: ["dataDaHuy"],
    });
  };
  const { mutate } = useHuyPhieuDangKy({
    queryKey: "HuyPhieuDangKy",
    onSettled: handleOnSettled,
    onSuccess: (response) => {
      if (response.status === 200) {
        showNotification({
          message: "Hủy thành công",
          status: 200,
        });
      }
    },
    onError: (errors) => {
      if (errors) {
        showNotification({ message: "Hủy thất bại", status: 400 });
      }
    },
  });

  const handleHuyPhieu = () => {
    mutate(listCheckbox?.maId);
    setListCheckbox({});
    handleClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      sx={{
        ".MuiPaper-root": {
          borderRadius: "10px",
        },
      }}
    >
      <motion.div
        key="PopupHuyPhieu"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box className="w-auto md:w-[500px]">
          <Box className="grid gap-4">
            <Box className="px-5 pt-3 text-center grid gap-2">
              <div className="flex justify-center">
                <IoMdNotifications className="w-[70px] h-[70px] text-yellow-300" />
              </div>
              <h1 className="flex-1 font-bold text-3xl">Thông báo</h1>
            </Box>
            <Box className="px-5 pb-6 gap-6 grid">
              <Box className="text-center">
                <p className="text-xl/6 font-medium">
                  Bạn có chắc chắn hủy phiếu này không?
                </p>
              </Box>
              <Box className="grid sm:flex gap-6 sm:justify-center">
                <button
                  type="button"
                  onClick={handleClose}
                  className="font-bold text-center text-white bg-amber-500 px-4 py-1 lg:px-8 lg:py-2 rounded-md hover:bg-amber-400 cursor-pointer"
                >
                  Không
                </button>
                <button
                  type="button"
                  onClick={() => handleHuyPhieu()}
                  className="font-bold text-center text-white bg-cyan-700 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-cyan-500 cursor-pointer"
                >
                  Chắc chắn
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Dialog>
  );
};

export default PopupHuyPhieu;
