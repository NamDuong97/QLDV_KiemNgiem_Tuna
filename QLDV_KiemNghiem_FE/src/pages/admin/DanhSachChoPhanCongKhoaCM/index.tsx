import { motion } from "motion/react";
import CardMau from "./CardMau";


const DanhSachPhieuChoPhanCongKhoaCM = () => {


  return (
    <motion.div
      key="DanhSachPhieuChoPhanCongKhoaCM"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 space-y-5 bg-blue-50 p-6 h-screen"
    >
      <h1 className="text-2xl capitalize font-semibold text-gray-800">
        Danh sách mẫu chờ phân công khoa chuyên môn
      </h1>
      
      <CardMau />
    </motion.div>
  );
};

export default DanhSachPhieuChoPhanCongKhoaCM;
