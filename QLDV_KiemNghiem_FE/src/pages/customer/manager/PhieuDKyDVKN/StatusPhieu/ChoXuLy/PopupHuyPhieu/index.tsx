import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Textarea } from "../../../../../../../components/Textarea";
import { useEffect, useMemo } from "react";
import yup from "../../../../../../../configs/yup.custom";
import { FormLyDoHuyPhieuDkyDVKN } from "../../../../../../../models/LydoHuy";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  handleClose?: () => void;
  listCheckbox?: any;
}

const PopupHuyPhieu = (props: Props) => {
  const { open, handleClose, listCheckbox } = props;

  let schema = useMemo(() => {
    return yup.object().shape({
      lydo: yup.string().required("Yêu cầu nhập lý do hủy"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormLyDoHuyPhieuDkyDVKN>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleHuyPhieu = (data: FormLyDoHuyPhieuDkyDVKN) => {
    console.log("handleHuyPhieu", data);
  };

  useEffect(() => {
    reset({
      lydo: "",
    });
  }, []);

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
        <Box className="w-auto md:w-[600px]">
          <form className="grid gap-2">
            <Box className="px-5 py-3 text-center border-b border-gray-300 flex justify-between">
              <h1 className="ml-10 flex-1 font-bold text-2xl">Lý Do Hủy</h1>
              <button
                className="bg-gray-400 rounded-full p-[6px] hover:bg-gray-500 cursor-pointer"
                onClick={handleClose}
              >
                <IoMdClose className="w-6 h-6 text-gray-300" />
              </button>
            </Box>
            <Box className="px-5 pb-6">
              <Textarea
                title={`Lý do hủy phiếu(${listCheckbox?.soDkpt}):`}
                placeholder="Nhập lý do hủy phiếu"
                name="lydo"
                inputRef={register("lydo")}
                errorMessage={errors.lydo?.message}
                className="max-h-[149px] min-h-[149px]"
                height="h-[213px]"
              />
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
                  onClick={handleSubmit(handleHuyPhieu)}
                  className="font-bold text-center text-white bg-[#0099f8] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-blue-500 cursor-pointer"
                >
                  Chắc chắn
                </button>
              </Box>
            </Box>
          </form>
        </Box>
      </motion.div>
    </Dialog>
  );
};

export default PopupHuyPhieu;
