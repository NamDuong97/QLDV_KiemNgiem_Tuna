import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Inputs } from "../../../../components/Inputs";
import SelectComponent from "../../../../components/Select";
import { Textarea } from "../../../../components/Textarea";

interface Props {
  openPopupEditPKHC: boolean;
  handleClosePopupEditPKHC?: () => void;
}

const dataLoaiPKHC = [
  {
    name: "Item 1",
  },
  {
    name: "Item 2",
  },
  {
    name: "Item 3",
  },
];

const PopupEditPKHC = (props: Props) => {
  const { openPopupEditPKHC, handleClosePopupEditPKHC } = props;
  return (
    <Dialog
      open={openPopupEditPKHC}
      maxWidth="lg"
      onClose={handleClosePopupEditPKHC}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box className="relative px-7 py-6 w-auto md:w-[785px]">
        <Box className="absolute top-2 right-5">
          <button
            className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
            onClick={handleClosePopupEditPKHC}
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
                <h1 className="font-bold text-3xl">
                  Thông Tin Phụ Kiện Hóa Chất
                </h1>
              </Box>
              <Box className="grid gap-1">
                <Box className="grid sm:flex sm:gap-10">
                  <Inputs
                    title="Tên Phụ Liệu Hóa Chất"
                    className="h-[42px]"
                    placeholder="Nhập Tên Phụ Liệu Hóa Chất"
                  />
                  <Inputs
                    title="Số Lượng"
                    className="h-[42px]"
                    placeholder="Nhập Số Lượng"
                  />
                </Box>
                <Inputs
                  title="Đơn Vị Tính"
                  className="h-[42px]"
                  placeholder="Nhập Đơn Vị Tính"
                />
                <SelectComponent
                  title="Loại Phụ Liệu Hóa Chất"
                  data={dataLoaiPKHC}
                  dataDefault="Vui Lòng Chọn Loại Phụ Liệu Hóa Chất"
                />
                <Textarea title="Ghi Chú" placeholder="Ghi Chú" />
              </Box>
              <Box>
                <button className="font-bold text-center w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">
                  Lưu
                </button>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Dialog>
  );
};

export default PopupEditPKHC;
