import { useForm } from "react-hook-form";
import yup from "../../../../../../configs/yup.custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { UseMutateFunction } from "@tanstack/react-query";
import { useEffect } from "react";

interface Props {
  onCancel: () => void;
  mutateNhanXet: UseMutateFunction<any, Error, any, unknown>;
  saveIdTienDo: any;
}

const FormNhanXet = (props: Props) => {
  const { onCancel, mutateNhanXet, saveIdTienDo } = props;

  const schema = yup.object().shape({
    nhanXet: yup
      .string()
      .required("Vui lòng nhập nhận xét")
      .min(5, "Nhận xét ít nhất 5 ký tự"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleNhanXet = (data: any) => {
    const params = {
      maId: saveIdTienDo,
      message: data.nhanXet,
    };
    mutateNhanXet(params);
    console.log("saveIdTienDo", params);
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <form
      onSubmit={handleSubmit(handleNhanXet)}
      className="p-4 border border-gray-300 bg-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full"
    >
      <h2 className="text-lg font-semibold mb-4">Nhận xét tiến độ</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          Nội dung nhận xét
        </label>
        <textarea
          {...register("nhanXet")}
          rows={4}
          className="w-full border border-gray-300 max-h-28 min-h-28 rounded-lg p-2 focus:outline-0 focus-within:outline-1 focus-within:ring-2 focus-within:ring-blue-500"
          placeholder="Nhập nhận xét về tiến độ..."
        ></textarea>
        {errors.nhanXet && (
          <p className="text-red-600 text-sm mt-1">{errors.nhanXet.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi"}
        </button>
      </div>
    </form>
  );
};

export default FormNhanXet;
