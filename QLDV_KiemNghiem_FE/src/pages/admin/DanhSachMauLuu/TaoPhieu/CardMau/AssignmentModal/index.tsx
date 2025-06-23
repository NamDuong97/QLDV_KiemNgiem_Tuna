import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatDateNotTime } from "../../../../../../configs/configAll";

interface Props {
  samples: any[];
  isOpen: boolean;
  onClose: () => void;
  selectedSamples: any; // mảng mẫu
}

interface FormTaoPhieu {
  soLuong: number;
  donViTinh: string;
  thoiGianLuu: Date;
  luuDenNgay: Date;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object().shape({
  soLuong: yup
    .number()
    .required("Vui lòng nhập số lượng")
    .min(1, "Số lượng phải lớn hơn 0"),
  donViTinh: yup.string().required("Vui lòng nhập đơn vị tính"),
  thoiGianLuu: yup
    .date()
    .typeError("Vui lòng chọn thời gian lưu")
    .required("Vui lòng chọn thời gian lưu")
    .min(today, "Thời gian lưu phải từ hôm nay trở đi"),
  luuDenNgay: yup
    .date()
    .typeError("Vui lòng chọn ngày lưu đến")
    .required("Vui lòng chọn ngày lưu đến")
    .min(yup.ref("thoiGianLuu"), "Ngày lưu đến phải sau thời gian lưu"),
});

const AssignmentModal = (props: Props) => {
  const { isOpen, onClose, selectedSamples } = props;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTaoPhieu>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        soLuong: 0,
        donViTinh: "",
        thoiGianLuu: undefined,
        luuDenNgay: undefined,
      });
    }
  }, [isOpen]);

  const handleAssignSubmit = (data: FormTaoPhieu) => {
    const dataTao = {
      tenMau: selectedSamples?.name,
      soLuong: data.soLuong,
      donViTinh: data.donViTinh,
      thoiGianLuu: formatDateNotTime(data.thoiGianLuu),
      luuDenNgay: formatDateNotTime(data.luuDenNgay),
    };

    console.log("Submitted data:", dataTao);

    // onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md">
      <form
        onSubmit={handleSubmit(handleAssignSubmit)}
        className="bg-white rounded-lg shadow-xl w-lg"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Tạo phiếu lưu mẫu</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Tên mẫu đã chọn
            </label>
            <p className="text-sm text-green-600"></p>
            <p
              className={`inline-block px-2 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800`}
            >
              {selectedSamples?.name}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Số lượng *
            </label>
            <input
              type="number"
              {...register("soLuong")}
              className="w-full py-1 px-4 border border-gray-300 rounded"
            />
            {errors.soLuong && (
              <p className="text-xs text-red-600">{errors.soLuong.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Đơn vị tính *
            </label>
            <input
              type="text"
              {...register("donViTinh")}
              className="w-full py-1 px-4 border border-gray-300 rounded"
            />
            {errors.donViTinh && (
              <p className="text-xs text-red-600">{errors.donViTinh.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Thời gian lưu mẫu *
            </label>
            <input
              type="date"
              {...register("thoiGianLuu")}
              className="w-full py-1 px-4 border border-gray-300 rounded"
            />
            {errors.thoiGianLuu && (
              <p className="text-xs text-red-600">
                {errors.thoiGianLuu.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Lưu đến ngày *
            </label>
            <input
              type="date"
              {...register("luuDenNgay")}
              className="w-full py-1 px-4 border border-gray-300 rounded"
            />
            {errors.luuDenNgay && (
              <p className="text-xs text-red-600">
                {errors.luuDenNgay.message}
              </p>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-700`}
          >
            Tạo phiếu
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AssignmentModal;
