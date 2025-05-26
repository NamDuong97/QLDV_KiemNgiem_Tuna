import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

interface Props {
  open: boolean;
  handleClose?: () => void;
  listCheckbox?: any[];
}

const PopupXoaPLHC = (props: Props) => {
  const { open, handleClose, listCheckbox } = props;

  const handleXoaPLHC = () => {
    // const data = tableBody.filter((item: any) => {
    //   return !listCheckbox.some(
    //     (subitem: any) => subitem.TenMau === item.TenMau
    //   );
    // });
    // const dataTest = sessionStorage.getItem("PhieuDangKy");
    // const dataPhieuDangky = dataTest ? JSON.parse(dataTest) : null;
    // const PhieuDangKy = {
    //   ...dataPhieuDangky,
    //   Mau: data,
    // };
    // sessionStorage.setItem("PhieuDangKy", JSON.stringify(PhieuDangKy));
    // settableBody(data);
    // setListCheckbox([]);
  };

  return (
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
                <p className="text-lg/6 font-medium text-center">
                  Bạn có chắc chắn xóa {listCheckbox?.length} Phù liệu hóa chất không?
                </p>
              </Box>
              <Box className="grid sm:flex gap-6 sm:justify-center">
                <button
                  type="button"
                  className="font-bold text-center text-white bg-[#f8cf00] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-yellow-500 cursor-pointer"
                  onClick={handleClose}
                >
                  Hủy Xóa
                </button>
                <button
                  type="button"
                  className="font-bold text-center text-white bg-[#0099f8] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-blue-500 cursor-pointer"
                  onClick={handleXoaPLHC}
                >
                  Chắc chắn
                </button>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Dialog>
  );
};

export default PopupXoaPLHC;
