import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import { queryChiTieuAll } from "../../../../../hooks/personnels/queryChiTieus";
import { queryPhanCongNoiBoByID } from "../../../../../hooks/personnels/queryPhanCongNoiBo";
import { Plus, Save } from "react-feather";
import SelectItemChiTieu from "./SelectItemChiTieu";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import { DonViTinh } from "../../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";
import { createPhanTichKetQua } from "../../../../../hooks/personnels/queryPTKQ";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { queryClient } from "../../../../../lib/reactQuery";
import { usePersonnel } from "../../../../../contexts/PersonelsProvider";
import { useState } from "react";
import SelectItemTrangThai from "./SelectItemTrangThai";

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
      })
    )
    .min(1, "Cần ít nhất 1 chỉ tiêu"),
});

const ModelCreatePhieuPhanTichKetQua = ({ open, onClose, dataID }: any) => {
  const { data: chiTieus } = queryChiTieuAll({
    queryKey: "ChiTieuAll",
  });
  const { data } = queryPhanCongNoiBoByID({
    queryKey: "queryPhanCongNoiBoByID",
    params: dataID,
  });
  const { personnelInfo } = usePersonnel();
  const [statusFilter, setStatusFilter] = useState("Đạt");

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ghiChu: "",
      chiTietPhanTichKetQuas: [
        {
          maChiTieu: "",
          tenChiTieu: "",
          ketQua: "",
          mucChatLuong: "",
          donVi: "",
          ghiChu: "",
          trangThai: "Dạt",
        },
      ],
    },
    resolver: yupResolver(schema),
  });
  const handleClose = () => {
    onClose();
    reset();
  };
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
          queryKey: ["PhanTichKetQuaListDaDuyet"],
        }),
      ]);
      handleClose();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = createPhanTichKetQua({
    queryKey: "createDuTru",
    onSuccess: (data: any) => {
      if (data.status === 200) {
        showNotification({
          message: "Tạo phiếu phân tích thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Tạo phiếu phân tích thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Tạo phiếu phân tích thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const handleSave = (dataPhieu: any) => {
    const params = {
      maPdkMau: data?.maPdkMau,
      maKhoa: personnelInfo?.maKhoa,
      ghiChu: dataPhieu.ghiChu,
      chiTietPhanTichKetQuas: dataPhieu.chiTietPhanTichKetQuas.map(
        (item: any) => ({
          maChiTieu: item.maChiTieu,
          tenChiTieu: item.tenChiTieu,
          ketQua: item.ketQua,
          mucChatLuong: item.mucChatLuong,
          donVi: item.donVi,
          ghiChu: item.ghiChu,
          trangThai: item.trangThai,
        })
      ),
    };
    mutate(params);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
        },
      }}
    >
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">
          Tạo phiếu phân tích mới cho mẫu ({data?.tenMau})
        </h2>
      </div>

      <DialogContent dividers className="!p-8 bg-gray-50">
        <form
          id="form-create"
          onSubmit={handleSubmit(handleSave)}
          className="space-y-8"
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
                    mucChatLuong: "Đạt",
                    donVi: "",
                    ghiChu: "",
                    trangThai: "Đang xử lý",
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

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-4 gap-6 p-4 bg-gray-100 rounded-lg"
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
                    htmlFor={`ghiChuItem-${index}`}
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Trạng thái <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <SelectItemTrangThai
                      item={statusFilter}
                      setItem={setStatusFilter}
                    />
                  </div>
                </div>

                <div className="flex items-end justify-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="flex cursor-pointer items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition duration-300 ease-in-out shadow-sm hover:shadow-md border border-red-200"
                  >
                    <DeleteIcon className="mr-2" />
                    <span>Xóa chỉ tiêu</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>
      </DialogContent>

      <DialogActions className="!p-6 !bg-gray-100 !border-t border-gray-200 !rounded-b-xl flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleClose}
          className="px-6 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
        <button
          type="submit"
          form="form-create"
          className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Lưu phiếu</span>
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ModelCreatePhieuPhanTichKetQua;
