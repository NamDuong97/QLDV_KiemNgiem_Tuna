import { motion } from "motion/react";
import TagPhanCong from "./TagPhanCong";
import { Share } from "react-feather";
import { useState } from "react";
import PhanCong from "./PhanCong";
import DanhSach from "./DanhSach";

export const tagPhanCong = {
  Phan_Cong: "Phân công",
  Danh_Sach: "Danh sách",
};

const DanhSachPhanCongNoiBo = () => {
  const [isTag, setIsTag] = useState(tagPhanCong.Phan_Cong);
  return (
    <motion.div
      key="DanhSachMauLuu"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 space-y-6 bg-blue-50 p-6 h-screen"
    >
      <div>
        <h1 className="text-2xl capitalize font-semibold text-gray-800 flex gap-1 items-center">
          <span className="p-1 rounded bg-blue-100">
            <Share className="w-6 h-6 text-indigo-600" />
          </span>
          Phân công nội bộ
        </h1>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <TagPhanCong setIsTag={setIsTag} isTag={isTag} />
      </div>
      {isTag === tagPhanCong.Phan_Cong && <PhanCong />}
      {isTag === tagPhanCong.Danh_Sach && <DanhSach />}
    </motion.div>
  );
};

export default DanhSachPhanCongNoiBo;
