import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./style.module.scss";
import { queryNhanVienALL } from "../../../../../hooks/personnels/queryNhanVien";
import { usePersonnel } from "../../../../../contexts/PersonelsProvider";
import { ListColors } from "../../../../../constants/colors";
import {
  queryPhanCongLai,
  queryPhanCongNoiBoByID,
} from "../../../../../hooks/personnels/queryPhanCongNoiBo";
import yup from "../../../../../configs/yup.custom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { queryClient } from "../../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import {
  formatDate,
  formatDateNotTime2,
} from "../../../../../configs/configAll";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
}

interface FormValues {
  manvXyLy?: string | undefined;
  nvCuLamToi: Date;
  nvMoiLamTu: Date;
  ghiChu: string;
  lyDo: string;
}

const ModelPhanCongLai = (props: Props) => {
  const { open, handleClose, dataID } = props;
  const { personnelInfo } = usePersonnel();
  const [NhanVienID, setNhanVienID] = useState("");
  const { data } = queryPhanCongNoiBoByID({
    queryKey: "ModelPhanCongLai",
    params: dataID,
  });
  const { data: employees } = queryNhanVienALL({
    queryKey: "NhanVienAll",
    params: { getAll: true, maKhoa: personnelInfo?.maKhoa },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schema = yup.object({
    manvXyLy: yup
      .string()
      .test(
        "required-when-nhanvienid",
        "Vui lòng chọn nhân viên xử lý",
        function (value) {
          if (NhanVienID) {
            return true;
          } else return !!value;
        }
      ),
    nvCuLamToi: yup
      .date()
      .typeError("Vui lòng chọn thời gian nhân viên cũ làm tới")
      .required("Vui lòng chọn thời gian nhân viên cũ làm tới")
      .min(today, "Ngày bắt đầu phải tính từ hôm nay trở đi"),

    nvMoiLamTu: yup
      .date()
      .typeError("Vui lòng chọn thời gian nhân viên mới làm từ")
      .required("Vui lòng chọn thời gian nhân viên mới làm từ")
      .test(
        "is-after-nvCu",
        "Nhân viên mới bắt đầu phải từ ngày nhân viên cũ kết thúc trở đi",
        function (value) {
          const { nvCuLamToi } = this.parent;
          if (!value || !nvCuLamToi) return true;
          return new Date(value) >= new Date(nvCuLamToi);
        }
      ),
    ghiChu: yup.string().required("Vui lòng nhập ghi chú"),
    lyDo: yup.string().required("Vui lòng nhập lý do phân công lại"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      nvMoiLamTu: undefined,
      nvCuLamToi: undefined,
      ghiChu: "",
      lyDo: "",
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

  const { mutate } = queryPhanCongLai({
    queryKey: "queryPhanCongLai",
    onSuccess: (data: any) => {
      if (data.status === 200) {
        showNotification({
          message: "Phân công lại thành công",
          status: 200,
        });
        return;
      } else {
        console.log("data", data);

        showNotification({
          message: data?.response?.data,
          status: data?.response?.status || 400,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Phân công lại thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const onSubmit = (values: FormValues) => {
    const params = {
      maId: data?.maId,
      manvPhanCong: personnelInfo?.maId,
      tennvPhanCong: personnelInfo?.hoTen,
      manvXyLy: NhanVienID,
      tennvXuLy: employees?.find((item: any) => item.maId === NhanVienID)
        ?.hoTen,
      nvCuLamToi: values?.nvCuLamToi,
      nvMoiLamTu: values?.nvMoiLamTu,
      ghiChu: values?.ghiChu,
      lyDoPhanCongLai: values?.lyDo,
    };
    mutate(params);
  };

  useEffect(() => {
    reset({
      ghiChu: "",
      lyDo: "",
      nvCuLamToi: undefined,
      nvMoiLamTu: undefined,
    });
    setNhanVienID("");
  }, [open, data, reset]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
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
              Phân công lại mẫu {data?.tenMau}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn nhân viên phân công
            </label>
            <div
              className={clsx(
                "space-y-2 max-h-40 overflow-y-auto pr-1",
                classes.scrollbar_thin
              )}
            >
              {employees?.length > 0 ? (
                employees
                  ?.filter((item: any) => item.maId !== data?.manvXyLy)
                  ?.map((employee: any, index: any) => {
                    const avatarColor = ListColors[index % ListColors.length];

                    return (
                      <div
                        key={index}
                        className={clsx(
                          "flex items-center p-3 hover:bg-gray-50 rounded-xl cursor-pointer",
                          {
                            "border-indigo-200 border bg-indigo-50":
                              employee?.maId === NhanVienID,
                          }
                        )}
                        onClick={() => setNhanVienID(employee?.maId)}
                      >
                        <div
                          className={`avatar w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-medium`}
                        >
                          {employee.hoTen.trim().split(" ").pop()}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {employee.hoTen}
                          </p>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                  Không tìm thấy nhân viên phù hợp với dịch vụ kiểm nghiệm này
                </div>
              )}
            </div>
            {errors.manvXyLy && (
              <p className="text-xs text-red-600 mt-1">
                {errors.manvXyLy.message}
              </p>
            )}
          </div>

          <div className="flex gap-10">
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Thời gian nhân viên cũ làm tới *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  {...register("nvCuLamToi")}
                  className="w-full py-1 px-4 border border-gray-300 rounded"
                />
              </div>
              {errors.nvCuLamToi && (
                <p className="text-xs text-red-600">
                  {errors.nvCuLamToi.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Thời gian nhân viên mới làm từ *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  {...register("nvMoiLamTu")}
                  className="w-full py-1 px-4 border border-gray-300 rounded"
                />
              </div>
              {errors.nvMoiLamTu && (
                <p className="text-xs text-red-600">
                  {errors.nvMoiLamTu.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Ghi chú *
            </label>
            <div className="flex items-center gap-2">
              <textarea
                {...register("ghiChu")}
                className="w-full border p-2 max-h-20 min-h-20 border-gray-300 rounded"
              />
            </div>
            {errors.ghiChu && (
              <p className="text-xs text-red-600">{errors.ghiChu.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Lý do phân công lại *
            </label>
            <div className="flex items-center gap-2">
              <textarea
                {...register("lyDo")}
                className="w-full border p-2 max-h-20 min-h-20 border-gray-300 rounded"
              />
            </div>
            {errors.lyDo && (
              <p className="text-xs text-red-600">{errors.lyDo.message}</p>
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

export default ModelPhanCongLai;
