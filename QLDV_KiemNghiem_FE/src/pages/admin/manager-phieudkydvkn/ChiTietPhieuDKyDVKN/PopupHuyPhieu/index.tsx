import { Box, Dialog } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "../../../../../configs/yup.custom";
import { Textarea } from "../../../../../components/Textarea";
import { FormLyDoHuy } from "../../../../../models/LydoHuy";
import { MdOutlineFolderDelete } from "react-icons/md";
import { queryClient } from "../../../../../lib/reactQuery";
import {
  useDanhGiaBLD,
  useDanhGiaNhanVien,
} from "../../../../../hooks/personnels/quanLyPhieuDKKM";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../constants/routers";

interface Props {
  open: boolean;
  handleClose?: () => void;
  id: any;
  roll: any;
}

const PopupHuyPhieu = (props: Props) => {
  const { open, handleClose, id, roll } = props;

  const navigate = useNavigate();

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

  const handleOnSettled = async (response: any) => {
    await queryClient.refetchQueries({
      queryKey: ["quanLyPhieuDKKM"],
    });
    if (response.ketQua === true) {
      reset({ lydo: "" });
      navigate(
        APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
      );
    }
  };
  const { mutate: mutateBLD } = useDanhGiaBLD({
    queryKey: "useDanhGiaBLD",
    onSettled: handleOnSettled,
  });

  const { mutate: mutateNhanVien } = useDanhGiaNhanVien({
    queryKey: "DanhGiaNhanVienTuChoi",
    onSettled: handleOnSettled,
  });

  const handleHuyPhieu = (data: FormLyDoHuy) => {
    const params = {
      maPhieuDangKy: id,
      message: data.lydo,
      action: false,
    };
    if (roll === "roll") mutateNhanVien(params);
    mutateBLD(params);
  };
  const handleClosePopup = () => {
    reset({
      lydo: "",
    });
    handleClose?.();
  };
  useEffect(() => {
    reset({
      lydo: "",
    });
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <AnimatePresence mode="wait">
        <motion.div
          key="PopupHuyPhieu"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="px-7 py-6 w-auto md:w-[785px]"
        >
          <form onSubmit={handleSubmit(handleHuyPhieu)}>
            <Box className="text-center ">
              <div className="flex justify-center">
                <MdOutlineFolderDelete className="w-[70px] h-[70px] text-cyan-800" />
              </div>
              <h1 className="font-bold text-3xl text-cyan-900">Lý Do Hủy</h1>
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
              <Box className="flex justify-center gap-6">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="font-bold text-center text-white bg-yellow-500 border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-yellow-600 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full"
                >
                  Tắt
                </button>
                <button className="font-bold text-center text-white bg-cyan-600 border-[2px] border-solid border-gray-300 px-4 py-1 lg:px-6 lg:py-2 rounded-md hover:bg-cyan-700 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full">
                  Gửi
                </button>
              </Box>
            </Box>
          </form>
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
};

export default PopupHuyPhieu;
