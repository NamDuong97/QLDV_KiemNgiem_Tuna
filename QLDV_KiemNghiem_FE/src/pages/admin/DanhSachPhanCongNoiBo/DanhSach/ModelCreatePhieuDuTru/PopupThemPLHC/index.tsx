import { Dialog } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useStoreNotification } from "../../../../../../configs/stores/useStoreNotification";
import yup from "../../../../../../configs/yup.custom";
import { useCreateDmPhuLieuHoaChat } from "../../../../../../hooks/customers/usePhieuDKyDVKN";
import { Save } from "react-feather";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import { DonViTinh } from "../../../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface FormThemDanhMuc {
  tenDmPlhc: string;
  tenHienThi: string;
  nongDo: number;
  donViNongDo: string;
  dieuKienBaoQuan: string;
}

const PopupThemMau = (props: Props) => {
  const { open, handleClose } = props;
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    tenDmPlhc: yup
      .string()
      .trim()
      .strict(true)
      .required("Yêu cầu nhập tên DM PLHC")
      .min(2, "Tên DM PLHC phải có ít nhất 2 ký tự")
      .max(200, "Tên DM PLHC không vượt quá 200 ký tự"),

    tenHienThi: yup
      .string()
      .trim()
      .strict(true)
      .required("Yêu cầu nhập tên hiển thị")
      .min(2, "Tên hiển thị phải có ít nhất 2 ký tự")
      .max(200, "Tên hiển thị không vượt quá 200 ký tự"),

    nongDo: yup
      .number()
      .typeError("Nồng độ phải là số")
      .required("Yêu cầu nhập nồng độ")
      .min(0, "Nồng độ không được âm")
      .max(100000, "Nồng độ quá lớn"),

    donViNongDo: yup
      .string()
      .trim()
      .strict(true)
      .required("Yêu cầu nhập đơn vị nồng độ")
      .max(50, "Đơn vị nồng độ không vượt quá 50 ký tự"),

    dieuKienBaoQuan: yup
      .string()
      .trim()
      .strict(true)
      .required("Yêu cầu nhập điều kiện bảo quản")
      .max(300, "Điều kiện bảo quản không vượt quá 300 ký tự"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<FormThemDanhMuc>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleOnSettled = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["GetDmPhuLieuHoaChatAll"],
    });
  };

  const { mutate } = useCreateDmPhuLieuHoaChat({
    queryKey: "useCreateDmPhuLieuHoaChat",
    onSuccess: (response: any) => {
      if (response.status === 200) {
        showNotification({ message: "Thêm thành công", status: 200 });
        reset();
      }
    },
    onError: (errors: any) => {
      if (errors) {
        showNotification({ message: "Thêm thất bại", status: 400 });
      }
    },
    onSettled: handleOnSettled,
  });

  const handleClosePopup = () => {
    handleClose?.();
    reset();
  };

  const handleThem = (data: FormThemDanhMuc) => {
    const dataFinal = {
      tenDmPlhc: data.tenDmPlhc,
      tenHienThi: data.tenHienThi,
      nongDo: data.nongDo,
      donViNongDo: data.donViNongDo,
      dieuKienBaoQuan: data.dieuKienBaoQuan,
    };
    console.log("dataFinal", dataFinal);

    mutate(dataFinal);
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={handleClosePopup}
      sx={{
        ".MuiPaper-root": {
          borderRadius: "10px",
        },
      }}
      fullWidth
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Tạo phụ liệu hóa chất
          </h2>
        </div>
        <form onSubmit={handleSubmit(handleThem)} className="px-4 py-5">
          <div className="grid grid-cols-1 gap-6">
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tên phụ liệu hóa chất
              </label>
              <input
                {...register("tenDmPlhc")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-0 focus-within:outline-1 focus-within:border-blue-600"
                placeholder="Nhập tên phụ liệu hóa chất"
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.tenDmPlhc?.message}
              </p>
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tên hiển thị
              </label>
              <input
                {...register("tenHienThi")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-0 focus-within:outline-1 focus-within:border-blue-600"
                placeholder="Nhập tên hiển thị"
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.tenHienThi?.message}
              </p>
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nồng độ
              </label>
              <input
                type="number"
                {...register("nongDo")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-0 focus-within:outline-1 focus-within:border-blue-600"
                placeholder="Nhập nồng độ"
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.nongDo?.message}
              </p>
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Đơn vị nồng độ
              </label>
              <InputSelectDonViTinh
                name={`donViNongDo`}
                placeholder="Nhập ĐVT"
                data={DonViTinh}
                control={control}
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.donViNongDo?.message}
              </p>
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Điều kiện bảo quản
              </label>
              <input
                {...register("dieuKienBaoQuan")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-0 focus-within:outline-1 focus-within:border-blue-600"
                placeholder="Nhập điều kiện bảo quản"
              />
              <p className="text-red-600 text-sm mt-1">
                {errors?.dieuKienBaoQuan?.message}
              </p>
            </div>
          </div>
          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClosePopup}
              className="px-6 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Save size={16} />
              <span>Thêm</span>
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default PopupThemMau;
