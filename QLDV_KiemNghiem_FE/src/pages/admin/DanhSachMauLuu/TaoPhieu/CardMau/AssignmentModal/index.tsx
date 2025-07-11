import { Dialog } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatDateNotTime2 } from "../../../../../../configs/configAll";
import { IoClose } from "react-icons/io5";
import { usePersonnel } from "../../../../../../contexts/PersonelsProvider";
import { createMauLuu } from "../../../../../../hooks/personnels/queryMauLuu";
import { useStoreNotification } from "../../../../../../configs/stores/useStoreNotification";
import { queryClient } from "../../../../../../lib/reactQuery";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import { DonViTinh } from "../../../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";

interface Props {
  samples: any[];
  isOpen: boolean;
  onClose: () => void;
  selectedSamples: any; // mảng mẫu
}

interface FormTaoPhieu {
  soLuong: number;
  donViTinh: string;
  luuDenNgay: Date;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const AssignmentModal = (props: Props) => {
  const { isOpen, onClose, selectedSamples } = props;
  const { personnelInfo } = usePersonnel();

  const schema = yup.object().shape({
    soLuong: yup
      .number()
      .typeError("Vui lòng nhập số lượng")
      .required("Vui lòng nhập số lượng")
      .min(1, "Số lượng phải lớn hơn 0")
      .test(
        "Số lượng nhập không được vượt quá số lượng hiện tại",
        `Số lượng nhập không được vượt quá số lượng hiện tại là ${selectedSamples?.soLuong} `,
        (value: any) => {
          console.log(
            "value",
            value,
            selectedSamples?.soLuong,
            Number(value),
            selectedSamples?.soLuong >= Number(value)
          );

          return selectedSamples?.soLuong >= Number(value) ? true : false;
        }
      ),
    donViTinh: yup.string().required("Vui lòng nhập đơn vị tính"),
    luuDenNgay: yup
      .date()
      .typeError("Vui lòng chọn ngày lưu đến")
      .required("Vui lòng chọn ngày lưu đến")
      .min(today, "Ngày lưu đến phải tính từ thời điểm hiện tại"),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormTaoPhieu>({
    resolver: yupResolver(schema),
  });

  const handleOnSettled = async (response: any) => {
    const { status } = response;
    if (status === 200) {
      await queryClient.refetchQueries({
        queryKey: ["queryMauLuuAll"],
      });
      return;
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = createMauLuu({
    queryKey: "createMauLuu",
    onSettled: handleOnSettled,
    onSuccess: (res: any) => {
      const { status } = res;
      if (status !== 200) {
        showNotification({
          message: "Tạo phiếu thất bại. Vui lòng thử lại.",
          status: status,
        });
        return;
      }
      showNotification({ message: "Tạo phiếu thành công", status: 200 });
      onClose();
    },
  });

  const handleAssignSubmit = (data: FormTaoPhieu) => {
    const dataTao = {
      tenMau: selectedSamples?.tenMau,
      maPdkMau: selectedSamples?.maId,
      soLuong: data.soLuong,
      donViTinh: data.donViTinh,
      luuDenNgay: formatDateNotTime2(data.luuDenNgay),
      hanSuDung: selectedSamples?.hanSuDung,
      manvLuu: personnelInfo?.maId,
    };

    console.log("Submitted data:", dataTao);
    mutate(dataTao);
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        soLuong: 0,
        donViTinh: "",
        luuDenNgay: undefined,
      });
    }
  }, [isOpen]);

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
            className="text-gray-400 hover:text-gray-500 p-1 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <IoClose className="w-5 h-5" />
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
              {selectedSamples?.tenMau}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Số lượng *
            </label>
            <input
              type="number"
              {...register("soLuong")}
              className="w-full py-2 px-4 border border-gray-300 rounded"
            />
            {errors.soLuong && (
              <p className="text-xs text-red-600 mt-2">{errors.soLuong.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Đơn vị tính *
            </label>
            <InputSelectDonViTinh
              name="donViTinh"
              placeholder="Nhập ĐVT"
              data={DonViTinh}
              control={control}
            />
            {errors.donViTinh && (
              <p className="text-xs text-red-600 mt-2">{errors.donViTinh.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Lưu đến ngày *
            </label>
            <input
              type="date"
              {...register("luuDenNgay")}
              className="w-full py-2 px-4 border border-gray-300 rounded"
            />
            {errors.luuDenNgay && (
              <p className="text-xs text-red-600 mt-2">
                {errors.luuDenNgay.message}
              </p>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            Hủy
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer`}
          >
            Tạo phiếu
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AssignmentModal;
