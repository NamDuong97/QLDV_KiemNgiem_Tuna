import { Box } from "@mui/material";
import { Align } from "../../../../../../models/Table";
import TableChoXuLy from "./Table";
import { AnimatePresence, motion } from "motion/react";
import { ImSearch } from "react-icons/im";

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

const ChoXuLy = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="ChoXuLy"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-4"
      >
        <label className="border border-gray-300 flex py-1 px-4 rounded-md group focus-within:border-blue-500 cursor-text">
          <Box className="py-[2px] flex gap-2 items-center flex-1 pr-4">
            <ImSearch />
            <input
              type="search"
              placeholder="Tìm kiếm hóa đơn..."
              className="focus:outline-none w-full bg-transparent"
            />
          </Box>
          <Box className="pl-4 py-[2px] border-l border-gray-300 flex-none">
            <button className="capitalize border-[2px] border-solid bg-cyan-700 hover:bg-cyan-800 text-white border-gray-300 rounded-md px-4 py-1 font-medium text-base/6 flex justify-center cursor-pointer items-center gap-2 shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
              Tìm kiếm
            </button>
          </Box>
        </label>
        <TableChoXuLy tableHead={tableHead} tableBody={tableBody} />
      </motion.div>
    </AnimatePresence>
  );
};

export default ChoXuLy;
