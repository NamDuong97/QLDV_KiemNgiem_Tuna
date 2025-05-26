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
}

const PopupHuyPhieu = (props: Props) => {
  const { open, handleClose } = props;

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
            <form
              className="grid gap-6"
              onSubmit={handleSubmit(handleHuyPhieu)}
            >
              <Box className="py-2 text-center">
                <h1 className="font-bold text-3xl">Lý Do Hủy</h1>
              </Box>
              <Box>
                <Textarea
                  title="Lý do:"
                  placeholder="Nhập lý do hủy phiếu"
                  name="lydo"
                  inputRef={register("lydo")}
                  errorMessage={errors.lydo?.message}
                  className="max-h-[149px] min-h-[149px]"
                  height="h-[213px]"
                />
              </Box>
              <Box className="grid sm:flex gap-6 sm:justify-center">
                <button
                  type="button"
                  className="font-bold text-center text-white bg-[#f8cf00] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-yellow-500 cursor-pointer"
                  onClick={handleClose}
                >
                  Hủy Xóa
                </button>
                <button className="font-bold text-center text-white bg-[#0099f8] px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-blue-500 cursor-pointer">
                  Chắc chắn
                </button>
              </Box>
            </form>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Dialog>
  );
};

export default PopupHuyPhieu;
