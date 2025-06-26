import { Dialog } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  formatDateNotTime,
  formatDateNotTime2,
} from "../../../../configs/configAll";
import { IoClose } from "react-icons/io5";
import { getMauLuuByID } from "../../../../hooks/personnels/queryMauLuu";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedSamples?: any; // mảng mẫu
}

interface FormTaoPhieu {
  soLuong: number;
  donViTinh: string;
  thoiGianLuu: string;
  luuDenNgay: string;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const SuaMauLuu = (props: Props) => {
  const { isOpen, onClose, selectedSamples } = props;
  const dataSession = sessionStorage.getItem("chi-tiet-mau-luu-sua");
  const id = dataSession ? JSON.parse(dataSession) : "";

  const { data } = getMauLuuByID({
    queryKey: "getMauLuuByID",
    params: id,
  });

  const schema = yup.object().shape({
    soLuong: yup
      .number()
      .required("Vui lòng nhập số lượng")
      .min(1, "Số lượng phải lớn hơn 0"),
    donViTinh: yup.string().required("Vui lòng nhập đơn vị tính"),
    thoiGianLuu: yup
      .string()
      .required("Vui lòng chọn thời gian lưu")
      .test(
        "is-valid-date",
        "Thời gian lưu phải từ ngày lưu trước đó trở đi",
        function (value) {
          if (!value) return false;
          const date: any = formatDateNotTime2(value);
          const thoiGianLuu: any = formatDateNotTime2(data?.thoiGianLuu);
          return date >= thoiGianLuu;
        }
      ),

    luuDenNgay: yup
      .string()
      .required("Vui lòng chọn ngày lưu đến")
      .test(
        "is-after-thoiGianLuu",
        "Ngày lưu đến phải sau thời gian lưu",
        function (value) {
          const { thoiGianLuu } = this.parent;
          if (!value || !thoiGianLuu) return false;
          return new Date(value) > new Date(thoiGianLuu);
        }
      ),
  });

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
      if (data) {
        reset({
          soLuong: data?.soLuong ?? 0,
          donViTinh: data?.donViTinh ?? "",
          thoiGianLuu: formatDateNotTime2(data?.thoiGianLuu) || undefined,
          luuDenNgay: formatDateNotTime2(data?.luuDenNgay) || undefined,
        });
      } else {
        reset({
          soLuong: 0,
          donViTinh: "",
          thoiGianLuu: undefined,
          luuDenNgay: undefined,
        });
      }
    }
  }, [isOpen, data]);

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
          <h3 className="text-lg font-bold text-gray-900">Sửa mẫu lưu</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 cursor-pointer p-1 hover:bg-gray-100"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="">
            <p className="text-sm font-medium text-gray-700">Tên mẫu đã chọn</p>
            <p
              className={`inline-block px-2 py-1 text-sm font-medium rounded-md bg-green-100 text-green-800`}
            >
              mẫu 001
            </p>
          </div>

          <div className="flex space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Nhân viên lưu
            </label>
            <p className="text-sm text-purple-600">Nguyễn Văn A</p>
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
            className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center cursor-pointer space-x-1 text-white bg-blue-600 hover:bg-blue-700`}
          >
            <span className="text-base/4">Lưu</span>
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default SuaMauLuu;
