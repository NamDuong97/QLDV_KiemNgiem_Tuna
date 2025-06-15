import React, { useContext, useEffect, useMemo } from "react";
import { FaSave } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Inputs3 from "../../../../../components/Inputs3";
import { FormTTCN } from "../../../../../models/KhachHang";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "../../../../../configs/yup.custom";
import { StoreContext } from "../../../../../contexts/storeProvider";

interface Props {
  setisShow: React.Dispatch<React.SetStateAction<number>>;
}

const CapNhatTTCN = (props: Props) => {
  const { setisShow } = props;
  const { userInfo } = useContext(StoreContext);

  const schemaTTCN = useMemo(() => {
    return yup.object().shape({
      hoTen: yup.string().required("Vui lòng nhập họ và tên"),
      congTy: yup.string().required("Vui lòng nhập tên công ty"),
      soDienThoai: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
      email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Email không hợp lệ"),
      diaChi: yup.string().required("Vui lòng nhập địa chỉ"),
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTTCN>({
    resolver: yupResolver(schemaTTCN),
  });

  const onSubmit = (data: FormTTCN) => {
    console.log("Thông tin cá nhân:", data);
  };

  useEffect(() => {
    if (userInfo)
      reset({
        hoTen: userInfo.tenNguoiDaiDien || "",
        congTy: userInfo.tenKh || "",
        soDienThoai: userInfo.soDienThoai || "",
        email: userInfo.email || "",
        diaChi: userInfo.diaChi || "",
      });
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full self-start bg-white rounded-xl grid gap-6 border-[1px] border-gray-300 shadow p-8"
    >
      <div className="space-y-3">
        <div className="sm:flex items-center lg:gap-44">
          <p className="w-72 text-base font-semibold text-cyan-900">
            Họ và tên:
          </p>
          <Inputs3
            placeholder="Nhập họ và tên..."
            name="hoTen"
            inputRef={register("hoTen")}
            errorMessage={errors.hoTen?.message}
          />
        </div>

        <div className="sm:flex items-center lg:gap-44">
          <p className="w-72 text-base font-semibold text-cyan-900">Công ty:</p>
          <Inputs3
            placeholder="Nhập tên công ty..."
            name="congTy"
            inputRef={register("congTy")}
            errorMessage={errors.congTy?.message}
          />
        </div>

        <div className="sm:flex items-center lg:gap-44">
          <p className="w-72 text-base font-semibold text-cyan-900">
            Số điện thoại:
          </p>
          <Inputs3
            placeholder="Nhập số điện thoại..."
            name="soDienThoai"
            inputRef={register("soDienThoai")}
            errorMessage={errors.soDienThoai?.message}
          />
        </div>

        <div className="sm:flex items-center lg:gap-44">
          <p className="w-72 text-base font-semibold text-cyan-900">Email:</p>
          <Inputs3
            placeholder="Nhập email..."
            name="email"
            inputRef={register("email")}
            errorMessage={errors.email?.message}
          />
        </div>

        <div className="sm:flex items-center lg:gap-44">
          <p className="w-72 text-base font-semibold text-cyan-900">Địa chỉ:</p>
          <Inputs3
            placeholder="Nhập địa chỉ..."
            name="diaChi"
            inputRef={register("diaChi")}
            errorMessage={errors.diaChi?.message}
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

export default CapNhatTTCN;
