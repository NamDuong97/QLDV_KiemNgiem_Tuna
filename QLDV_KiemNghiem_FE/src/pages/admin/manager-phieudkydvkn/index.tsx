import { motion } from "motion/react";
import { useState } from "react";
import { keyTag } from "../../../models/Account-Customer";

import ChiTietPhieuDKyDVKN from "./ChiTietPhieuDKyDVKN";
import KHTH from "./RolePhieuDKyHN/KHTH";
import BLD from "./RolePhieuDKyHN/BLD";
import { Align } from "../../../models/Table";
import { role } from "../../../configs/parseJwt";
import Card from "../dashboard/Card";
import {
  AlertTriangle,
  CheckCircle,
  Clipboard,
  Clock,
  TrendingDown,
  TrendingUp,
} from "react-feather";

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

  const [openXemChiTiet, setOpenXemChiTiet] = useState(false);

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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Tổng phiếu"
          value="1,284"
          icon={<Clipboard className="w-6 h-6" />}
          trend="up"
          trendValue="12%"
          trendIcon={<TrendingUp className="inline w-4 h-4 mr-1" />}
          bgColor="bg-indigo-100"
          textColor="text-indigo-600"
        />
        <Card
          title="Đã hoàn thành"
          value="876"
          icon={<CheckCircle className="w-6 h-6" />}
          trend="up"
          trendValue="8%"
          trendIcon={<TrendingUp className="inline w-4 h-4 mr-1" />}
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <Card
          title="Đang xử lý"
          value="328"
          icon={<Clock className="w-6 h-6" />}
          trend="up"
          trendValue="5%"
          trendIcon={<TrendingUp className="inline w-4 h-4 mr-1" />}
          bgColor="bg-yellow-100"
          textColor="text-yellow-600"
        />
        <Card
          title="Không đạt"
          value="80"
          icon={<AlertTriangle className="w-6 h-6" />}
          trend="down"
          trendValue="3%"
          trendIcon={<TrendingDown className="inline w-4 h-4 mr-1" />}
          bgColor="bg-red-100"
          textColor="text-red-600"
        />
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
              Chờ duyệt phiếu
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
      />
    </motion.div>
  );
};

export default QuanLyPhieuDKyDVHN;
