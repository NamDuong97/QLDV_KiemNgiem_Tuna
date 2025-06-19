import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "../../../../../configs/yup.custom";
import { FormLyDoHuy } from "../../../../../models/LydoHuy";
import { queryClient } from "../../../../../lib/reactQuery";
import {
  useDanhGiaBLD,
  useDanhGiaNhanVien,
} from "../../../../../hooks/personnels/quanLyPhieuDKKM";

interface Props {
  id: any;
  roll: any;
  handleClose: () => void;
}

const PopupHuyPhieu = (props: Props) => {
  const { id, roll, handleClose } = props;

  let schema = useMemo(() => {
    return yup.object().shape({
      lydo: yup.string().required("Yêu cầu nhập lý do hủy"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormLyDoHuy>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleOnSettled = async (response: any) => {
    await queryClient.refetchQueries({
      queryKey: ["quanLyPhieuDKKM"],
    });
    if (response.ketQua === true) {
      reset({ lydo: "" });
      handleClose();
    }
  };
  const { mutate: mutateBLD } = useDanhGiaBLD({
    queryKey: "useDanhGiaBLD",
    onSettled: handleOnSettled,
  });

  const { mutate: mutateNhanVien } = useDanhGiaNhanVien({
    queryKey: "DanhGiaNhanVienTuChoi",
    onSettled: handleOnSettled,
  });

  const handleHuyPhieu = (data: FormLyDoHuy) => {
    const params = {
      maPhieuDangKy: id,
      message: data.lydo,
      action: false,
    };
    if (roll === "roll") mutateNhanVien(params);
    mutateBLD(params);
  };
  useEffect(() => {
    reset({
      lydo: "",
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(handleHuyPhieu)} className="space-y-2">
      <h4 className="text-base/6 font-semibold text-gray-500">
        Lý do từ chối:
      </h4>
      <div>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 min-h-[106px] max-h-[106px] focus-within:outline-1 focus-within:border focus-within:border-blue-300 h-"
          rows={3}
          {...register("lydo")}
          placeholder="Nhập lý do từ chối..."
        />
        {errors.lydo?.message && (
          <p className="text-[#af1c10] !font-medium !text-sm/[140%]">
            {errors.lydo?.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <button className="bg-green-100 hover:bg-green-200 cursor-pointer px-6 py-2 rounded-md">
          <p className="text-sm font-medium text-green-700">Gửi</p>
        </button>
      </div>
    </form>
  );
};

export default PopupHuyPhieu;
