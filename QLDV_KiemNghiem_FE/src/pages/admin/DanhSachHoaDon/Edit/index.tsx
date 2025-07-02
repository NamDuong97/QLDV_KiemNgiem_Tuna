import { useEffect } from "react";
import { ArrowLeft, Delete, Plus, Save } from "react-feather";
import { queryChiTieuAll } from "../../../../hooks/personnels/queryChiTieus";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { queryClient } from "../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../configs/stores/useStoreNotification";
import {
  getPhanTichKetQuaByID,
  updatePhanTichKetQua,
} from "../../../../hooks/personnels/queryPTKQ";
import yup from "../../../../configs/yup.custom";
import SelectItemTrangThai from "./SelectItemTrangThai";
import SelectItemChiTieu from "./SelectItemChiTieu";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import { DonViTinh } from "../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";

const schema = yup.object({
  ghiChu: yup.string().nullable(),
  chiTietPhanTichKetQuas: yup
    .array()
    .of(
      yup.object({
        maChiTieu: yup.string().required("Vui lòng chọn chỉ tiêu"),
        tenChiTieu: yup.string().required("Tên chỉ tiêu không được bỏ trống"),
        ketQua: yup.string().required("Vui lòng nhập kết quả"),
        mucChatLuong: yup.string().required("Vui lòng nhập mức chất lượng"),
        donVi: yup.string().required("Vui lòng nhập đơn vị"),
        ghiChu: yup.string().required("Vui lòng nhập ghi chú"),
        trangThai: yup.string(),
        isDel: yup.boolean().nullable(),
      })
    )
    .min(1, "Cần ít nhất 1 chỉ tiêu"),
});

