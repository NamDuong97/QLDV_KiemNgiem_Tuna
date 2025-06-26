import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "../../../../../configs/yup.custom";
import { queryClient } from "../../../../../lib/reactQuery";
import {
  useDanhGiaBLD,
  useDanhGiaNhanVien,
  useUndoDanhGiaBLD,
} from "../../../../../hooks/personnels/quanLyPhieuDKKM";
import { role } from "../../../../../configs/parseJwt";
import { useStoreNotification } from "../../../../../configs/stores/useStoreNotification";
import { getRoleGroup } from "../../../../../configs/Role";

interface Props {
  id: any;
  handleClose: () => void;
  closeGhiChu: () => void;
  trangThaiID: any;
}

interface FormGhiChu {
  ghiChu: string;
}

const FormGhiChuHoanTac = (props: Props) => {
  const { id, handleClose, closeGhiChu, trangThaiID } = props;

  let schema = useMemo(() => {
    return yup.object().shape({
      ghiChu: yup.string().required("Yêu cầu nhập ghi chú"),
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

  const handleOnSettledBLD = async (response: any) => {
    if (response.ketQua === true) {
      handleClose();
      await queryClient.refetchQueries({
        queryKey: ["quanLyPhieuDKKMs_BLD"],
      });
    }
  };
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  const { mutate: mutate } = useUndoDanhGiaBLD({
    queryKey: "useDanhGiaBLD",
    onSettled: handleOnSettledBLD,
    onSuccess: (res: any) => {
      const { ketQua, message } = res;
      if (ketQua !== true) {
        showNotification({
          message: message || "Hoàn tác thất bại. Vui lòng thử lại.",
          ketQua: ketQua,
        });
        return;
      }
      showNotification({ message: "Hoàn tác thành công", status: 200 });
      handleClose();
    },
  });

  const handleDuyet = (data: FormGhiChu) => {
    const params = {
      maPhieuDangKy: id,
      message: data.ghiChu,
    };
    mutate(params);
  };
  useEffect(() => {
    reset({
      ghiChu: "",
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(handleDuyet)} className="space-y-2">
      <h4 className="text-base/6 font-semibold text-gray-500">
        Ghi chú{" "}
        {getRoleGroup(role) === "KHTH" && (
          <span className="font-medium">(Duyệt không thể thu hồi)*</span>
        )}
      </h4>
      <div>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 min-h-[106px] max-h-[106px] focus-within:outline-1 focus-within:border focus-within:border-blue-300"
          rows={3}
          {...register("ghiChu")}
          placeholder="Nhập ghi chú..."
        />
        {errors.ghiChu?.message && (
          <p className="text-[#af1c10] !font-medium !text-sm/[140%]">
            {errors.ghiChu?.message}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-2">
        {getRoleGroup(role) === "KHTH" && (
          <button
            type="button"
            onClick={closeGhiChu}
            className="bg-yellow-100 hover:bg-yellow-200 cursor-pointer px-6 py-2 rounded-md"
          >
            <p className="text-sm font-medium text-yellow-700">Hủy</p>
          </button>
        )}
        <button className="bg-green-100 hover:bg-green-200 cursor-pointer px-6 py-2 rounded-md">
          <p className="text-sm font-medium text-green-700">Gửi</p>
        </button>
      </div>
    </form>
  );
};

export default FormGhiChuHoanTac;
