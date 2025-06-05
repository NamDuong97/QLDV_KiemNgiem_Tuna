import { Box, Pagination } from "@mui/material";
import { useState } from "react";
// import { useLocation, useNavigate } from "react-router";
import { Align } from "../../../../models/Table";
import { motion } from "motion/react";
import TableQuanLyHoaDon from "./Table";
import PopupBoloc from "./popupBoloc";

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
    align: Align.Left,
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
    id: "GhiChu",
    sort: false,
    label: "Ghi chú",
    align: Align.Center,
  },
  {
    id: "TrangThai",
    sort: false,
    label: "Trạng thái",
    align: Align.Center,
  },
];

const tableBody = [
  {
    MaHD: "HD001",
    SoDKPT: "KD02546",
    TongTien: "",
    NgayLap: "25/04/2025",
    GhiChu: "25/04/2025",
    TrangThai: "Đang chờ xử lý",
  },
];

const QuanLyHoaDon = () => {
  // const navigate = useNavigate();
  // const url = useLocation();

  const [openPopupBoloc, setOpenPopupBoloc] = useState(false);

  // const handleClickMenu = () => {
  //   return isSidebarMobile
  //     ? handleIsOpenSidebarMobile(true)
  //     : setIsMenu(!isMenu);
  // };

  return (
    <motion.div
      key="QuanLyHoaDon"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="border border-solid border-gray-300 rounded-[10px] p-2 sm:px-6 sm:py-5 w-full grid gap-6"
    >
      <Box className="grid gap-4">
        <Box className="flex justify-between">
          <Box>
            <button
              onClick={() => setOpenPopupBoloc(true)}
              className="border border-solid border-gray-300 rounded-md px-3 py-[6px] text-[#677788] font-medium text-xs/4 sm:text-sm/6 flex items-center gap-2 cursor-pointer shadow-[inset_0_0_3px_rgba(0,0,0,0.2)] hover:shadow-none"
            >
              Bộ Lọc
              <span className="sm:px-[4px] sm:py-[3px] w-6 h-6 text-gray-800 bg-gray-200 rounded-full text-xs/4 flex items-center justify-center">
                0
              </span>
            </button>
          </Box>
        </Box>
        <Box className="overflow-x-auto whitespace-nowrap">
          <TableQuanLyHoaDon tableHead={tableHead} tableBody={tableBody} />
        </Box>
        <Box className="px-4 py-2 flex justify-center">
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
        </Box>
      </Box>
      <PopupBoloc
        open={openPopupBoloc}
        handleClose={() => setOpenPopupBoloc(false)}
      />
    </motion.div>
  );
};

export default QuanLyHoaDon;
