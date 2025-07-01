import { motion } from "motion/react";
import CardMau from "./CardMau";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";

const TaoPhieu = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      key="TaoPhieu"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 space-y-5 bg-blue-50 p-6 h-screen"
    >
      <div className="px-6 py-4 border-b border-gray-200 space-x-2 flex items-center bg-white shadow-sm rounded-md overflow-hidden">
        <div className="flex items-center">
          <button
            onClick={() =>
              navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to)
            }
            className="cursor-pointer hover:bg-gray-100 p-1"
          >
            <IoIosArrowBack className="w-5 h-6 text-gray-700" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Tạo phiếu mẫu chưa lưu:
          </h2>
        </div>
      </div>
      <CardMau />
    </motion.div>
  );
};

export default TaoPhieu;
