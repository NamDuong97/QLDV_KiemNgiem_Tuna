// 🚀 ModelEditHDBS tối ưu hoàn chỉnh
import { useEffect, useState } from "react";
import { Plus, Save } from "react-feather";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Detail from "./Detail";
import { Dialog } from "@mui/material";
import classes from "../../../DanhSachPhanCongNoiBo/PhanCong/ModelPhanCong/style.module.scss";
import clsx from "clsx";
import yup from "../../../../../configs/yup.custom";
import { useGetDmPhuLieuHoaChatAll } from "../../../../../hooks/customers/usePhieuDKyDVKN";
import PopupThemMau from "./PopupThemPLHC";

const schemaHDBoSung = yup.object().shape({
  ghiChu: yup.string().required("Vui lòng nhập ghi chú"),
  chiTiethdboSungs: yup
    .array()
    .of(
      yup.object().shape({
        maID: yup.string(),
        donViTinh: yup.string().required("Vui lòng chọn đơn vị tính"),
        soLuong: yup
          .number()
          .typeError("Số lượng phải là số")
          .positive("Số lượng phải lớn hơn 0")
          .required("Vui lòng nhập số lượng"),
        maDmPlhc: yup.string().required("Vui lòng chọn phụ liệu hóa chất"),
        donGia: yup
          .number()
          .typeError("Đơn giá phải là số")
          .min(0, "Đơn giá không âm")
          .required("Vui lòng nhập đơn giá"),
      })
    )
    .required()
    .min(1, "Cần ít nhất 1 chi tiết"),
});

export default function ModelEditHDBS({ open, handleClose }: any) {
  const [deletedItems, setDeletedItems] = useState<any>([]);
  const [openPopupThemPLHC, setOpenPopupThemPLHC] = useState(false);

  const { data: dataDM_PhuLieuHoaChat } = useGetDmPhuLieuHoaChatAll({
    queryKey: "GetDmPhuLieuHoaChatAll",
  });

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaHDBoSung),
    defaultValues: {
      ghiChu: "",
      chiTiethdboSungs: [],
    },
  });

  const chiTiethdboSungs = useWatch({ control, name: "chiTiethdboSungs" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "chiTiethdboSungs",
  });

  const handleRemove = (index: any) => {
    const removedItem = chiTiethdboSungs[index];
    if (removedItem?.maID) {
      setDeletedItems((prev: any) => [
        ...prev,
        { ...removedItem, isDel: true },
      ]);
    }
    remove(index);
  };

  const handleCloseModel = () => {
    handleClose();
    reset();
    setDeletedItems([]);
  };

  const onSubmit = (formData: any) => {
    const chiTietDangCo = formData.chiTiethdboSungs.map((item: any) => ({
      maID: item.maID,
      maDM_PLHC: item.maDmPlhc,
      donViTinh: item.donViTinh,
      soLuong: Number(item.soLuong),
      donGia: Number(item.donGia),
      ...(item.maID ? { isDel: false } : {}),
    }));

    const payload = {
      ghiChu: formData.ghiChu,
      chiTietHoaDonThuBoSungDtos: [
        ...chiTietDangCo,
        ...deletedItems.map((item: any) => ({
          maID: item.maID,
          maDM_PLHC: item.maDM_PLHC || item.maDmPlhc,
          donViTinh: item.donViTinh,
          soLuong: Number(item.soLuong),
          donGia: Number(item.donGia),
          isDel: true,
        })),
      ],
    };

    console.log("payload gửi API:", payload);
    // mutate(payload);
  };

  useEffect(() => {
    reset({ ghiChu: "", chiTiethdboSungs: [] });
  }, [reset]);

  return (
    <Dialog open={open} onClose={handleCloseModel} maxWidth="xl" fullWidth>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">Cập nhật hóa đơn bổ sung</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 font-medium">Ghi chú</label>
            <textarea
              {...register("ghiChu")}
              className="w-full border rounded-lg p-2"
            />
            {errors.ghiChu && (
              <p className="text-red-600">{errors.ghiChu.message}</p>
            )}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Chi tiết hóa đơn bổ sung
              </h3>
              <button
                type="button"
                onClick={() =>
                  append({
                    maID: "",
                    donViTinh: "",
                    soLuong: 0,
                    maDmPlhc: "",
                    donGia: 0,
                  })
                }
                className="bg-blue-600 text-white rounded px-4 py-2 flex items-center"
              >
                <Plus size={16} className="mr-2" /> Thêm
              </button>
            </div>

            <div
              className={clsx(
                "space-y-4 max-h-72 overflow-y-auto",
                classes.scrollbar_thin
              )}
            >
              {fields.map((field, index) => (
                <Detail
                  key={field.id}
                  index={index}
                  detail={field}
                  onRemove={() => handleRemove(index)}
                  isEditable
                  control={control}
                  register={register}
                  errors={errors?.chiTiethdboSungs?.[index]}
                  fieldNamePrefix={`chiTiethdboSungs.${index}`}
                  dataDM_PhuLieuHoaChat={dataDM_PhuLieuHoaChat}
                  handleOpenPopupThemPLHC={() => setOpenPopupThemPLHC(true)}
                />
              ))}
            </div>

            {errors.chiTiethdboSungs && (
              <p className="text-red-600">{errors.chiTiethdboSungs.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 border-t pt-6">
            <button
              type="button"
              onClick={handleCloseModel}
              className="border px-6 py-2 rounded hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-6 py-2 flex items-center hover:bg-blue-700"
            >
              <Save size={16} className="mr-2" /> Lưu phiếu
            </button>
          </div>
        </form>
      </div>

      <PopupThemMau
        open={openPopupThemPLHC}
        handleClose={() => setOpenPopupThemPLHC(false)}
      />
    </Dialog>
  );
}
