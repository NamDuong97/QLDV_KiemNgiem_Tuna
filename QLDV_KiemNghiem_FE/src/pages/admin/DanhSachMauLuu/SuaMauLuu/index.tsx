import { Dialog } from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  formatDateNotTime2,
} from "../../../../configs/configAll";
import { IoClose } from "react-icons/io5";
import {
  getMauLuuByID,
  updateMauLuu,
} from "../../../../hooks/personnels/queryMauLuu";
import { getInforNhanVien } from "../../../../hooks/personnels/access/useAccess";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import { DonViTinh } from "../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";
import { queryClient } from "../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../configs/stores/useStoreNotification";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormTaoPhieu {
  soLuong: number;
  donViTinh: string;
  luuDenNgay: string;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const SuaMauLuu = (props: Props) => {
  const { isOpen, onClose } = props;
  const dataSession = sessionStorage.getItem("chi-tiet-mau-luu-sua");
  const id = dataSession ? JSON.parse(dataSession) : "";
  const { personnelInfo } = usePersonnel();
  const { data } = getMauLuuByID({
    queryKey: "getMauLuuByID",
    params: id,
  });

  const { data: dataNhanVien } = getInforNhanVien({
    queryKey: "getInforNhanVien",
    params: data?.manvLuu,
  });
  const initialLuuDenNgay = useRef<string | undefined>(undefined);
  const schema = yup.object().shape({
    soLuong: yup
      .number()
      .required("Vui lòng nhập số lượng")
      .min(1, "Số lượng phải lớn hơn 0"),
    donViTinh: yup.string().required("Vui lòng nhập đơn vị tính"),
    luuDenNgay: yup
      .string()
      .required("Vui lòng chọn ngày lưu đến")
      .test(
        "is-valid-if-changed",
        "Ngày lưu đến phải tính từ thời điểm hiện tại",
        function (value) {
          if (!value) return false;
          if (value === initialLuuDenNgay.current) {
            return true; // nếu không thay đổi, không cần validate
          }
          return new Date(value) >= today;
        }
      ),
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

  useEffect(() => {
    if (isOpen) {
      if (data) {
        const initDate = formatDateNotTime2(data?.luuDenNgay) || undefined;
        initialLuuDenNgay.current = initDate;
        reset({
          soLuong: data?.soLuong ?? 0,
          donViTinh: data?.donViTinh ?? "",
          luuDenNgay: initDate,
        });
      } else {
        initialLuuDenNgay.current = undefined;
        reset({
          soLuong: 0,
          donViTinh: "",
          luuDenNgay: undefined,
        });
      }
    }
  }, [isOpen, data, reset]);

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await queryClient.refetchQueries({
        queryKey: ["queryMauLuuAll"],
      });
      onClose();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = updateMauLuu({
    queryKey: "updateMauLuu",
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

  const handleAssignSubmit = (dataForm: FormTaoPhieu) => {
    const dataTao = {
      maId: data?.maId,
      tenMau: data?.tenMau,
      soLuong: dataForm.soLuong,
      donViTinh: dataForm.donViTinh,
      luuDenNgay: formatDateNotTime2(dataForm.luuDenNgay),
      manvLuu: personnelInfo?.maId,
      hanSuDung: data?.hanSuDung,
    };
    mutate(dataTao);
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
          <div className="flex space-x-2 items-center">
            <p className="text-sm font-medium text-gray-700">
              Tên mẫu đã chọn:
            </p>
            <p
              className={`inline-block px-2 py-1 text-sm font-medium rounded-md bg-green-100 text-green-800`}
            >
              {data?.tenMau}
            </p>
          </div>

          <div className="flex space-x-2 items-center">
            <label className="text-sm font-medium text-gray-700">
              Nhân viên lưu:
            </label>
            <p className="text-sm text-purple-600">{dataNhanVien?.hoTen}</p>
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
            <InputSelectDonViTinh
              name="donViTinh"
              placeholder="Nhập ĐVT"
              data={DonViTinh}
              control={control}
            />
            {errors.donViTinh && (
              <p className="text-xs text-red-600">{errors.donViTinh.message}</p>
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
