import { useEffect, useState } from "react";
import { Delete, Plus, Save } from "react-feather";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PopupThemMau from "./PopupThemPLHC";
import InputSelectPLHC from "./InputSelectPLHC";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import {
  useQueryHoaDonBoSungByID,
  useUpdateHoaDonBoSung,
} from "../../../../../hooks/personnels/queryHoaDonThu";
import yup from "../../../../../configs/yup.custom";
import { useGetDmPhuLieuHoaChatAll } from "../../../../../hooks/customers/usePhieuDKyDVKN";
import { queryClient } from "../../../../../lib/reactQuery";
import { Dialog } from "@mui/material";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { DonViTinh } from "../../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";
import { IoClose } from "react-icons/io5";

interface Props {
  resultId: any;
  onCancel: () => void;
  open: boolean;
}

const ModelEditHDBS = (props: Props) => {
  const { resultId, open, onCancel } = props;
  const [openPopupThemPLHC, setOpenPopupThemPLHC] = useState(false);
  const handleOpenPopupThemPLHC = () => setOpenPopupThemPLHC(true);

  const { data } = useQueryHoaDonBoSungByID({
    queryKey: "useQueryHoaDonBoSungByID",
    maHoaDonThuBoSung: resultId,
  });

  const { data: dataDM_PhuLieuHoaChat } = useGetDmPhuLieuHoaChatAll({
    queryKey: "GetDmPhuLieuHoaChatAllEdit",
  });

  const schema = yup.object({
    ghiChu: yup.string().nullable(),
    chiTietHoaDonThuBoSungDtos: yup
      .array()
      .of(
        yup.object({
          maId: yup.string(),
          maDmPlhc: yup.string().required("Vui lòng nhập tên phụ liệu"),
          soLuong: yup
            .number()
            .typeError("Số lượng phải là số")
            .positive("Số lượng phải lớn hơn 0")
            .required("Vui lòng nhập số lượng"),
          donViTinh: yup.string().required("Vui lòng chọn đơn vị tính"),
          donGia: yup.string().required("Vui lòng nhập đơn giá"),
          isDel: yup.boolean().nullable(),
        })
      )
      .min(1, "Cần ít nhất 1 chỉ tiêu"),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ghiChu: "",
      chiTietHoaDonThuBoSungDtos: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "chiTietHoaDonThuBoSungDtos",
  });

  const softDelete = (index: any) => {
    const chiTiet = watch(`chiTietHoaDonThuBoSungDtos.${index}`);
    if (!chiTiet) return;
    if (chiTiet?.maId) {
      setValue(`chiTietHoaDonThuBoSungDtos.${index}.isDel`, true);
    } else {
      remove(index);
    }
  };

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

  const { mutate } = useUpdateHoaDonBoSung({
    queryKey: "useUpdateHoaDonBoSung",
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

  const buildChiTiet = (item: any, originalChiTiet: any) => {
    const { maId, maDmPlhc, soLuong, donViTinh, donGia, isDel } = item;

    const base = {
      maId: maId ?? "",
      maDM_PLHC: maDmPlhc,
      soLuong,
      donViTinh,
      donGia: donGia ?? "",
    };

    // Nếu đang xóa
    if (isDel === true) {
      return { ...base, isDel: true };
    }

    if (maId) {
      const originalItem = originalChiTiet.find((o: any) => o.maId === maId);
      if (originalItem) {
        const isChanged =
          originalItem.maDmPlhc !== maDmPlhc ||
          originalItem.soLuong !== soLuong ||
          originalItem.donViTinh !== donViTinh ||
          originalItem.donGia !== donGia;
        return { ...base, isDel: isChanged ? false : undefined };
      } else {
        return { ...base, maId: maId };
      }
    } else {
      // item mới thêm
      return { ...base, maId: "" };
    }
  };

  const handleSave = (formData: any) => {
    const validChiTiet = formData.chiTietHoaDonThuBoSungDtos.filter(
      (item: any) => item?.isDel !== true
    );

    if (validChiTiet.length === 0) {
      setError("chiTietHoaDonThuBoSungDtos", {
        type: "manual",
        message: "Cần ít nhất 1 phụ liệu hóa chất chưa bị xóa.",
      });
      return;
    }

    const originalChiTiet = data?.chiTietHoaDonThuBoSungDtos || [];

    const params = {
      maID: resultId,
      ghiChu: formData.ghiChu ?? "",
      chiTietHoaDonThuBoSungDtos: formData.chiTietHoaDonThuBoSungDtos.map(
        (item: any) => buildChiTiet(item, originalChiTiet)
      ),
    };

    mutate(params);
  };

  useEffect(() => {
    if (data) {
      const chiTietMapped = (data.chiTietHoaDonThuBoSungDtos || []).map(
        (item: any) => ({
          maId: item.maId,
          maDmPlhc: item.maDmPlhc ?? "",
          soLuong: item.soLuong ?? 0,
          donViTinh: item.donViTinh ?? "",
          donGia: item.donGia ?? "",
          isDel: false,
        })
      );
      reset({
        ghiChu: data.ghiChu ?? "",
        chiTietHoaDonThuBoSungDtos: chiTietMapped,
      });
    }
  }, [data, reset]);

  return (
    <Dialog
      open={open}
      onClose={handleCloseModel}
      maxWidth="xl"
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
              Sửa hóa đơn bổ sung
            </h2>
          </div>
          <div className="flex gap-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-white bg-yellow-600 cursor-pointer rounded-lg hover:bg-yellow-700 flex items-center space-x-2"
            >
              <IoClose size={16} />
              <span>Hủy phiếu</span>
            </button>
            <button
              onClick={handleSubmit(handleSave)}
              className="px-4 py-2 text-white bg-cyan-600 cursor-pointer rounded-lg hover:bg-cyan-700 flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Lưu phiếu</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-8 p-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú
            </label>
            <textarea
              rows={3}
              {...register("ghiChu")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              placeholder="Nhập ghi chú..."
            />
          </div>

          <div className="border-t-2 border-gray-200 pt-8 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-600">
                Chi tiết hóa đơn bổ sung
              </h3>
              <button
                type="button"
                onClick={() =>
                  append({
                    maId: "",
                    maDmPlhc: "",
                    soLuong: 0,
                    donViTinh: "",
                    donGia: "",
                  })
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Thêm phụ liệu hóa chất</span>
              </button>
            </div>

            {errors.chiTietHoaDonThuBoSungDtos && (
              <p className="text-red-600 text-sm mb-4 font-medium">
                {errors?.chiTietHoaDonThuBoSungDtos?.message}
              </p>
            )}

            {fields.map((field, index) => {
              const isDeleted = watch(
                `chiTietHoaDonThuBoSungDtos.${index}.isDel`
              );
              if (isDeleted) return null;
              return (
                <div
                  key={field.id}
                  className="grid grid-cols-9 gap-6 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Tên PLHC
                    </label>
                    <InputSelectPLHC
                      name={`chiTietHoaDonThuBoSungDtos.${index}.maDmPlhc`}
                      control={control}
                      data={dataDM_PhuLieuHoaChat}
                      placeholder="Nhập tên phụ liệu"
                      errorMessage={
                        errors?.chiTietHoaDonThuBoSungDtos?.[index]?.maDmPlhc
                          ?.message
                      }
                      handleOpenPopupThem={handleOpenPopupThemPLHC}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      {...register(
                        `chiTietHoaDonThuBoSungDtos.${index}.soLuong`
                      )}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-600 focus:outline-none"
                      placeholder="Nhập số lượng"
                    />
                    {errors?.chiTietHoaDonThuBoSungDtos?.[index]?.soLuong && (
                      <p className="text-red-600 text-xs mt-1 font-medium">
                        {
                          errors.chiTietHoaDonThuBoSungDtos[index].soLuong
                            .message
                        }
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Đơn vị tính
                    </label>
                    <InputSelectDonViTinh
                      name={`chiTietHoaDonThuBoSungDtos.${index}.donViTinh`}
                      placeholder="Nhập đơn vị tính"
                      data={DonViTinh}
                      control={control}
                    />
                    {errors?.chiTietHoaDonThuBoSungDtos?.[index]?.donViTinh && (
                      <p className="text-red-600 text-xs mt-1 font-medium">
                        {
                          errors.chiTietHoaDonThuBoSungDtos[index].donViTinh
                            .message
                        }
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Đơn giá
                    </label>
                    <input
                      type="number"
                      {...register(
                        `chiTietHoaDonThuBoSungDtos.${index}.donGia`
                      )}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-600 focus:outline-none"
                      placeholder="Nhập đơn giá"
                    />
                    {errors?.chiTietHoaDonThuBoSungDtos?.[index]?.donGia && (
                      <p className="text-red-600 text-xs mt-1 font-medium">
                        {
                          errors.chiTietHoaDonThuBoSungDtos[index].donGia
                            .message
                        }
                      </p>
                    )}
                  </div>

                  <div className="flex items-end justify-center">
                    <button
                      type="button"
                      onClick={() => softDelete(index)}
                      className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition"
                    >
                      <Delete className="mr-2" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
        <PopupThemMau
          open={openPopupThemPLHC}
          handleClose={() => setOpenPopupThemPLHC(false)}
        />
      </div>
    </Dialog>
  );
};

export default ModelEditHDBS;
