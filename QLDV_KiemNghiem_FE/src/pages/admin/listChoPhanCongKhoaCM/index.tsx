import { motion } from "motion/react";
import { Align } from "../../../models/Table";
import DanhSach from "./List";
import { useStoreNotification } from "../../../configs/stores/useStoreNotification";
import { Button } from "@mui/material";

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

const DanhSachPhieuChoPhanCongKhoaCM = () => {
  const showNotification = useStoreNotification(
    (state: any) => state.showNotification
  );

  return (
    <motion.div
      key="DanhSachPhieuChoPhanCongKhoaCM"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="px-10 grid gap-6 bg-blue-50 p-6"
    >
      <div className="">
        <h1 className="text-2xl capitalize font-semibold text-gray-800">
          Danh sách phiếu chờ phân công khoa chuyên môn
        </h1>
      </div>
      <Button
        variant="contained"
        onClick={() =>
          showNotification({
            message: "Đăng nhập thành công",
            status: 200,
          })
        }
      >
        Text
      </Button>
      <DanhSach tableHead={tableHead} />
    </motion.div>
  );
};

export default DanhSachPhieuChoPhanCongKhoaCM;
