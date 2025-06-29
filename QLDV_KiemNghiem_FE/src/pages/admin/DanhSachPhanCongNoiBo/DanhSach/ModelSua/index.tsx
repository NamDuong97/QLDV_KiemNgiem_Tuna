import { Dialog } from "@mui/material";
import {
  queryPhanCongNoiBoByID,
  queryUpdatePhanCongNoiBo,
} from "../../../../../hooks/personnels/queryPhanCongNoiBo";
import yup from "../../../../../configs/yup.custom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { queryClient } from "../../../../../lib/reactQuery";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
}

interface FormValues {
  thoiGianPhanCong: Date;
  thoiGianTraKetQua: Date;
  ghiChu: string;
}

const ModelSua = (props: Props) => {
  const { open, handleClose, dataID } = props;
  const { data } = queryPhanCongNoiBoByID({
    queryKey: "queryPhanCongNoiBoByIDSua",
    params: dataID,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schema = yup.object({
    thoiGianPhanCong: yup
      .date()
      .typeError("Vui lòng chọn thời gian phân công")
      .required("Vui lòng chọn thời gian phân công"),
    thoiGianTraKetQua: yup
      .date()
      .typeError("Vui lòng chọn thời gian trả kết quả")
      .required("Vui lòng chọn thời gian trả kết quả")
      .min(today, "Thời gian trả kết quả phải tính từ hôm nay trở đi")
      .test(
        "is-after-phancong",
        "Thời gian trả kết quả phải sau thời gian phân công",
        function (value) {
          const { thoiGianPhanCong } = this.parent;
          if (!value || !thoiGianPhanCong) return true;
          return new Date(value) > new Date(thoiGianPhanCong);
        }
      ),
    ghiChu: yup
      .string()
      .required("Vui lòng nhập ghi chú")
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
      thoiGianPhanCong: undefined,
      thoiGianTraKetQua: undefined,
      ghiChu: "",
    },
  });

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await queryClient.refetchQueries({
        queryKey: ["queryPhanCongNoiBoAll"],
      });
      handleClose();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = queryUpdatePhanCongNoiBo({
    queryKey: "UpdatePhanCongNoiBo",
    onSuccess: (data: any) => {
      if (data.status === 200) {
        showNotification({
          message: "Sửa thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Sửa thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Sửa thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const onSubmit = (values: FormValues) => {
    const params = {
      maId: dataID,
      lamTu: values.thoiGianPhanCong,
      ngayTraKetQua: values.thoiGianTraKetQua,
      ghiChu: values.ghiChu,
    };
    mutate(params);
  };

  useEffect(() => {
    if (data) {
      reset({
        thoiGianPhanCong: data?.lamTu?.substring(0, 10) || "",
        thoiGianTraKetQua: data?.ngayTraKetQua?.substring(0, 10) || "",
        ghiChu: data?.ghiChu || "",
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
              Sửa phân công mẫu {data?.tenMau}
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
              Thời gian phân công *
            </label>
            <input
              type="date"
              {...register("thoiGianPhanCong")}
              className="w-full py-1 px-4 border border-gray-300 rounded"
            />
            {errors.thoiGianPhanCong && (
              <p className="text-xs text-red-600">
                {errors.thoiGianPhanCong.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Thời gian trả kết quả *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                {...register("thoiGianTraKetQua")}
                className="w-full py-1 px-4 border border-gray-300 rounded"
              />
            </div>
            {errors.thoiGianTraKetQua && (
              <p className="text-xs text-red-600">
                {errors.thoiGianTraKetQua.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Ghi chú *
            </label>
            <div className="flex items-center gap-2">
              <textarea
                {...register("ghiChu")}
                className="w-full border p-2 max-h-32 min-h-32 border-gray-300 rounded"
              />
            </div>
            {errors.ghiChu && (
              <p className="text-xs text-red-600">{errors.ghiChu.message}</p>
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

export default ModelSua;
