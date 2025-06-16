import { useContext, useState } from "react";
import { StoreContext } from "../../../../contexts/storeProvider";
import {
  FaMapMarkerAlt,
  FaMobileAlt,
  FaRegUser,
  FaUserCog,
} from "react-icons/fa";
import { IoBusiness } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { image } from "../../../../constants/image";
import { RiLockPasswordFill } from "react-icons/ri";
import DoiMatKhau from "./DoiMatKhau";
import CapNhatTTCN from "./CapNhatTTCN";

const ProfileCustomer = () => {
  const { userInfo } = useContext(StoreContext);
  const [isShow, setisShow] = useState(1);

  const handleShow = () => {
    switch (isShow as number) {
      case 2:
        return <CapNhatTTCN setisShow={setisShow} />;
      case 3:
        return <DoiMatKhau setisShow={setisShow} />;
      default:
        return (
          <div className="w-full self-start bg-white rounded-xl grid gap-6 border-[1px] border-gray-300 shadow py-8 px-2 sm:p-8">
            <div className="flex justify-center">
              <img
                src={image.imageYelling}
                alt="imageYelling"
                className="w-56 h-56"
              />
            </div>
            <div className="grid xl:flex xl:justify-center gap-6">
              <button
                onClick={() => setisShow(2)}
                className="w-full capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-center gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
              >
                <FaUserCog className="w-5 h-5" />{" "}
                <span className="pt-[2px]">Chỉnh sửa thông tin cá nhân</span>
              </button>
              <button
                onClick={() => setisShow(3)}
                className="w-full capitalize border-[2px] border-solid  hover:bg-gray-100 text-cyan-800 border-gray-300 rounded-md px-4 py-2 font-semibold text-base/6 flex justify-center cursor-pointer items-center gap-2 hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
              >
                <RiLockPasswordFill className="w-5 h-5" />{" "}
                <span className="pt-[2px]">Đổi mật khẩu</span>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="grid lg:flex gap-6">
      <div className="self-start bg-white rounded-xl grid gap-6 border-[1px] border-gray-300 shadow px-5 sm:pl-8 sm:pr-52 py-5">
        <div className="w-full space-y-7">
          <div className="space-y-3">
            <p className="uppercase text-cyan-800 text-lg/6 font-bold">
              Thông tin cá nhân
            </p>
            <div className="flex items-center text-cyan-900">
              <span className="w-8 font-bold">
                <FaRegUser className="w-5 h-5" />
              </span>
              <span className="font-medium">{userInfo.tenNguoiDaiDien}</span>
            </div>
            <div className="flex items-center text-cyan-900">
              <span className="w-8 font-bold">
                <IoBusiness className="w-5 h-5" />
              </span>
              <span className="font-medium">{userInfo.tenKh}</span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="uppercase text-cyan-900 text-lg/6 font-bold">
              Thông tin liên lạc
            </p>
            <div className="flex items-center text-cyan-900">
              <span className="w-8 font-bold">
                <IoIosMail className="w-6 h-6" />
              </span>
              <span className="font-medium">{userInfo.email}</span>
            </div>
            <div className="flex items-center text-cyan-900">
              <span className="w-8 font-bold">
                <FaMobileAlt className="w-6 h-6" />
              </span>
              <span className="font-medium">{userInfo.soDienThoai}</span>
            </div>
            <div className="flex items-center text-cyan-900">
              <span className="w-8 font-bold">
                <FaMapMarkerAlt className="w-6 h-6" />
              </span>
              <span className="font-medium">{userInfo.diaChi}</span>
            </div>
          </div>
        </div>
      </div>
      {handleShow()}
    </div>
  );
};

export default ProfileCustomer;
