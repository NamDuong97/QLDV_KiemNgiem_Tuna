import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "../../../../../../configs/yup.custom";
import { queryClient } from "../../../../../../lib/reactQuery";
import { usePersonnel } from "../../../../../../contexts/PersonelsProvider";
import { useStoreNotification } from "../../../../../../configs/stores/useStoreNotification";
import {
  useBLDDuyet,
  useTruongPhongDuyet,
} from "../../../../../../hooks/personnels/phanCongKhoa";
import { getRoleGroup } from "../../../../../../configs/Role";
import { role } from "../../../../../../configs/parseJwt";

interface Props {
  ChiTietID?: any;
  handleCloseTuChoi: () => void;
}

interface FormGhiChu {
  ghiChu: string;
}

const FormGhiChuTuChoi = (props: Props) => {
  const { ChiTietID, handleCloseTuChoi } = props;

  let schema = useMemo(() => {
    return yup.object().shape({
      ghiChu: yup.string().required("Yêu cầu nhập lý do từ chối"),
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

  const { personnelInfo } = usePersonnel();
  const handleOnSettled = async (response: any) => {
    if (response.ketQua === true) {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["ChitietPhieuDKKM"],
        }),
        queryClient.refetchQueries({
          queryKey: ["getPhanCongKhoaCMAll"],
        }),
      ]);
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate: mutate } = useTruongPhongDuyet({
    queryKey: "useTruongPhongDuyet",
    onSettled: handleOnSettled,
    onSuccess: (res: any) => {
      const { ketQua, message } = res;
      if (ketQua !== true) {
        showNotification({
          message: message || "Thao tác thất bại. Vui lòng thử lại.",
          ketQua: ketQua,
        });
        return;
      }
      showNotification({ message: "Thao tác thành công", status: 200 });
      handleCloseTuChoi();
    },
  });

  const { mutate: mutateBLD } = useBLDDuyet({
    queryKey: "useBLDDuyet",
    onSettled: handleOnSettled,
    onSuccess: (res: any) => {
      const { ketQua, message } = res;
      if (ketQua !== true) {
        showNotification({
          message: message || "Thao tác thất bại. Vui lòng thử lại.",
          ketQua: ketQua,
        });
        return;
      }
      showNotification({ message: "Thao tác thành công", status: 200 });
    },
  });

  const handleHuyPhieu = (data: FormGhiChu) => {
    if (getRoleGroup(role) === "BLD") {
      const paramsBLD = {
        action: false,
        maId: ChiTietID,
        message: data.ghiChu,
      };
      mutateBLD(paramsBLD);
    } else {
      const params = {
        message: data.ghiChu,
        action: false,
        maId: ChiTietID,
        maKhoa: personnelInfo?.maKhoa,
      };
      mutate(params);
    }
  };

  useEffect(() => {
    reset({
      ghiChu: "",
    });
  }, []);

  console.log("getRoleGroup(role)", getRoleGroup(role));

  return (
    <form onSubmit={handleSubmit(handleHuyPhieu)} className="space-y-2">
      <h4 className="text-base/6 font-semibold text-gray-500">Ghi chú:</h4>
      <div>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 min-h-[106px] max-h-[106px] focus-within:outline-1 focus-within:border focus-within:border-blue-300 h-"
          rows={3}
          {...register("ghiChu")}
          placeholder="Nhập lý do từ chối..."
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
          onClick={handleCloseTuChoi}
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

export default FormGhiChuTuChoi;
