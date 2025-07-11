import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useQueryHoaDonThuByID,
  useUpdateHoaDonThu,
} from "../../../../../hooks/personnels/queryHoaDonThu";
import yup from "../../../../../configs/yup.custom";
import { queryClient } from "../../../../../lib/reactQuery";
import { Dialog } from "@mui/material";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";

interface Props {
  resultId: any;
  onCancel: () => void;
  open: boolean;
  idHoaDonThu: any;
}

const ModelEditDetailHDThu = (props: Props) => {
  const { resultId, open, onCancel, idHoaDonThu } = props;
  // const { data } = useQueryHoaDonThuByID({
  //   queryKey: "useQueryHoaDonBoSungByID",
  //   maHoaDonThu: resultId,
  // });
  console.log("resultId", resultId);

  const schema = yup.object({
    ghiChu: yup.string().nullable(),
    thanhTien: yup
      .number()
      .typeError("Vui lòng nhập thành tiền")
      .required("Vui lòng nhập thành tiền")
      .min(0, "Số lượng nhập phải lớn hơn 0"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ghiChu: "",
      thanhTien: 0,
    },
    mode: "onChange",
  });

  const handleCloseModel = () => {
    onCancel();
    reset();
  };

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await queryClient.refetchQueries({
        queryKey: ["useQueryHoaDonThuByID"],
      });
      reset();
      onCancel();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = useUpdateHoaDonThu({
    queryKey: "useUpdateHoaDonThu",
    onSuccess: (data: any) => {
      if (data.status === 200) {
        showNotification({
          message: "Cập nhật thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Cập nhật thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Cập nhật thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const handleSave = (formData: any) => {
    const params = {
      maID: idHoaDonThu,
      ghiChu: "",
      chiTietHoaDonThuDtos: [
        {
          maID: resultId,
          thanhTien: formData?.thanhTien,
          ghiChu: formData?.ghiChu,
          isDel: false,
        },
      ],
    };
    console.log("params", params);

    mutate(params);
  };

  useEffect(() => {
    if (data) {
      reset({
        ghiChu: data.ghiChu,
        thanhTien: data.thanhTien,
      });
    }
  }, [data, reset]);
  console.log("datadata", data);

  return (
    <Dialog
      open={open}
      onClose={handleCloseModel}
      maxWidth="sm"
      fullWidth
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Sửa chi tiết hóa đơn thu
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleSave)}
          className="flex flex-col gap-6 p-8"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thành tiền
            </label>
            <input
              type="number"
              {...register("thanhTien")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              placeholder="Nhập thành tiền..."
            />
            {errors.thanhTien?.message && (
              <p className="text-red-600 text-sm font-medium">
                {errors?.thanhTien?.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú
            </label>
            <textarea
              rows={3}
              {...register("ghiChu")}
              className="w-full px-4 py-2 border max-h-32 min-h-32 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              placeholder="Nhập ghi chú..."
            />
          </div>
          <div className="flex justify-center gap-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-white bg-yellow-600 cursor-pointer rounded-lg hover:bg-yellow-700 flex items-center space-x-2"
            >
              {/* <IoClose size={16} /> */}
              <span>Hủy phiếu</span>
            </button>
            <button
              onClick={handleSubmit(handleSave)}
              className="px-4 py-2 text-white bg-cyan-600 cursor-pointer rounded-lg hover:bg-cyan-700 flex items-center space-x-2"
            >
              {/* <Save size={16} /> */}
              <span>Lưu phiếu</span>
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ModelEditDetailHDThu;
