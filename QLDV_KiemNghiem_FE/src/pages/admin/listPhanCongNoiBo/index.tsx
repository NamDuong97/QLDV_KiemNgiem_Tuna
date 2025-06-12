import { motion } from "motion/react";
import PopupBoloc from "./PopupBoloc";
import { MouseEvent, useState } from "react";
import { Pagination } from "@mui/material";
import { Align } from "../../../models/Table";
import TableDanhSachPhanCongNoiNo from "./Table";

const tableHead = [
  {
    id: "maPhieuPhanCong",
    sort: false,
    label: "Mã phiếu phân công",
    align: Align.Left,
  },
  {
    id: "tenNhanVienThucHien",
    sort: true,
    label: "Tên nhân viên thực hiện",
    align: Align.Center,
  },
  {
    id: "thoiGianPhanCong",
    sort: true,
    label: "Thời gian phân công",
    align: Align.Center,
  },
  {
    id: "nguoiTaoPhieu",
    sort: true,
    label: "Người tạo phiếu",
    align: Align.Center,
  },
  {
    id: "trangThaiPhanCong",
    sort: true,
    label: "Trạng thái phân công",
    align: Align.Center,
  },
  {
    id: "lienKetNhanh",
    sort: false,
    label: "Liên kết nhanh",
    align: Align.Center,
  },
];

const tableBody = [
  {
    maPhieuPhanCong: "PCNB-001-20250610",
    tenNhanVienThucHien: "Nguyễn Văn A",
    thoiGianPhanCong: "2025-06-10 09:00:00",
    nguoiTaoPhieu: "Lê Thị B",
    trangThaiPhanCong: "Đang xử lý",
  },
  {
    maPhieuPhanCong: "PCNB-006-20250611",
    tenNhanVienThucHien: "Nguyễn Văn A",
    thoiGianPhanCong: "2025-06-11 10:15:00",
    nguoiTaoPhieu: "Phạm Văn D",
    trangThaiPhanCong: "Chưa bắt đầu",
  },
  {
    maPhieuPhanCong: "PCNB-007-20250611",
    tenNhanVienThucHien: "Nguyễn Văn A",
    thoiGianPhanCong: "2025-06-11 15:30:00",
    nguoiTaoPhieu: "Lê Thị B",
    trangThaiPhanCong: "Hoàn thành",
  },
];

const DanhSachPhanCongNoiBo = () => {
  const [anchorElPopupBoloc, setAnchorElPopupBoloc] =
    useState<HTMLButtonElement | null>(null);

  const handleClickPopupBoloc = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElPopupBoloc(event.currentTarget);
  };

  const handleClosePopupBoloc = () => {
    setAnchorElPopupBoloc(null);
  };

  const openPopupBoloc = Boolean(anchorElPopupBoloc);

  return (
    <motion.div
      key="DanhSachPhanCongNoiBo"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 py-20 grid gap-6"
    >
      <div className="bg-cyan-800 text-center px-6 py-6 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <p className="text-3xl/6 uppercase font-bold text-white">
          Danh sách phân công nội bộ
        </p>
      </div>
      <div className="border-[2px] border-solid border-gray-300 rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] grid gap-2">
        <div className="px-6 pt-4 flex justify-between">
          <div>
            <button
              onClick={handleClickPopupBoloc}
              className="flex items-center gap-2 px-3 py-[6px] text-base/4 font-medium bg-teal-600 text-white hover:bg-teal-700 border-[2px] border-solid border-gray-300 rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              Bộ Lọc
              <span className="sm:px-[4px] sm:py-[3px] w-6 h-6 text-gray-800 bg-gray-200 rounded-full text-xs/4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
        <hr className="text-gray-300" />
        <div className="grid gap-4 px-6 pt-4 pb-6">
          <div>
            <TableDanhSachPhanCongNoiNo
              tableHead={tableHead}
              tableBody={tableBody}
            />
          </div>
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
        </div>
      </div>
      <PopupBoloc open={openPopupBoloc} handleClose={handleClosePopupBoloc} />
    </motion.div>
  );
};

export default DanhSachPhanCongNoiBo;
