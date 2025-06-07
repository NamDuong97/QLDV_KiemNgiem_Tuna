import { AnimatePresence, motion } from "motion/react";
import { Align } from "../../../../../../models/Table";
import TableHoanThanh from "./Table";

const tableHead = [
  {
    id: "MaHD",
    sort: false,
    label: "Mã hoá đơn",
    align: Align.Center,
  },
  {
    id: "SoDKPT",
    sort: false,
    label: "Số đăng ký phân tích",
    align: Align.Center,
  },

  {
    id: "TongTien",
    sort: false,
    label: "Tổng tiền",
    align: Align.Center,
  },
  {
    id: "NgayLap",
    sort: false,
    label: "Ngày lập",
    align: Align.Center,
  },
];

const tableBody = [
  {
    MaHD: "HD001",
    SoDKPT: "KD02546",
    TongTien: "150.000",
    NgayLap: "25/04/2025",
  },
];
const HoanThanh = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="DaHuy"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TableHoanThanh tableHead={tableHead} tableBody={tableBody} />
      </motion.div>
    </AnimatePresence>
  );
};

export default HoanThanh;
