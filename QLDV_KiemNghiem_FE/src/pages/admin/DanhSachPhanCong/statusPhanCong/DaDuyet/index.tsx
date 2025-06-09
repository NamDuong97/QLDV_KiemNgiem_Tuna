import { AnimatePresence, motion } from "motion/react";
import { Align } from "../../../../../models/Table";
import TableHoanThanh from "./Table";
import { Pagination } from "@mui/material";

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
  {
    id: "lienKetNhanh",
    sort: false,
    label: "Liên Kết Nhanh",
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
const DaDuyet = () => {
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

export default DaDuyet;
