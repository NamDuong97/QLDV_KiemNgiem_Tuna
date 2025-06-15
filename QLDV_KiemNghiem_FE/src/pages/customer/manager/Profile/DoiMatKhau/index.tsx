import { FaSave } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Inputs3 from "../../../../../components/Inputs3";
import yup from "../../../../../configs/yup.custom";
import { FormDoiMatKhau } from "../../../../../models/KhachHang";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";

interface Props {
  setisShow: React.Dispatch<React.SetStateAction<number>>;
}

const DoiMatKhau = (props: Props) => {
  const { setisShow } = props;

  let schemaDoiMatKhau = useMemo(() => {
    return yup.object().shape({
      matKhauCu: yup
        .string()
        .required("Vui lòng nhập mật khẩu cũ")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      matKhauMoi: yup
        .string()
        .required("Vui lòng nhập mật khẩu mới")
        .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
        .notOneOf(
          [yup.ref("matKhauCu")],
          "Mật khẩu mới không được trùng mật khẩu cũ"
        ),
      xacNhanMatKhauMoi: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu mới")
        .oneOf([yup.ref("matKhauMoi")], "Mật khẩu xác nhận không khớp"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDoiMatKhau>({
    resolver: yupResolver(schemaDoiMatKhau),
  });

  const DoiMatKhau = (data: FormDoiMatKhau) => {
    console.log("DoiMatKhau", data);
  };

  useEffect(() => {
    reset({
      matKhauCu: "",
      matKhauMoi: "",
      xacNhanMatKhauMoi: "",
    });
  }, []);

  return (
    <form
      className="w-full self-start bg-white rounded-xl grid gap-6 border-[1px] border-gray-300 shadow p-8"
      onSubmit={handleSubmit(DoiMatKhau)}
    >
      <div className="space-y-3">
        <div className="sm:flex items-center lg:gap-44">
          <p className="w-72 text-base/6 font-semibold text-cyan-900">
            Mật khẩu cũ:
          </p>
          <Inputs3
            placeholder="Nhập mật khẩu cũ..."
            type="password"
            name="matKhauCu"
            inputRef={register("matKhauCu")}
            errorMessage={errors.matKhauCu?.message}
          />
        </div>
        <div className="sm:flex items-center lg:gap-44">
          <p className="w-72 text-base/6 font-semibold text-cyan-900">
            Mật khẩu mới:
          </p>
          <Inputs3
            type="password"
            placeholder="Nhập mật khẩu mới..."
            name="matKhauMoi"
            inputRef={register("matKhauMoi")}
            errorMessage={errors.matKhauMoi?.message}
          />
        </div>
        <div className="sm:flex items-center lg:gap-44">
          <p className="w-72 text-base/6 font-semibold text-cyan-900">
            Xác nhận mật khẩu mới:
          </p>
          <Inputs3
            type="password"
            placeholder="Nhập xác nhận mật khẩu mới..."
            name="xacNhanMatKhauMoi"
            inputRef={register("xacNhanMatKhauMoi")}
            errorMessage={errors.xacNhanMatKhauMoi?.message}
          />
        </div>
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => setisShow(1)}
          type="button"
          className="w-full capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-center gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
        >
          <IoMdRemoveCircleOutline className="w-6 h-6" />{" "}
          <span className="pt-[2px]">Hủy</span>
        </button>
        <button className="w-full capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-center gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
          <FaSave className="w-5 h-5" /> <span className="pt-[2px]">Lưu</span>
        </button>
      </div>
    </form>
  );
};

export default DoiMatKhau;
