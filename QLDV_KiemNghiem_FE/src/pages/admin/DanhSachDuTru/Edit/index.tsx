import { useEffect, useState } from "react";
import { ArrowLeft, Delete, Eye, Plus, Save } from "react-feather";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "../../DanhSachPhanCongNoiBo/PhanCong/ModelPhanCong/style.module.scss";
import clsx from "clsx";
import yup from "../../../../configs/yup.custom";
import { usePersonnel } from "../../../../contexts/PersonelsProvider";
import { queryClient } from "../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../configs/stores/useStoreNotification";
import {
  getDuTruByID,
  updateDuTru,
} from "../../../../hooks/personnels/queryDuTru";
import { queryMauByID } from "../../../../hooks/personnels/queryMau";
import PopupThemMau from "./PopupThemPLHC";
import InputSelectPLHC from "./InputSelectPLHC";
import { useGetDmPhuLieuHoaChatAll } from "../../../../hooks/customers/usePhieuDKyDVKN";
import InputSelectDonViTinh from "./InputSelectDonViTinh";
import { DonViTinh } from "../../../Guest/formSignUpDVKN/components/Maus/FormThongTinMau";

interface Props {
  resultId: any;
  onCancel: () => void;
  handleViewResult: (id: any) => void;
}

const Edit = (props: Props) => {
  const { resultId, onCancel, handleViewResult } = props;
  const [openPopupThemPLHC, setOpenPopupThemPLHC] = useState(false);
  const handleOpenPopupThemPLHC = () => setOpenPopupThemPLHC(true);

  const { data } = getDuTruByID({
    queryKey: "getDuTruByID",
    params: resultId,
  });
  const { data: dataMauID } = queryMauByID({
    queryKey: "MauByID",
    params: data?.maPDK_Mau,
  });

  const { data: dataDM_PhuLieuHoaChat } = useGetDmPhuLieuHoaChatAll({
    queryKey: "GetDmPhuLieuHoaChatAllEdit",
  });

  const schema = yup.object({
    ghiChu: yup.string().nullable(),
    chiTietPhieuDuTrus: yup
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
          ghiChu: yup.string().required("Vui lòng nhập ghi chú"),
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
      chiTietPhieuDuTrus: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "chiTietPhieuDuTrus",
  });

  const softDelete = (index: any) => {
    const chiTiet = watch(`chiTietPhieuDuTrus.${index}`);
    if (!chiTiet) return;
    if (chiTiet?.maId) {
      setValue(`chiTietPhieuDuTrus.${index}.isDel`, true);
    } else {
      remove(index);
    }
  };

  const handleView = () => {
    handleViewResult(resultId);
  };

  const handleCloseModel = () => {
    onCancel();
    reset();
  };

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await queryClient.refetchQueries({
        queryKey: ["DanhSachMau"],
      });
      onCancel();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = updateDuTru({
    queryKey: "updateDuTru",
    onSuccess: (data: any) => {
      if (data.status === 200) {
        showNotification({
          message: "Tạo phiếu dự trù thành công",
          status: 200,
        });
        return;
      } else {
        showNotification({
          message: "Tạo phiếu dự trù thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Tạo phiếu dự trù thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const buildChiTiet = (item: any, originalChiTiet: any) => {
    const { maId, maDmPlhc, soLuong, donViTinh, ghiChu, isDel } = item;

    const base = {
      maId: maId ?? "",
      maDmPlhc,
      soLuong,
      donViTinh,
      ghiChu: ghiChu ?? "",
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
          (originalItem.ghiChu ?? "") !== (ghiChu ?? "");
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
    const validChiTiet = formData.chiTietPhieuDuTrus.filter(
      (item: any) => item?.isDel !== true
    );

    if (validChiTiet.length === 0) {
      setError("chiTietPhieuDuTrus", {
        type: "manual",
        message: "Cần ít nhất 1 chỉ tiêu chưa bị xóa.",
      });
      return;
    }

    const originalChiTiet = data?.chiTietPhieuDuTruDtos || [];

    const params = {
      maId: resultId,
      noiDungDuyet: "",
      ghiChu: formData.ghiChu ?? "",
      chiTietPhieuDuTrus: formData.chiTietPhieuDuTrus.map((item: any) =>
        buildChiTiet(item, originalChiTiet)
      ),
    };

    console.log("Form Submit:", params);
    mutate(params);
  };

  useEffect(() => {
    if (data) {
      const chiTietMapped = (data.chiTietPhieuDuTruDtos || []).map(
        (item: any) => ({
          maId: item.maId,
          maDmPlhc: item.maDmPlhc ?? "",
          soLuong: item.soLuong ?? 0,
          donViTinh: item.donViTinh ?? "",
          ghiChu: item.ghiChu ?? "",
          isDel: false,
        })
      );
      reset({
        ghiChu: data.ghiChu ?? "",
        chiTietPhieuDuTrus: chiTietMapped,
      });
    }
  }, [data, reset]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Sửa phiếu dự trù
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Cho mẫu: {dataMauID?.tenMau}
          </p>
        </div>
        <div className="flex gap-6">
          <button
            onClick={handleSubmit(handleSave)}
            className="px-4 py-2 text-white bg-cyan-600 cursor-pointer rounded-lg hover:bg-cyan-700 flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Lưu phiếu</span>
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-100 flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Quay lại</span>
          </button>
          <button
            onClick={handleView}
            className="px-4 py-2 border border-yellow-300 cursor-pointer text-yellow-700 rounded-lg hover:bg-yellow-100 flex items-center space-x-2"
          >
            <Eye size={16} />
            <span>Xem chi tiết</span>
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
              Chi tiết phiếu dự trù
            </h3>
            <button
              type="button"
              onClick={() =>
                append({
                  maId: "",
                  maDmPlhc: "",
                  soLuong: 0,
                  donViTinh: "",
                  ghiChu: "",
                })
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Thêm phụ liệu hóa chất</span>
            </button>
          </div>

          {errors.chiTietPhieuDuTrus && (
            <p className="text-red-600 text-sm mb-4 font-medium">
              {errors?.chiTietPhieuDuTrus?.root?.message}
            </p>
          )}

          {fields.map((field, index) => {
            const isDeleted = watch(`chiTietPhieuDuTrus.${index}.isDel`);
            if (isDeleted) return null;
            return (
              <div
                key={field.id}
                className="grid grid-cols-4 gap-6 p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Tên PLHC
                  </label>
                  <InputSelectPLHC
                    name={`chiTietPhieuDuTrus.${index}.maDmPlhc`}
                    control={control}
                    data={dataDM_PhuLieuHoaChat}
                    placeholder="Tên phụ liệu"
                    errorMessage={
                      errors?.chiTietPhieuDuTrus?.[index]?.maDmPlhc?.message
                    }
                    handleOpenPopupThem={handleOpenPopupThemPLHC}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    {...register(`chiTietPhieuDuTrus.${index}.soLuong`)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-600 focus:outline-none"
                    placeholder="Số lượng"
                  />
                  {errors?.chiTietPhieuDuTrus?.[index]?.soLuong && (
                    <p className="text-red-600 text-xs mt-1 font-medium">
                      {errors.chiTietPhieuDuTrus[index].soLuong.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Đơn vị tính
                  </label>
                  <InputSelectDonViTinh
                    name={`chiTietPhieuDuTrus.${index}.donViTinh`}
                    placeholder="Nhập ĐVT"
                    data={DonViTinh}
                    control={control}
                  />
                  {errors?.chiTietPhieuDuTrus?.[index]?.donViTinh && (
                    <p className="text-red-600 text-xs mt-1 font-medium">
                      {errors.chiTietPhieuDuTrus[index].donViTinh.message}
                    </p>
                  )}
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Ghi chú
                  </label>
                  <input
                    {...register(`chiTietPhieuDuTrus.${index}.ghiChu`)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-600 focus:outline-none"
                    placeholder="Ghi chú"
                  />
                  {errors?.chiTietPhieuDuTrus?.[index]?.ghiChu && (
                    <p className="text-red-600 text-xs mt-1 font-medium">
                      {errors.chiTietPhieuDuTrus[index].ghiChu.message}
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
  );
};

export default Edit;
