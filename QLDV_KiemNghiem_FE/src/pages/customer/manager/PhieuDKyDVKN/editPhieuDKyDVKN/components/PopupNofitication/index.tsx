import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdatePhieuDangKy } from "../../../../../../../hooks/customers/usePhieuDKyDVKN";
import { IoMdNotifications } from "react-icons/io";
import { useStoreNotification } from "../../../../../../../configs/stores/useStoreNotification";

interface Props {
  openPopupNofitication: boolean;
  handleClosePopupNofitication?: () => void;
}

const PopupNofitication = (props: Props) => {
  const { openPopupNofitication, handleClosePopupNofitication } = props;

  // const navigate = useNavigate();
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const handleCloseNofitication = () => {
    handleClosePopupNofitication?.();
  };

  const dataSession = sessionStorage.getItem("sua-phieuDky");
  const data = dataSession ? JSON.parse(dataSession) : {};

  const queryClient = useQueryClient();
  const handleOnSettled = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["dataChoTiepNhanXuLy"],
    });
  };
  const { mutate } = useUpdatePhieuDangKy({
    queryKey: "UpdatePhieuDangKy",
    onSettled: handleOnSettled,
    onSuccess: (response) => {
      if (response.status === 200) {
        showNotification({
          message: "Cập nhật thành công",
          status: 200,
        });
      }
    },
    onError: (errors) => {
      if (errors) {
        showNotification({ message: "Cập nhật thất bại", status: 400 });
      }
    },
  });

  const handleRedirectManagerPhieuDKy = () => {
    console.log("adsa", data);

    mutate(data);
    // navigate(APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to);
    // sessionStorage.removeItem("sua-phieuDky");
  };
  return (
    <Dialog
      open={openPopupNofitication}
      maxWidth="lg"
      onClose={handleCloseNofitication}
    >
      <Box className="px-7 py-6 w-auto md:w-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key="signup"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box className="grid gap-6">
              <Box className="text-center grid gap-2">
                <div className="flex justify-center">
                  <IoMdNotifications className="w-16 h-16 text-yellow-300" />
                </div>
                <h1 className="font-bold text-3xl text-cyan-900">Thông Báo!</h1>
              </Box>
              <Box className="grid gap-1">
                <p className="text-lg/6 font-medium text-center">
                  Bạn có chắc chắn lưu thông tin vừa sửa ?
                </p>
              </Box>
              <Box className="grid sm:flex gap-6 sm:justify-center">
                <button
                  className="font-bold text-center text-white bg-[#00c9a7] px-4 py-1 lg:px-16 lg:py-2 rounded-md hover:bg-[#23ad96] cursor-pointer"
                  onClick={handleCloseNofitication}
                >
                  Hủy
                </button>
                <button
                  className="font-bold text-center text-white bg-[#f8cf00] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-[#cfb220] cursor-pointer"
                  onClick={handleRedirectManagerPhieuDKy}
                >
                  Chắc Chắn
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
