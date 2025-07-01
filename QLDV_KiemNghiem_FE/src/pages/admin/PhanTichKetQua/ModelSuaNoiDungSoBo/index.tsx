import { Dialog } from "@mui/material";
import yup from "../../../../configs/yup.custom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useStoreNotification } from "../../../../configs/stores/useStoreNotification";
import { queryClient } from "../../../../lib/reactQuery";
import {
  getPhanTichKetQuaByID,
  updatePhanTichKetQua,
} from "../../../../hooks/personnels/queryPTKQ";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
}

interface FormValues {
  noiDungDuyetSoBo: string;
}

const ModelSuaNoiDungSoBo = (props: Props) => {
  const { open, handleClose, dataID } = props;
  const { data } = getPhanTichKetQuaByID({
    queryKey: "getPhanTichKetQuaByID",
    params: dataID,
  });
  console.log("getPhanTichKetQuaByID", data, dataID);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schema = yup.object({
    noiDungDuyetSoBo: yup
      .string()
      .required("Vui lòng nhập nội dung duyệt sơ bộ")
      .max(500, "Ghi chú không được quá 500 ký tự"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      noiDungDuyetSoBo: "",
    },
  });

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["phanTichKetQuaChuaDuyet"],
        }),
        queryClient.refetchQueries({
          queryKey: ["PhanTichKetQuaListDaDuyet"],
        }),
      ]);
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = updatePhanTichKetQua({
    queryKey: "updatePhanTichKetQua",
    onSuccess: (data: any) => {
      console.log("Sửa phiếu phân tích thành công:", data);
      if (data.status === 200) {
        showNotification({
          message: "Sửa phiếu phân tích thành công",
          status: 200,
        });
        handleClose();
        return;
      } else {
        showNotification({
          message: "Sửa phiếu phân tích thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Sửa phiếu phân tích thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const onSubmit = (values: FormValues) => {
    const params2 = {
      maId: data?.maID,
      ghiChu: "",
      trangThai: 0,
      noiDungDuyetSoBo: values.noiDungDuyetSoBo,
      noiDungDuyetTongBo: "",
      chiTietPhanTichKetQuas: [],
    };
    mutate(params2);
  };

  useEffect(() => {
    if (data) {
      reset({
        noiDungDuyetSoBo: data?.noiDungDuyetSoBo || "",
      });
    }
  }, [data, reset]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Sửa nội dung duyệt sơ bộ mẫu {data?.tenMau}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nội dung duyệt sơ bộ *
            </label>
            <div className="flex items-center gap-2">
              <textarea
                {...register("noiDungDuyetSoBo")}
                className="w-full border p-2 max-h-32 min-h-32 border-gray-300 rounded"
              />
            </div>
            {errors.noiDungDuyetSoBo && (
              <p className="text-xs text-red-600">
                {errors.noiDungDuyetSoBo.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
              Lưu
            </button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default ModelSuaNoiDungSoBo;
