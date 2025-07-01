import { motion } from "motion/react";
import TagPhanCong from "./TagPhanCong";
import { useState } from "react";
import PhanCong from "./PhanCong";
import DanhSach from "./DanhSach";
import { getRoleGroup } from "../../../configs/Role";
import { role } from "../../../configs/parseJwt";
import LichSuPhanCong from "./LichSuPhanCong";
import clsx from "clsx";

export const tagPhanCong = {
  Phan_Cong: "Phân công",
  Danh_Sach: "Danh sách",
  Lich_Su_Phan_Cong: "Lịch sử phân công",
};

const DanhSachPhanCongNoiBo = () => {
  const [isTag, setIsTag] = useState(
    role === "KN" ? tagPhanCong.Danh_Sach : tagPhanCong.Phan_Cong
  );
  return (
    <motion.div
      key="DanhSachMauLuu"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx("px-10 space-y-6 bg-blue-50 p-6 h-screen", {
        "h-screen": tagPhanCong.Phan_Cong === isTag,
      })}
    >
      <div>
        <h1 className="text-2xl capitalize font-semibold text-gray-800 flex gap-1 items-center">
          Phân công nội bộ
        </h1>
      </div>

      {(getRoleGroup(role) === "KN" || getRoleGroup(role) === "BLD") && (
        <>
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
            <TagPhanCong setIsTag={setIsTag} isTag={isTag} />
            <button className="text-blue-600 cursor-pointer hover:underline">
              Hướng dẫn sử dụng
            </button>
          </div>
          {role !== "KN" && isTag === tagPhanCong.Phan_Cong && (
            <motion.div
              key="PhanCong"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <PhanCong
                handleDanhSachPhanCong={() => setIsTag(tagPhanCong.Danh_Sach)}
              />
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
              <DanhSach
                handleTaoPhanCong={() => setIsTag(tagPhanCong.Phan_Cong)}
              />
            </motion.div>
          )}
          {role !== "KN" && isTag === tagPhanCong.Lich_Su_Phan_Cong && (
            <motion.div
              key="PhanCong"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <LichSuPhanCong />
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default DanhSachPhanCongNoiBo;
