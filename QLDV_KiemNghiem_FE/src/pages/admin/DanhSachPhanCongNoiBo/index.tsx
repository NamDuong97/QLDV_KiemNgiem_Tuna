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
      transition={{ duration: 0.5 }}
      className="px-10 space-y-6 bg-blue-50 p-6 h-screen"
    >
      <div>
        <h1 className="text-2xl capitalize font-semibold text-gray-800 flex gap-1 items-center">
          Phân công nội bộ
        </h1>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <TagPhanCong setIsTag={setIsTag} isTag={isTag} />
      </div>
      {isTag === tagPhanCong.Phan_Cong && (
        <motion.div
          key="PhanCong"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <PhanCong />
        </motion.div>
      )}
      {isTag === tagPhanCong.Danh_Sach && (
        <motion.div
          key="DanhSach"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <DanhSach handleTaoPhanCong={() => setIsTag(tagPhanCong.Phan_Cong)} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default DanhSachPhanCongNoiBo;
