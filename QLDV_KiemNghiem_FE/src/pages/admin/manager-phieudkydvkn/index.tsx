import { motion } from "motion/react";
import { Inputs } from "../../../components/Inputs";
import PopupBoloc from "./PopupBoloc";
import { MouseEvent, useState } from "react";
import TableQuanLyPhieuDKyDVHN from "./Table";
import { Pagination } from "@mui/material";
import { Align } from "../../../models/Table";


const tableHead = [
  {
    id: "SoDKPT",
    sort: false,
    label: "Số đăng ký phân tích",
    align: Align.Left,
  },
  {
    id: "NguoiGuiMau",
    sort: false,
    label: "Người gửi mẫu",
    align: Align.Center,
  },
  {
    id: "DonViGuiMau",
    sort: false,
    label: "Đơn vị gửi mẫu",
    align: Align.Center,
  },
  {
    id: "NgayGiaoMau",
    sort: false,
    label: "Ngày giao mẫu",
    align: Align.Center,
  },
  {
    id: "KetQua",
    sort: false,
    label: "Kết Quả",
    align: Align.Center,
  },
];

const tableBody = [
  {
    SoDKPT: "KD02546",
    NguoiGuiMau: "Nguyễn Văn A",
    DonViGuiMau: "Công ty ABC",
    NgayGiaoMau: "25/04/2025",
    KetQua: 1,
  },
];

const QuanLyPhieuDKyDVHN = () => {
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
      key="QuanLyPhieuDKyDVHN"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 grid gap-6"
    >
      <div className="pt-6">
        <p className="text-2xl/6 font-bold text-gray-800">
          Quản Lý Phiếu Đăng Ký Dịch Vụ Kiểm Nghiệm
        </p>
      </div>
      <hr className="text-gray-300" />
      <div className="border border-solid border-gray-300 rounded-[10px] shadow-[0px_4px_6px_rgba(0,0,0,0.25)] grid gap-2">
        <div className="px-6 pt-4 flex justify-between">
          <div className="flex gap-4">
            <Inputs
              height="h-0"
              sx={{
                input: {
                  paddingBottom: "8px",
                  paddingTop: "8px",
                },
              }}
              placeholder="Số đăng ký phân tích..."
            />
            <Inputs
              height="h-0"
              sx={{
                input: {
                  paddingBottom: "8px",
                  paddingTop: "8px",
                },
              }}
              placeholder="Người gửi mẫu..."
            />
            <Inputs
              height="h-0"
              sx={{
                input: {
                  paddingBottom: "8px",
                  paddingTop: "8px",
                },
              }}
              placeholder="Đơn vị gửi mẫu..."
            />
          </div>
          <div>
            <button
              onClick={handleClickPopupBoloc}
              className="border border-solid border-gray-300 rounded-md px-3 py-[6px] text-[#677788] font-medium text-xs/4 sm:text-sm/6 flex items-center gap-2 cursor-pointer shadow-[inset_0_0_3px_rgba(0,0,0,0.2)] hover:shadow-none"
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
            <TableQuanLyPhieuDKyDVHN
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

export default QuanLyPhieuDKyDVHN;
