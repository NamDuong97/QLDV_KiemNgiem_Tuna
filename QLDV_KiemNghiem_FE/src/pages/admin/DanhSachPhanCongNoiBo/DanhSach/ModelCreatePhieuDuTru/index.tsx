import { useEffect } from "react";
import { Plus, Save } from "react-feather";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Detail from "./Detail";
import { Dialog } from "@mui/material";
import classes from "../../PhanCong/ModelPhanCong/style.module.scss";
import clsx from "clsx";
import { queryPhanCongNoiBoByID } from "../../../../../hooks/personnels/queryPhanCongNoiBo";
import yup from "../../../../../configs/yup.custom";
import { queryClient } from "../../../../../lib/reactQuery";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { createDuTru } from "../../../../../hooks/personnels/queryDuTru";
import { usePersonnel } from "../../../../../contexts/PersonelsProvider";

interface Props {
  open: boolean;
  handleClose: () => void;
  dataID: string;
}

interface ChiTietPhieuDuTru {
  Ten_PLHC: string;
  soLuong: number | string;
  donViTinh: string;
  ghiChu: string;
}

interface FormPhieuDuTru {
  ghiChu?: string | null;
  chiTietPhieuDuTrus: ChiTietPhieuDuTru[];
}

const ModelCreatePhieuDuTru = (props: Props) => {
  const { open, handleClose, dataID } = props;

  const { personnelInfo } = usePersonnel();

  const { data } = queryPhanCongNoiBoByID({
    queryKey: "queryPhanCongNoiBoByID",
    params: dataID,
  });
  // console.log("dataMau", data);

  const schemaPhieuDuTru = yup.object().shape({
    ghiChu: yup
      .string()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      ),

    chiTietPhieuDuTrus: yup
      .array()
      .of(
        yup.object().shape({
          Ten_PLHC: yup.string().required("Vui lòng nhập tên phụ liệu"),
          soLuong: yup
            .number()
            .typeError("Số lượng phải là số")
            .positive("Số lượng phải lớn hơn 0")
            .required("Vui lòng nhập số lượng"),
          donViTinh: yup.string().required("Vui lòng chọn đơn vị tính"),
          ghiChu: yup.string().required("Vui lòng nhập Ghi chú"),
        })
      )
      .required()
      .min(1, "Cần ít nhất 1 chỉ tiêu"),
  });

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver<FormPhieuDuTru>(schemaPhieuDuTru),
    defaultValues: {
      ghiChu: "",
      chiTietPhieuDuTrus: [
        { Ten_PLHC: "", soLuong: 0, donViTinh: "", ghiChu: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "chiTietPhieuDuTrus",
  });

  const handleCloseModel = () => {
    handleClose();
    reset({
      ghiChu: "",
      chiTietPhieuDuTrus: [
        { Ten_PLHC: "", soLuong: 0, donViTinh: "", ghiChu: "" },
      ],
    });
  };

  const handleSettled = async (response: any) => {
    if (response?.status === 200) {
      await queryClient.refetchQueries({
        queryKey: ["DanhSachMau"],
      });
      handleClose();
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = createDuTru({
    queryKey: "createDuTru",
    onSuccess: (data: any) => {
      console.log("Tạo phiếu dự trù thành công:", data);
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

  const onSubmit = (formData: FormPhieuDuTru) => {
    const param = {
      maPdkMau: data?.maPdkMau,
      manvLapPhieu: personnelInfo?.maId,
      maKhoa: personnelInfo?.maKhoa,
      ghiChu: formData.ghiChu ?? "",
      chiTietPhieuDuTrus: formData.chiTietPhieuDuTrus.map((item: any) => ({
        donViTinh: item.donViTinh,
        soLuong: item.soLuong,
        maDmPlhc: item.Ten_PLHC,
        ghiChu: item.ghiChu ?? "",
      })),
    };
    mutate(param);
    console.log("Form Submit:", param);
  };

  useEffect(() => {
    reset({
      ghiChu: "",
      chiTietPhieuDuTrus: [
        { Ten_PLHC: "", soLuong: 0, donViTinh: "", ghiChu: "" },
      ],
    });
  }, []);

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
            Tạo phiếu dự trù mới cho mẫu ({data?.tenMau})
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
          </div>
          <div className="border-t border-gray-300 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-600">
                Chi tiết phiếu
              </h3>
              <button
                type="button"
                onClick={() =>
                  append({
                    Ten_PLHC: "",
                    soLuong: 0,
                    donViTinh: "",
                    ghiChu: "",
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
                  errors={errors?.chiTietPhieuDuTrus?.[index]}
                  fieldNamePrefix={`chiTietPhieuDuTrus.${index}`}
                />
              ))}
            </div>
            {errors.chiTietPhieuDuTrus && (
              <p className="text-red-600 text-sm/">
                {errors.chiTietPhieuDuTrus?.message}
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
    </Dialog>
  );
};

export default ModelCreatePhieuDuTru;
