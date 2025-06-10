import { motion } from "motion/react";
import PopupBoloc from "./PopupBoloc";
import { MouseEvent, useState } from "react";
import { Pagination } from "@mui/material";
import { Align } from "../../../models/Table";
import { IoMdArrowDropup } from "react-icons/io";
import PopoverChucNang from "./PopoverChucNang";
import TableQuanLyLuuMau from "./Table";

const tableHead = [
  {
    id: "maPhieu",
    sort: false,
    label: "Mã phiếu lưu mẫu",
    align: Align.Left,
  },
  {
    id: "tenMau",
    sort: false,
    label: "Tên mẫu",
    align: Align.Center,
  },
  {
    id: "khoiLuongLuu",
    sort: false,
    label: "Khối lượng mẫu lưu",
    align: Align.Center,
  },
  {
    id: "hanSuDung",
    sort: false,
    label: "Hạn sử dụng",
    align: Align.Center,
  },
  {
    id: "khoaLuuMau",
    sort: false,
    label: "Khoa Lưu mẫu",
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
    maPhieu: "PLM-001",
    tenMau: "Mẫu dược liệu A",
    khoiLuongLuu: "150g",
    hanSuDung: "10/06/2026",
    khoaLuuMau: "Khoa Dược liệu",
  },
  {
    maPhieu: "PLM-002",
    tenMau: "Mẫu thuốc viên B",
    khoiLuongLuu: "200g",
    hanSuDung: "20/11/2025",
    khoaLuuMau: "Khoa Kiểm nghiệm",
  },
  {
    maPhieu: "PLM-003",
    tenMau: "Mẫu cao lỏng C",
    khoiLuongLuu: "100ml",
    hanSuDung: "15/08/2025",
    khoaLuuMau: "Khoa Bào chế",
  },
  {
    maPhieu: "PLM-004",
    tenMau: "Mẫu dược phẩm D",
    khoiLuongLuu: "300g",
    hanSuDung: "01/01/2027",
    khoaLuuMau: "Khoa Lưu trữ",
  },
  {
    maPhieu: "PLM-005",
    tenMau: "Mẫu nguyên liệu E",
    khoiLuongLuu: "500g",
    hanSuDung: "30/09/2026",
    khoaLuuMau: "Khoa Nghiên cứu",
  },
];

const QuanLyPhieuLuuMau = () => {
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
      key="QuanLyPhieuLuuMau"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 py-20 grid gap-6"
    >
      <div className="relative bg-cyan-800 text-center px-6 py-6 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <p className="text-3xl/6 uppercase font-bold text-white">
          Quản Lý lưu mẫu
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
            <TableQuanLyLuuMau tableHead={tableHead} tableBody={tableBody} />
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

export default QuanLyPhieuLuuMau;
