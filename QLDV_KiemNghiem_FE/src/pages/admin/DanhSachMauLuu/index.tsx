import { motion } from "motion/react";
import { Align } from "../../../models/Table";
import DanhSach from "./List";


const tableHead = [
  {
    id: "maPhieuLuu",
    sort: false,
    label: "Mã phiếu lưu",
    align: Align.Left,
  },
  {
    id: "mau",
    sort: false,
    label: "Mẫu kiểm nghiệm",
    align: Align.Left,
  },
  {
    id: "soLuong",
    sort: false,
    label: "Số lượng",
    align: Align.Left,
  },
  {
    id: "ThoiGianLuu",
    sort: false,
    label: "Thời gian lưu",
    align: Align.Left,
  },
  {
    id: "LuuDenNgay",
    sort: false,
    label: "Lưu đến ngày",
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
    label: "Trạng thái",
    align: Align.Left,
  },
  {
    id: "thaoTac",
    sort: false,
    label: "Thao tác",
    align: Align.Center,
  },
];

const DanhSachMauLuu = () => {
  return (
    <motion.div
      key="DanhSachMauLuu"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 space-y-6 bg-blue-50 p-6 h-screen"
    >
      <div className="">
        <h1 className="text-2xl capitalize font-semibold text-gray-800">
          Danh sách mẫu lưu nghiểm nghiệm
        </h1>
      </div>
      <DanhSach tableHead={tableHead} />
    </motion.div>
  );
};

export default DanhSachMauLuu;
