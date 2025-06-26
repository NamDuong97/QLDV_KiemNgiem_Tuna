import { motion } from "motion/react";
import { Align } from "../../../models/Table";
import DanhSach from "./List";

const tableHead = [
  {
    id: "maPhieuDXuat",
    sort: false,
    label: "Mã phiếu đề xuất",
    align: Align.Left,
  },
  {
    id: "timeGiaoMau",
    sort: false,
    label: "Thời gian giao mẫu",
    align: Align.Left,
  },
  {
    id: "maNV",
    sort: false,
    label: "Nhân viên đề xuất",
    align: Align.Left,
  },
  {
    id: "maKhoa",
    sort: false,
    label: "Khoa Tiếp nhận",
    align: Align.Left,
  },
  {
    id: "mauChuaDuyet",
    sort: false,
    label: "Số mẫu chưa duyệt",
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

const DanhSachPhanCongKhoaCM = () => {
  return (
    <motion.div
      key="DanhSachPhanCongKhoaCM"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 space-y-6 bg-blue-50 p-6 h-screen"
    >
      <div className="">
        <h1 className="text-2xl capitalize font-semibold text-gray-800">
          Danh sách phân công khoa chuyên môn
        </h1>
      </div>
      <DanhSach tableHead={tableHead} />
    </motion.div>
  );
};

export default DanhSachPhanCongKhoaCM;
