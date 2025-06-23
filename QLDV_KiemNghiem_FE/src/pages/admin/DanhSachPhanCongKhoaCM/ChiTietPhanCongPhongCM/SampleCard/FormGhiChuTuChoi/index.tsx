import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "../../../../../../configs/yup.custom";
import { queryClient } from "../../../../../../lib/reactQuery";

interface Props {
  id?: any;
  roll?: any;
  handleHuyTuChoi: () => void;
}

interface FormGhiChu {
  ghiChu: string;
}

const FormGhiChuTuChoi = (props: Props) => {
  const { id, roll, handleHuyTuChoi } = props;

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

  const handleOnSettled = async (response: any) => {
    await queryClient.refetchQueries({
      queryKey: ["quanLyPhieuDKKM"],
    });
    if (response.ketQua === true) {
      reset({ ghiChu: "" });
      handleHuyTuChoi();
    }
  };

  const handleHuyPhieu = (data: FormGhiChu) => {
    console.log("data", data);

    const params = {
      maPhieuDangKy: id,
      message: data.ghiChu,
      action: false,
    };
    // if (roll === "roll") mutateNhanVien(params);
    // mutateBLD(params);
  };

  useEffect(() => {
    reset({
      ghiChu: "",
    });
  }, []);

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
          onClick={handleHuyTuChoi}
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
