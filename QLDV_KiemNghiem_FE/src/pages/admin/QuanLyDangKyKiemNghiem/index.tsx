import { motion } from "motion/react";
import { useState } from "react";
import { keyTag } from "../../../models/Account-Customer";

import ChiTietPhieuDKyDVKN from "./ChiTietPhieuDKyDVKN";
import KHTH from "./RolePhieuDKyHN/KHTH";
import BLD from "./RolePhieuDKyHN/BLD";
import { Align } from "../../../models/Table";
import { role } from "../../../configs/parseJwt";

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
    align: Align.Left,
  },
  {
    id: "DonViGuiMau",
    sort: false,
    label: "Đơn vị gửi mẫu",
    align: Align.Left,
  },
  {
    id: "NgayGiaoMau",
    sort: false,
    label: "Ngày giao mẫu",
    align: Align.Left,
  },
  {
    id: "NgayDKy",
    sort: false,
    label: "Ngày đăng ký",
    align: Align.Left,
  },
  {
    id: "trangThai",
    sort: false,
    label: "Trạng Thái",
    align: Align.Left,
  },
  {
    id: "thaoTac",
    sort: false,
    label: "Thao tác",
    align: Align.Center,
  },
];

const QuanLyPhieuDKyDVHN = () => {
  const [activeFilter, setActiveFilter] = useState(keyTag.Cho_Xu_Ly);

  const [openXemChiTiet, setOpenXemChiTiet] = useState(false);

  const handleCloseXemChiTiet = () => {
    setOpenXemChiTiet(false);
    sessionStorage.removeItem("phieu-DKKN-xem-chi-tiet");
  };

  const handleShowTag = () => {
    switch (role) {
      case "BLD":
        return (
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
                activeFilter === keyTag.Cho_Xu_Ly
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Cho_Xu_Ly)}
            >
              Chờ duyệt phiếu
            </button>
            <button
              className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
                activeFilter === keyTag.Ban_Lanh_Dao_Duyet
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Ban_Lanh_Dao_Duyet)}
            >
              Phiếu đã duyệt
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
        );
      case "KHTH":
        return (
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
                activeFilter === keyTag.Cho_Xu_Ly
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Cho_Xu_Ly)}
            >
              Chờ duyệt phiếu
            </button>
            <button
              className={`px-3 py-1.5 cursor-pointer text-sm font-medium rounded-md ${
                activeFilter === keyTag.Nhan_Vien_Duỵet
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(keyTag.Nhan_Vien_Duỵet)}
            >
              Phiếu đã kiểm tra
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
        );
    }
  };

  return (
    <motion.div
      key="QuanLyPhieuDKyDVHN"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 space-y-6 bg-blue-50 pt-6 pb-20  min-h-screen"
    >
      <div className="">
        <h1 className="text-2xl capitalize font-semibold text-gray-800">
          Phiếu đăng ký kiểm nghiệm
        </h1>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">{handleShowTag()}</div>
      {role === "BLD" ? (
        <BLD
          setOpenXemChiTiet={setOpenXemChiTiet}
          tableHead={tableHead}
          activeFilter={activeFilter}
        />
      ) : (
        <KHTH
          setOpenXemChiTiet={setOpenXemChiTiet}
          tableHead={tableHead}
          activeFilter={activeFilter}
        />
      )}
      <ChiTietPhieuDKyDVKN
        open={openXemChiTiet}
        handleClose={handleCloseXemChiTiet}
        activeFilter={activeFilter}
      />
    </motion.div>
  );
};

export default QuanLyPhieuDKyDVHN;
