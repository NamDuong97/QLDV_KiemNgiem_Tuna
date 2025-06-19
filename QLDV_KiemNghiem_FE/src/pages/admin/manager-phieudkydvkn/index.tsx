import { motion } from "motion/react";
import PopupBoloc from "./PopupBoloc";
import { MouseEvent, useMemo, useState } from "react";
import TableQuanLyPhieuDKyDVHN from "./Table";
import { Pagination } from "@mui/material";
import { Align } from "../../../models/Table";
import { quanLyPhieuDKKM } from "../../../hooks/personnels/quanLyPhieuDKKM";
import InputSearch2 from "../../../components/InputSearch2";
import { FaFilter } from "react-icons/fa";
import { keyTag } from "../../../models/Account-Customer";

import Cookies from "js-cookie";
import ChiTietPhieuDKyDVKN from "./ChiTietPhieuDKyDVKN";
import { EKey } from "../../../constants/commons";
import parseJwt from "../../../configs/parseJwt";

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
    id: "lienKetNhanh",
    sort: false,
    label: "Liên kết nhanh",
    align: Align.Center,
  },
];

const QuanLyPhieuDKyDVHN = () => {
  const [activeFilter, setActiveFilter] = useState(keyTag.Cho_Xu_Ly);

  const token = Cookies.get(EKey.TOKEN);
  const payload = token ? parseJwt(token) : null;
  const role =
    payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  console.log("Role:", role, payload);

  const [anchorElPopupBoloc, setAnchorElPopupBoloc] =
    useState<HTMLButtonElement | null>(null);
  const openPopupBoloc = Boolean(anchorElPopupBoloc);

  const [openXemChiTiet, setOpenXemChiTiet] = useState(false);

  const params = useMemo(() => {
    if (role === "BLD") {
      const map = {
        [keyTag.Cho_Xu_Ly]: ["TT02", "TT03"],
        [keyTag.Da_Duyet]: { trangThaiId: "TT05" },
        [keyTag.Dang_Kiem_Nghiem]: { trangThaiId: "TT07" },
        [keyTag.Hoan_Thanh]: ["TT08", "TT09"],
        [keyTag.Kiem_Tra_Lai]: { trangThaiId: "TT11" },
        [keyTag.Da_Huy]: ["TT04", "TT10"],
      };

      return map[activeFilter] ?? undefined;
    }
    return undefined;
  }, [role, activeFilter]);
  console.log("params", params);

  const { data, isLoading } = quanLyPhieuDKKM({
    queryKey: "quanLyPhieuDKKM",
    params: { trangThaiId: "TT05" },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data && data?.length / itemsPerPage);

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const handleClickPopupBoloc = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElPopupBoloc(event.currentTarget);
  };

  const handleClosePopupBoloc = () => {
    setAnchorElPopupBoloc(null);
  };

  const handleClickXemChiTiet = () => {
    setOpenXemChiTiet(true);
  };

  const handleCloseXemChiTiet = () => {
    setOpenXemChiTiet(false);
    sessionStorage.removeItem("phieu-DKKN-xem-chi-tiet");
  };

  return (
    <motion.div
      key="QuanLyPhieuDKyDVHN"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 grid gap-6 bg-blue-50 p-6"
    >
      <div className="">
        <h1 className="text-2xl capitalize font-semibold text-gray-800">
          Phiếu đăng ký kiểm nghiệm
        </h1>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
                activeFilter === keyTag.Cho_Xu_Ly
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Cho_Xu_Ly)}
            >
              Chờ xử lý
            </button>
            <button
              className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
                activeFilter === keyTag.Da_Duyet
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Da_Duyet)}
            >
              Đã duyệt
            </button>
            <button
              className={`px-3 cursor-pointer py-1.5 text-sm font-medium rounded-md ${
                activeFilter === keyTag.Dang_Kiem_Nghiem
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Dang_Kiem_Nghiem)}
            >
              Đang kiểm nghiệm
            </button>
            <button
              className={`px-3 cursor-pointer py-1.5 text-sm font-medium rounded-md ${
                activeFilter === keyTag.Hoan_Thanh
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Hoan_Thanh)}
            >
              Hoàn thành
            </button>
            <button
              className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
                activeFilter === keyTag.Da_Huy
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Da_Huy)}
            >
              Đã hủy
            </button>
            <button
              className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
                activeFilter === keyTag.Kiem_Tra_Lai
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Kiem_Tra_Lai)}
            >
              Kiểm tra lại
            </button>
            <button
              className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
                activeFilter === keyTag.Tat_Ca
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Tat_Ca)}
            >
              Tất cả
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-full">
          <InputSearch2 placeholder="Số đăng ký phân tích..." />
        </div>
        <div>
          <button
            onClick={handleClickPopupBoloc}
            className="flex items-center h-full gap-2 px-3 py-[6px] text-base/4 font-medium bg-blue-500 text-white hover:bg-blue-600 border-[2px] border-solid border-gray-300 rounded-[6px] cursor-pointer"
          >
            <FaFilter />
            Lọc
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <TableQuanLyPhieuDKyDVHN
          tableHead={tableHead}
          tableBody={currentItems}
          isLoading={isLoading}
          handleClickXemChiTiet={handleClickXemChiTiet}
        />
        <div className="p-4 flex justify-center border-t border-gray-300">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
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
      <PopupBoloc open={openPopupBoloc} handleClose={handleClosePopupBoloc} />
      <ChiTietPhieuDKyDVKN
        open={openXemChiTiet}
        handleClose={handleCloseXemChiTiet}
      />
    </motion.div>
  );
};

export default QuanLyPhieuDKyDVHN;
