import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "../../../../../../configs/yup.custom";
import { useStoreNotification } from "../../../../../../configs/stores/useStoreNotification";
import { queryClient } from "../../../../../../lib/reactQuery";
import { useTruongPhongDuyet } from "../../../../../../hooks/personnels/phanCongKhoa";
import { usePersonnel } from "../../../../../../contexts/PersonelsProvider";

interface Props {
  id?: any;
  handleCloseDuyet: () => void;
}

interface FormGhiChu {
  ghiChu: string;
}

const FormGhiChuDuyet = (props: Props) => {
  const { id, handleCloseDuyet } = props;

  const { personnelInfo } = usePersonnel();

  let schema = useMemo(() => {
    return yup.object().shape({
      ghiChu: yup.string().required("Yêu cầu nhập lý do duyệt"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormGhiChu>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleOnSettled = async (response: any) => {
    if (response.ketQua === true) {
      await queryClient.refetchQueries({
        queryKey: ["quanLyPhieuDKKMs_BLD"],
      });
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate } = useTruongPhongDuyet({
    queryKey: "useTruongPhongDuyet",
    onSuccess: (res: any) => {
      const { ketQua, message } = res;
      if (ketQua !== true) {
        showNotification({
          message: message || "Duyệt mẫu thất bại. Vui lòng thử lại.",
          ketQua: ketQua,
        });
        return;
      }
      showNotification({ message: "Duyệt mẫu thành công", status: 200 });
    },
    onSettled: handleOnSettled,
  });

  const handleTruongPhongDuyet = (data: FormGhiChu) => {
    const params = {
      message: data.ghiChu,
      action: true,
      maId: id,
      maKhoa: personnelInfo?.maKhoa,
    };
    mutate(params);
    console.log("handleTruongPhongDuyet", params);
  };

  useEffect(() => {
    reset({
      ghiChu: "",
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(handleTruongPhongDuyet)} className="space-y-2">
      <h4 className="text-base/6 font-semibold text-gray-500">Ghi chú:</h4>
      <div>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 min-h-[106px] max-h-[106px] focus-within:outline-1 focus-within:border focus-within:border-blue-300 h-"
          rows={3}
          {...register("ghiChu")}
          placeholder="Nhập lý do duyệt..."
        />
        {errors.ghiChu?.message && (
          <p className="text-[#af1c10] !font-medium !text-sm/[140%]">
            {errors.ghiChu?.message}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={handleCloseDuyet}
          className="bg-yellow-100 hover:bg-yellow-200 cursor-pointer px-6 py-2 rounded-md"
        >
          <p className="text-sm font-medium text-yellow-700">Hủy</p>
        </button>
        <button className="bg-green-100 hover:bg-green-200 cursor-pointer px-6 py-2 rounded-md">
          <p className="text-sm font-medium text-green-700">Gửi</p>
        </button>
      </div>
    </form>
  );
};

export default FormGhiChuDuyet;
