import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import yup from "../../../../../configs/yup.custom";
import { Dialog } from "@mui/material";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { queryClient } from "../../../../../lib/reactQuery";
import { mutationLDPHoanTraMau } from "../../../../../hooks/personnels/queryMau";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
}

const FormHuyMau = (props: Props) => {
  const { open, handleClose, dataID } = props;

  const schema = yup.object().shape({
    nhanXet: yup
      .string()
      .required("Vui lòng nhập lý do hủy mẫu")
      .min(5, "Lý do hủy mẫu ít nhất 5 ký tự"),
  });

  const handlePopupClose = () => {
    reset();
    handleClose();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await queryClient.refetchQueries({
        queryKey: ["DanhSachMau"],
      });
      handleClose();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = mutationLDPHoanTraMau({
    queryKey: "mutationLDPHoanTraMau",
    onSuccess: (data: any) => {
      console.log("Hoàn trả mẫu thành công:", data);
      if (data.status === 200) {
        showNotification({
          message: "Hoàn trả mẫu thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Hoàn trả mẫu thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Hoàn trả mẫu thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const handleNhanXet = (data: any) => {
    const params = {
      maMau: dataID,
      message: data.nhanXet,
    };
    mutate(params);
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Dialog
      open={open}
      onClose={handlePopupClose}
      maxWidth="sm"
      fullWidth
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <form
        onSubmit={handleSubmit(handleNhanXet)}
        className="p-4 border border-gray-300 bg-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full"
      >
        <h2 className="text-lg font-semibold mb-4">Xác nhận hủy mẫu</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Lý do hủy mẫu
          </label>
          <textarea
            {...register("nhanXet")}
            rows={4}
            className="w-full border border-gray-300 max-h-28 min-h-28 rounded-lg p-2 focus:outline-0 focus-within:outline-1 focus-within:ring-2 focus-within:ring-blue-500"
            placeholder="Nhập lý do hủy mẫu..."
          ></textarea>
          {errors.nhanXet && (
            <p className="text-red-600 text-sm mt-1">
              {errors.nhanXet.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handlePopupClose}
            className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi"}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default FormHuyMau;
