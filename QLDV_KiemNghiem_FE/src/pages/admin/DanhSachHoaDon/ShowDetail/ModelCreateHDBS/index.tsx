import { useEffect, useState } from "react";
import { Plus, Save } from "react-feather";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Detail from "./Detail";
import { Dialog } from "@mui/material";
import classes from "../../../DanhSachPhanCongNoiBo/PhanCong/ModelPhanCong/style.module.scss";
import clsx from "clsx";
import yup from "../../../../../configs/yup.custom";
import { useGetDmPhuLieuHoaChatAll } from "../../../../../hooks/customers/usePhieuDKyDVKN";
import PopupThemMau from "./PopupThemPLHC";
import { queryClient } from "../../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { useCreateHoaDonBoSung } from "../../../../../hooks/personnels/queryHoaDonThu";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: any;
}

interface ChiTietHDBoSung {
  donViTinh: string;
  soLuong: number | string;
  maDM_PLHC: string;
  donGia: number | string;
}

interface FormHDBoSung {
  ghiChu: string;
  chiTiethdboSungs: ChiTietHDBoSung[];
}

const ModelCreateHDBS = (props: Props) => {
  const { open, handleClose, dataID } = props;
  const [openPopupThemPLHC, setOpenPopupThemPLHC] = useState(false);
  const handleOpenPopupThemPLHC = () => setOpenPopupThemPLHC(true);

  const { data: dataDM_PhuLieuHoaChat } = useGetDmPhuLieuHoaChatAll({
    queryKey: "GetDmPhuLieuHoaChatAll",
  });

  const schemaHDBoSung = yup.object().shape({
    ghiChu: yup.string().required("Vui lòng nhập ghi chú"),
    chiTiethdboSungs: yup
      .array()
      .of(
        yup.object().shape({
          donViTinh: yup.string().required("Vui lòng chọn đơn vị tính"),
          soLuong: yup
            .number()
            .typeError("Số lượng phải là số")
            .positive("Số lượng phải lớn hơn 0")
            .required("Vui lòng nhập số lượng"),
          maDM_PLHC: yup.string().required("Vui lòng chọn phụ liệu hóa chất"),
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

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver<FormHDBoSung>(schemaHDBoSung),
    defaultValues: {
      ghiChu: "",
      chiTiethdboSungs: [
        {
          donViTinh: "",
          soLuong: 0,
          maDM_PLHC: "",
          donGia: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "chiTiethdboSungs",
  });

  const handleCloseModel = () => {
    handleClose();
    reset();
  };

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await queryClient.refetchQueries({
        queryKey: ["useQueryHoaDonThuByID"],
      });
      reset();
      handleClose();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = useCreateHoaDonBoSung({
    queryKey: "useCreateHoaDonBoSung",
    onSuccess: (data: any) => {
      console.log("Tạo phiếu thành công:", data);
      if (data.status === 200) {
        showNotification({
          message: "Tạo phiếu thành công",
          status: 200,
        });

        return;
      } else {
        showNotification({
          message: "Tạo phiếu thất bại",
          status: 500,
        });
      }
    },
    onError: (error: any) => {
      console.log("error", error);

      showNotification({
        message: "Tạo phiếu thất bại",
        status: 400,
      });
    },
    onSettled: handleSettled,
  });

  const onSubmit = (formData: FormHDBoSung) => {
    const param = {
      maHD: dataID,
      ghiChu: formData.ghiChu,
      chiTietHoaDonThuBoSungDtos: formData.chiTiethdboSungs.map((item) => ({
        maDM_PLHC: item.maDM_PLHC,
        donViTinh: item.donViTinh,
        soLuong: Number(item.soLuong),
        donGia: Number(item.donGia),
      })),
    };
    
    mutate(param);
  };

  useEffect(() => {
    reset({
      ghiChu: "",
      chiTiethdboSungs: [
        {
          donViTinh: "",
          soLuong: 0,
          maDM_PLHC: "",
          donGia: 0,
        },
      ],
    });
  }, [reset]);
  console.log("erros", errors);

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
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Tạo hóa đơn bổ sung (HD20256160749914_SDKPT20256160749594)
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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
            {errors.ghiChu && (
              <p className="text-red-600 text-sm/">{errors.ghiChu.message}</p>
            )}
          </div>
          <div className="border-t border-gray-300 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-600">
                Chi tiết hóa đơn bổ sung
              </h3>
              <button
                type="button"
                onClick={() =>
                  append({
                    donViTinh: "",
                    soLuong: 0,
                    maDM_PLHC: "",
                    donGia: 0,
                  })
                }
                className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Thêm phụ liệu hóa chất</span>
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
                  onRemove={() => remove(index)}
                  isEditable
                  control={control}
                  register={register}
                  errors={errors?.chiTiethdboSungs?.[index]}
                  fieldNamePrefix={`chiTiethdboSungs.${index}`}
                  dataDM_PhuLieuHoaChat={dataDM_PhuLieuHoaChat}
                  handleOpenPopupThemPLHC={handleOpenPopupThemPLHC}
                />
              ))}
            </div>
            {errors.chiTiethdboSungs && (
              <p className="text-red-600 text-sm/">
                {errors.chiTiethdboSungs?.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
            <button
              type="button"
              onClick={handleCloseModel}
              className="px-6 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Save size={16} />
              <span>Lưu phiếu</span>
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
};

export default ModelCreateHDBS;
