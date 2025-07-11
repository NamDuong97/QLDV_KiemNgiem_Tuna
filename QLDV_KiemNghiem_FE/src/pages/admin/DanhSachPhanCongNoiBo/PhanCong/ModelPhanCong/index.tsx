import { Dialog } from "@mui/material";
import { useState } from "react";
import clsx from "clsx";
import classes from "./style.module.scss";
import { queryMauByID } from "../../../../../hooks/personnels/queryMau";
import { queryNhanVienALL } from "../../../../../hooks/personnels/queryNhanVien";
import { ListColors } from "../../../../../constants/colors";
import yup from "../../../../../configs/yup.custom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { queryCreatePhanCongNoiBo } from "../../../../../hooks/personnels/queryPhanCongNoiBo";
import { queryClient } from "../../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { formatDateNotTime2 } from "../../../../../configs/configAll";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
  maKhoa: any;
  manv: string;
  hoTenNVPC: string;
}

interface FormPhanCong {
  manvXyLy?: string | undefined;
  lamTu: Date;
  ngayTraKetQua: Date;
  ghiChu: string;
}

const ModelPhanCong = (props: Props) => {
  const { open, handleClose, dataID, maKhoa, manv, hoTenNVPC } = props;

  const { data } = queryMauByID({
    queryKey: "mauByID",
    params: dataID,
  });
  const { data: employees } = queryNhanVienALL({
    queryKey: "NhanVienAll",
    params: { getAll: true, maKhoa: maKhoa },
  });
  const sample = data;
  const [NhanVienID, setNhanVienID] = useState("");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nhanVienSchema = yup.object().shape({
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
    lamTu: yup
      .date()
      .typeError("Vui lòng chọn ngày bắt đầu")
      .required("Vui lòng chọn ngày bắt đầu")
      .min(today, "Ngày bắt đầu phải tính từ hôm nay trở đi"),
    ngayTraKetQua: yup
      .date()
      .typeError("Vui lòng chọn ngày trả kết quả")
      .required("Vui lòng chọn ngày trả kết quả")
      .min(today, "Ngày trả kết quả phải tính từ hôm nay trở đi"),
    ghiChu: yup
      .string()
      .required("Vui lòng nhập ghi chú")
      .max(500, "Ghi chú không được quá 500 ký tự"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FormPhanCong>(nhanVienSchema),
    defaultValues: {
      manvXyLy: "",
      lamTu: undefined,
      ngayTraKetQua: undefined,
      ghiChu: "",
    },
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

  const { mutate } = queryCreatePhanCongNoiBo({
    queryKey: "createPhanCongNoiBo",
    onSuccess: (data: any) => {
      console.log("Phân công thành công:", data);
      if (data.status === 200) {
        showNotification({
          message: "Phân công thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Phân công thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Phân công thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const onSubmit = (data: FormPhanCong) => {
    const tennvXuLy =
      employees?.find((employee: any) => employee.maId === NhanVienID)?.hoTen ||
      "";
    const params = {
      maPdkMau: sample?.maId,
      tenMau: sample?.tenMau,
      manvPhanCong: manv,
      tennvPhanCong: hoTenNVPC,
      manvXyLy: data.manvXyLy || NhanVienID,
      tennvXuLy: tennvXuLy,
      lamTu: formatDateNotTime2(data.lamTu),
      ngayTraKetQua: formatDateNotTime2(data.ngayTraKetQua),
      ghiChu: data.ghiChu,
    };
    mutate(params);
  };

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
      <div className="bg-white">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Phân công mẫu({sample?.tenMau})
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Chọn nhân viên phân công
            </label>
            <div
              className={clsx(
                "space-y-2 max-h-40 overflow-y-auto pr-1",
                classes.scrollbar_thin
              )}
            >
              {employees?.length > 0 ? (
                employees?.map((employee: any, index: any) => {
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
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-base font-medium text-gray-700">
                Thời gian thực hiện *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  {...register("lamTu")}
                  className="w-full py-1 px-4 border border-gray-300 rounded"
                />
              </div>
              {errors.lamTu && (
                <p className="text-xs text-red-600">{errors.lamTu.message}</p>
              )}
            </div>
            <div>
              <label className="text-base font-medium text-gray-700">
                Thời gian trả kết quả *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  {...register("ngayTraKetQua")}
                  className="w-full py-1 px-4 border border-gray-300 rounded"
                />
              </div>
              {errors.ngayTraKetQua && (
                <p className="text-xs text-red-600">
                  {errors.ngayTraKetQua?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="text-base font-medium text-gray-700">
              Ghi chú *
            </label>
            <div className="flex items-center gap-2">
              <textarea
                {...register("ghiChu")}
                className="w-full border p-2 max-h-32 min-h-32 border-gray-300 rounded"
              />
            </div>
            {errors.ghiChu && (
              <p className="text-xs text-red-600">{errors.ghiChu?.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:bg-indigo-700 transition-colors cursor-pointer">
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ModelPhanCong;
