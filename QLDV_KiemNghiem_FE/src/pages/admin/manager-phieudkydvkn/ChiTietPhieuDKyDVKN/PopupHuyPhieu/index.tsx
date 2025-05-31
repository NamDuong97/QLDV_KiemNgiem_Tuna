import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "../../../../../configs/yup.custom";
import { Textarea } from "../../../../../components/Textarea";
import { FormLyDoHuy } from "../../../../../models/LydoHuy";

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
  } = useForm<FormLyDoHuy>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleHuyPhieu = (data: FormLyDoHuy) => {
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
            key="PopupHuyPhieu"
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
              <Box className="">
                <button className="font-bold text-center text-white bg-[#0099f8] border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-blue-500 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full">
                  Gửi
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
