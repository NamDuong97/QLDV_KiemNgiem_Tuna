import { motion } from "motion/react";
import { Align } from "../../../models/Table";
import DanhSach from "./List";

const tableHead = [
  {
    id: "soLo",
    sort: false,
    label: "Số lô",
    align: Align.Left,
  },
  {
    id: "mau",
    sort: false,
    label: "Mẫu kiểm nghiệm",
    align: Align.Left,
  },
  {
    id: "loaiMau",
    sort: false,
    label: "Loại mẫu",
    align: Align.Left,
  },
  {
    id: "soLuong",
    sort: false,
    label: "Số lượng",
    align: Align.Left,
  },
  {
    id: "ngaySanXuat",
    sort: false,
    label: "Ngày sản xuất",
    align: Align.Left,
  },
  {
    id: "hanSD",
    sort: false,
    label: "Hạn sử dụng",
    align: Align.Left,
  },

  {
    id: "trangThai",
    sort: false,
    label: "Trạng thái phân công",
    align: Align.Left,
  },
  {
    id: "thaoTac",
    sort: false,
    label: "Thao tác",
    align: Align.Center,
  },
];

const DanhSachMau = () => {
  return (
    <motion.div
      key="DanhSachMau"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 space-y-6 bg-blue-50 p-6 h-screen"
    >
      <div className="">
        <h1 className="text-2xl capitalize font-semibold text-gray-800">
          Danh sách mẫu kiểm nghiểm nghiệm
        </h1>
      </div>
      <DanhSach tableHead={tableHead} />
    </motion.div>
  );
};

export default DanhSachMau;
