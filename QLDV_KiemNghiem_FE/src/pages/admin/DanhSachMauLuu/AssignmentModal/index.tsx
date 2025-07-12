import { Dialog } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";
import { queryClient } from "../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../configs/stores/useStoreNotification";
import { createMauLuu } from "../../../../hooks/personnels/queryMauLuu";
import { formatDateNotTime2 } from "../../../../configs/configAll";
import { IoClose } from "react-icons/io5";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import { DonViTinh } from "../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";
import { getAllDanhSachMau } from "../../../../hooks/personnels/phanCongKhoa";
import SelectItemMau from "./SelectItemMau";
import { queryCheckMau } from "../../../../hooks/personnels/queryMau";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormTaoPhieu {
  soLuong: number;
  donViTinh: string;
  luuDenNgay: Date;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const AssignmentModal = (props: Props) => {
  const { isOpen, onClose } = props;
  const { personnelInfo } = usePersonnel();
  const [selectMau, setSelectMau] = useState("");

  const { data: dataMau } = getAllDanhSachMau({
    queryKey: "DanhSachMauSampleList",
    params: { getAll: true, maKhoa: personnelInfo?.maKhoa, luuMau: true },
  });
  const { data: CheckMau } = queryCheckMau({
    queryKey: "queryCheckMau",
    params: selectMau,
  });
  const dataGetMau = dataMau?.data?.find(
    (item: any) => item.maId === selectMau
  );
console.log('CheckMau',CheckMau);

  const schema = yup.object().shape({
    soLuong: yup
      .number()
      .typeError("Vui lòng nhập số lượng")
      .required("Vui lòng nhập số lượng")
      .min(1, "Số lượng phải lớn hơn 0"),
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
      reset();
      setSelectMau("");
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
      tenMau: dataGetMau?.tenMau,
      maPdkMau: selectMau,
      soLuong: data.soLuong,
      donViTinh: data.donViTinh,
      luuDenNgay: formatDateNotTime2(data.luuDenNgay),
      hanSuDung: dataGetMau?.hanSuDung,
      manvLuu: personnelInfo?.maId,
    };
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

  useEffect(() => {
    if (selectMau) {
      reset({
        soLuong: dataGetMau?.soLuong,
        donViTinh: dataGetMau?.donViTinh,
      });
    }
  }, [selectMau]);

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
              Tên mẫu *
            </label>
            <SelectItemMau
              title="mẫu lưu"
              setItem={setSelectMau}
              item={selectMau}
              data={dataMau?.data}
            />
            {CheckMau?.lm > 0 && (
              <p className="text-xs text-red-600 mt-2">
                Mẫu đã được lưu trước đó yêu cầu lưu mẫu khác
              </p>
            )}
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
              <p className="text-xs text-red-600 mt-2">
                {errors.soLuong.message}
              </p>
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
              <p className="text-xs text-red-600 mt-2">
                {errors.donViTinh.message}
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
            disabled={CheckMau?.lm > 0 || selectMau === ""}
            className={`px-4 py-2 rounded-md text-sm text-white ${
              selectMau === "" || CheckMau?.lm > 0
                ? "disabled:bg-blue-400 cursor-no-drop"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            Tạo phiếu
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AssignmentModal;
