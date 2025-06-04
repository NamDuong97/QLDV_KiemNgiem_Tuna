import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../../../constants/routers";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdatePhieuDangKy } from "../../../../../../../hooks/customers/usePhieuDKyDVKN";
import { useState } from "react";
import HandleSnackbar from "../../../../../../../components/HandleSnackbar";

interface Props {
  openPopupNofitication: boolean;
  handleClosePopupNofitication?: () => void;
}

const PopupNofitication = (props: Props) => {
  const { openPopupNofitication, handleClosePopupNofitication } = props;

  const navigate = useNavigate();

  const handleCloseNofitication = () => {
    handleClosePopupNofitication?.();
  };

  const dataSession = sessionStorage.getItem("sua-phieuDky");
  const data = dataSession ? JSON.parse(dataSession) : {};
  const [isSuccess, setIsSuccess] = useState({
    open: false,
    message: "",
    status: 0,
  });

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
        setIsSuccess({
          open: true,
          message: "Cập nhật thành công",
          status: 200,
        });
      }
    },
    onError: (errors) => {
      if (errors) {
        setIsSuccess({ open: true, message: "Cập nhật thất bại", status: 400 });
      }
    },
  });
  console.log("datadata", data);

  const handleRedirectManagerPhieuDKy = () => {
    mutate(data);
    navigate(APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to);
    sessionStorage.removeItem("sua-phieuDky");
  };
  return (
    <Dialog
      open={openPopupNofitication}
      maxWidth="lg"
      onClose={handleCloseNofitication}
    >
      <Box className="!relative px-7 py-6 w-auto md:w-[785px]">
        <Box className="!absolute top-3 right-4">
          <button
            className="bg-gray-400 rounded-full p-[4px] hover:bg-gray-500 cursor-pointer"
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
      <HandleSnackbar isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
    </Dialog>
  );
};

export default PopupNofitication;
