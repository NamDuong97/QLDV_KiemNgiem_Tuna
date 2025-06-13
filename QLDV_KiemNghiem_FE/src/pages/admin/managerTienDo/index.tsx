import { motion } from "motion/react";
import PopupBoloc from "./PopupBoloc";
import { MouseEvent, useState } from "react";
import { Pagination } from "@mui/material";
import { Align } from "../../../models/Table";
import { IoMdArrowDropup } from "react-icons/io";
import PopoverChucNang from "./PopoverChucNang";
import TableQuanLyPhieuXuatKho from "./Table";
import TableQuanLyPhieuTienDo from "./Table";

const tableHead = [
  {
    id: "maPhieuTienDo",
    sort: false,
    label: "Mã Phiếu Tiến Độ",
    align: Align.Left,
  },
  {
    id: "tenGiaiDoanThucHien",
    sort: true,
    label: "Tên Giai Đoạn Thực Hiện",
    align: Align.Left,
  },
  {
    id: "ngayNhanMau",
    sort: true,
    label: "Ngày Nhận Mẫu",
    align: Align.Center,
  },

  {
    id: "thoiGianTu",
    sort: true,
    label: "Thời Gian Từ",
    align: Align.Center,
  },
  {
    id: "thoiGianDen",
    sort: true,
    label: "Thời Gian Đến",
    align: Align.Center,
  },
  {
    id: "tongThoiGianThucHien",
    sort: false, // Thường là giá trị tính toán, không cần sắp xếp
    label: "Tổng Thời Gian Thực Hiện",
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
    id: "PTD001",
    maPhieuTienDo: "PTD-001-20250612",
    ngayNhanMau: "2025-06-10",
    tenGiaiDoanThucHien: "Gia công ban đầu",
    thoiGianTu: "2025-06-10 09:00",
    thoiGianDen: "2025-06-10 17:00",
    tongThoiGianThucHien: "8 giờ",
  },
  {
    id: "PTD002",
    maPhieuTienDo: "PTD-002-20250612",
    ngayNhanMau: "2025-06-11",
    tenGiaiDoanThucHien: "Phân tích mẫu A",
    thoiGianTu: "2025-06-11 08:30",
    thoiGianDen: "2025-06-12 12:00",
    tongThoiGianThucHien: "27 giờ 30 phút",
  },
  {
    id: "PTD003",
    maPhieuTienDo: "PTD-003-20250613",
    ngayNhanMau: "2025-06-12",
    tenGiaiDoanThucHien: "Kiểm tra chất lượng",
    thoiGianTu: "2025-06-12 14:00",
    thoiGianDen: "2025-06-13 10:00",
    tongThoiGianThucHien: "20 giờ",
  },
  {
    id: "PTD004",
    maPhieuTienDo: "PTD-004-20250613",
    ngayNhanMau: "2025-06-13",
    tenGiaiDoanThucHien: "Hoàn thiện báo cáo",
    thoiGianTu: "2025-06-13 09:00",
    thoiGianDen: "2025-06-13 17:00",
    tongThoiGianThucHien: "8 giờ",
  },
];

const QuanLyPhieuTienDo = () => {
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
      key="QuanLyPhieuTienDo"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 py-20 grid gap-6"
    >
      <div className="relative bg-cyan-800 text-center px-6 py-6 rounded-full border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <p className="text-3xl/6 uppercase font-bold text-white">
          Quản lý tiến độ
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
            <TableQuanLyPhieuTienDo
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
                button: {
                  boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
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

export default QuanLyPhieuTienDo;
