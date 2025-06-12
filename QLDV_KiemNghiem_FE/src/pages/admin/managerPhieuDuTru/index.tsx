import { motion } from "motion/react";
import PopupBoloc from "./PopupBoloc";
import { MouseEvent, useState } from "react";
import { Pagination } from "@mui/material";
import { Align } from "../../../models/Table";
import { IoMdArrowDropup } from "react-icons/io";
import PopoverChucNang from "./PopoverChucNang";
import TableQuanLyPhieuDuTru from "./Table";

const tableHead = [
  {
    id: "maPhieuDuTru",
    sort: false,
    label: "Mã phiếu dự trù",
    align: Align.Left,
  },
  {
    id: "tenNhanVienLap",
    sort: true,
    label: "Tên nhân viên lập",
    align: Align.Center,
  },
  {
    id: "tenMau",
    sort: true,
    label: "Tên mẫu",
    align: Align.Center,
  },
  {
    id: "ngayTao",
    sort: true,
    label: "Ngày tạo",
    align: Align.Center,
  },
  {
    id: "khoa",
    sort: true,
    label: "Khoa",
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
    maPhieuDuTru: "PDT-HC-20250611-001",
    tenNhanVienLap: "Trần Văn Dũng",
    tenMau: "Hóa chất A - Lô 123",
    ngayTao: "2025-06-11",
    khoa: "Khoa Hóa Sinh",
  },
  {
    maPhieuDuTru: "PDT-HC-20250611-002",
    tenNhanVienLap: "Trần Văn Dũng",
    tenMau: "Dung môi B - Lô 456",
    ngayTao: "2025-06-11",
    khoa: "Khoa Xét nghiệm",
  },
  {
    maPhieuDuTru: "PDT-HC-20250612-003",
    tenNhanVienLap: "Trần Văn Dũng",
    tenMau: "Vật tư C - Lô 789",
    ngayTao: "2025-06-12",
    khoa: "Khoa Vi Sinh",
  },
];

const QuanLyPhieuDuTru = () => {
  const [anchorElPopupBoloc, setAnchorElPopupBoloc] =
    useState<HTMLButtonElement | null>(null);
  const [anchorElPopoverChucNang, setAnchorElPopoverChucNang] =
    useState<HTMLButtonElement | null>(null);

  const handleClickPopupBoloc = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElPopupBoloc(event.currentTarget);
  };

  const handleClosePopupBoloc = () => {
    setAnchorElPopupBoloc(null);
  };

  const openPopupBoloc = Boolean(anchorElPopupBoloc);
  const openPopoverChucNang = Boolean(anchorElPopoverChucNang);

  const handleClickPopoverChucNang = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElPopoverChucNang(event.currentTarget);
  };

  const handleClosePopoverChucNang = () => {
    setAnchorElPopoverChucNang(null);
  };

  return (
    <motion.div
      key="QuanLyPhieuDuTru"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 py-20 grid gap-6"
    >
      <div className="relative bg-cyan-800 text-center px-6 py-6 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <p className="text-3xl/6 uppercase font-bold text-white">
          Quản Lý phiếu dự trù
        </p>
        <button
          onClick={handleClickPopoverChucNang}
          className="absolute top-4 right-24 bg-cyan-800 text-center p-1 cursor-pointer rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        >
          <IoMdArrowDropup
            className={`w-6 h-6 text-white ${
              anchorElPopoverChucNang && "rotate-180"
            }`}
          />
        </button>
        <PopoverChucNang
          open={openPopoverChucNang}
          handleClose={handleClosePopoverChucNang}
          anchorEl={anchorElPopoverChucNang}
        />
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
            <TableQuanLyPhieuDuTru
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

export default QuanLyPhieuDuTru;
