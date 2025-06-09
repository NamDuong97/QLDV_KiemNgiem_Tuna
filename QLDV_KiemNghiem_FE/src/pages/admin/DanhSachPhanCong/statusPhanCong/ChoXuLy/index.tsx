import { Box, Pagination } from "@mui/material";
import TableChoXuLy from "./Table";
import { AnimatePresence, motion } from "motion/react";
import { ImSearch } from "react-icons/im";
import { Align } from "../../../../../models/Table";

const tableHead = [
  {
    id: "maPhieuDX",
    sort: false,
    label: "Mã phiếu đề xuất",
    align: Align.Center,
  },
  {
    id: "tenKH",
    sort: false,
    label: "Tên Khách Hàng",
    align: Align.Center,
  },

  {
    id: "timeGiaoMau",
    sort: false,
    label: "Thời gian giao mẫu",
    align: Align.Center,
  },
  {
    id: "maNV",
    sort: false,
    label: "Nhân viên đề xuất",
    align: Align.Center,
  },
  {
    id: "maPDKy",
    sort: false,
    label: "Mã Phiếu Đăng ký",
    align: Align.Center,
  },
  {
    id: "lienKetNhanh",
    sort: false,
    label: "Liên Kết Nhanh",
    align: Align.Center,
  },
];

const tableBody = [
  {
    maPhieuDX: "DX001",
    tenKH: "Nguyễn Văn A",
    timeGiaoMau: "11/6/2025",
    maNV: "Phạm Văn A",
    maPDKy: "SPDK001",
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
        <div className="px-4 py-2 flex justify-center">
          <Pagination
            count={10}
            // page={currentPage}
            // onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            sx={{
              '[aria-label="Go to next page"],[aria-label="Go to previous page"]':
                {
                  backgroundColor: "#1976d21f",
                  border: "1px solid #1976d280",
                  color: "#1976d2",
                },
              ".MuiPagination-ul": {
                justifyContent: "center",
              },
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChoXuLy;