const Edit = ({ resultId, onCancel }: any) => {
  const { data: chiTieus } = queryChiTieuAll({
    queryKey: "ChiTieuAll",
  });
  const { data } = getPhanTichKetQuaByID({
    queryKey: "getPhanTichKetQuaByID",
    params: resultId,
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
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "chiTietPhanTichKetQuas",
  });

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["phanTichKetQuaChuaDuyet"],
        }),
        queryClient.refetchQueries({
          queryKey: ["getPhanTichKetQuaByID"],
        }),
      ]);
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = updatePhanTichKetQua({
    queryKey: "updatePhanTichKetQua",
    onSuccess: (data: any) => {
      console.log("Sửa phiếu phân tích thành công:", data);
      if (data.status === 200) {
        showNotification({
          message: "Sửa phiếu phân tích thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Sửa phiếu phân tích thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Sửa phiếu phân tích thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const softDelete = (index: any) => {
    const chiTiet = watch(`chiTietPhanTichKetQuas.${index}`);
    if (!chiTiet) return;
    if (chiTiet.isDel !== undefined) {
      setValue(`chiTietPhanTichKetQuas.${index}.isDel`, true);
    } else {
      remove(index);
    }
  };

  const handleSave = (dataPhieu: any) => {
    const validChiTiet = dataPhieu.chiTietPhanTichKetQuas.filter(
      (item: any) => item?.isDel !== true
    );

    if (validChiTiet.length === 0) {
      setError("chiTietPhanTichKetQuas", {
        type: "manual",
        message: "Cần ít nhất 1 chỉ tiêu chưa bị xóa.",
      });
      return;
    }

    const originalChiTiet = data?.phieuPhanTichKetQuaChiTietDtos || [];

    const params = {
      maId: data?.maID,
      ghiChu: dataPhieu.ghiChu,
      trangThai: 0,
      noiDungDuyetSoBo: "",
      noiDungDuyetTongBo: "",
      chiTietPhanTichKetQuas: dataPhieu.chiTietPhanTichKetQuas.map(
        (item: any) => {
          const {
            maId,
            maChiTieu,
            tenChiTieu,
            ketQua,
            mucChatLuong,
            donVi,
            ghiChu,
            trangThai,
            isDel,
          } = item;

          const base = {
            maId,
            maChiTieu,
            tenChiTieu,
            ketQua,
            mucChatLuong,
            donVi,
            ghiChu,
            trangThai,
          };

          if (isDel === true) {
            return { ...base, isDel: true };
          }
          const originalItem = originalChiTiet.find(
            (o: any) => o.maId === maId
          );

          if (originalItem) {
            const isChanged =
              originalItem.maChiTieu !== maChiTieu ||
              originalItem.tenChiTieu !== tenChiTieu ||
              originalItem.ketQua !== ketQua ||
              originalItem.mucChatLuong !== mucChatLuong ||
              originalItem.donVi !== donVi ||
              originalItem.ghiChu !== ghiChu ||
              originalItem.trangThai !== trangThai;

            if (isChanged) {
              return { ...base, isDel: false };
            }
          }
          if (!maId) {
            return { ...base, maId: "" };
          }
          return base;
        }
      ),
    };
    mutate(params);
  };

  useEffect(() => {
    if (data) {
      reset({
        ghiChu: data.ghiChu,
        chiTietPhanTichKetQuas: (
          data?.phieuPhanTichKetQuaChiTietDtos || []
        ).map((item: any) => ({
          ...item,
          isDel: false,
        })),
      });
    }
  }, [data, reset]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Chỉnh sửa phiếu phân tích
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Mã phiếu phân tích kết quả: {data?.maPhieuKetQua} - {data?.tenMau}
          </p>
        </div>
        <div className="flex gap-6">
          <button
            onClick={handleSubmit(handleSave)}
            className="px-4 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors cursor-pointer flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Lưu phiếu</span>
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      <form
        id="form-create"
        onSubmit={handleSubmit(handleSave)}
        className="space-y-8 p-8"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ghi chú
          </label>
          <textarea
            rows={3}
            {...register("ghiChu")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-0 focus-within:outline-1 focus-within:border-blue-600"
            placeholder="Nhập ghi chú..."
          />
        </div>

        <div className="border-t-2 border-gray-200 pt-8 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-600">
              Chi tiết phiếu
            </h3>
            <button
              type="button"
              onClick={() =>
                append({
                  maChiTieu: "",
                  tenChiTieu: "",
                  ketQua: "",
                  mucChatLuong: "",
                  donVi: "",
                  ghiChu: "",
                  trangThai: "Chưa đạt",
                })
              }
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Thêm Chỉ Tiêu</span>
            </button>
          </div>

          {errors.chiTietPhanTichKetQuas && (
            <p className="text-red-600 text-sm mb-4 font-medium">
              {errors.chiTietPhanTichKetQuas.message}
            </p>
          )}

          {fields.map((field, index) => {
            const isDeleted = watch(`chiTietPhanTichKetQuas.${index}.isDel`);
            if (isDeleted) return null;
            return (
              <div
                key={field.id}
                className="grid grid-cols-4 gap-6 p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <label
                    htmlFor={`maChiTieu-${index}`}
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Chỉ tiêu <span className="text-red-500">*</span>
                  </label>
                  <SelectItemChiTieu
                    control={control}
                    name={`chiTietPhanTichKetQuas.${index}.maChiTieu`}
                    index={index}
                    setValue={setValue}
                    label="chỉ tiêu"
                    data={chiTieus}
                    errorMessage={
                      errors.chiTietPhanTichKetQuas?.[index]?.maChiTieu?.message
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor={`ketQua-${index}`}
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Kết quả <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={`ketQua-${index}`}
                    {...register(`chiTietPhanTichKetQuas.${index}.ketQua`)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus-within:border-blue-600 focus-within:outline-1 focus:outline-0 focus:ring-blue-200 transition duration-300 ease-in-out"
                    placeholder="Nhập kết quả"
                  />
                  {errors.chiTietPhanTichKetQuas?.[index]?.ketQua && (
                    <p className="text-red-600 text-xs mt-1 font-medium">
                      {errors.chiTietPhanTichKetQuas[index].ketQua?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`donVi-${index}`}
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Đơn vị <span className="text-red-500">*</span>
                  </label>
                  <InputSelectDonViTinh
                    name={`chiTietPhanTichKetQuas.${index}.donVi`}
                    placeholder="Nhập ĐVT"
                    data={DonViTinh}
                    control={control}
                  />
                  {errors.chiTietPhanTichKetQuas?.[index]?.donVi && (
                    <p className="text-red-600 text-xs mt-1 font-medium">
                      {errors.chiTietPhanTichKetQuas[index].donVi?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`mucChatLuong-${index}`}
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Mức chất lượng <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={`mucChatLuong-${index}`}
                    {...register(
                      `chiTietPhanTichKetQuas.${index}.mucChatLuong`
                    )}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus-within:border-blue-600 focus-within:outline-1 focus:outline-0 focus:ring-blue-200 transition duration-300 ease-in-out"
                    placeholder="Nhập mức chất lượng"
                  />
                  {errors.chiTietPhanTichKetQuas?.[index]?.mucChatLuong && (
                    <p className="text-red-600 text-xs mt-1 font-medium">
                      {
                        errors.chiTietPhanTichKetQuas[index].mucChatLuong
                          ?.message
                      }
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor={`ghiChuItem-${index}`}
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Ghi chú <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      id={`ghiChuItem-${index}`}
                      {...register(`chiTietPhanTichKetQuas.${index}.ghiChu`)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus-within:border-blue-600 focus-within:outline-1 focus:outline-0 focus:ring-blue-200 transition duration-300 ease-in-out"
                      placeholder="Ghi chú riêng"
                    />
                  </div>
                  {errors.chiTietPhanTichKetQuas?.[index]?.ghiChu && (
                    <p className="text-red-600 text-xs mt-1 font-medium">
                      {errors.chiTietPhanTichKetQuas[index].ghiChu?.message}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor={`trangThai-${index}`}
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Trạng thái <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name={`chiTietPhanTichKetQuas.${index}.trangThai`}
                      render={({ field }) => (
                        <SelectItemTrangThai
                          item={field.value}
                          setItem={(val: any) => field.onChange(val)}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-end justify-center">
                  <button
                    type="button"
                    onClick={() => softDelete(index)}
                    className="flex cursor-pointer items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition duration-300 ease-in-out shadow-sm hover:shadow-md border border-red-200"
                  >
                    <Delete className="mr-2" />
                    <span>Xóa chỉ tiêu</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default Edit;
