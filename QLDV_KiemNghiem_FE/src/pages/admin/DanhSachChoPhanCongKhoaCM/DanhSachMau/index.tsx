import DanhSach from "./List";
import { Align } from "../../../../models/Table";

const tableHead = [
  {
    id: "soLo",
    sort: false,
    label: "Số lô",
    align: Align.Left,
  },
  {
    id: "mau",
    sort: false,
    label: "Mẫu kiểm nghiệm",
    align: Align.Left,
  },
  {
    id: "loaiMau",
    sort: false,
    label: "Loại mẫu",
    align: Align.Left,
  },
  {
    id: "soLuong",
    sort: false,
    label: "Số lượng",
    align: Align.Left,
  },
  {
    id: "ngaySanXuat",
    sort: false,
    label: "Ngày sản xuất",
    align: Align.Left,
  },
  {
    id: "hanSD",
    sort: false,
    label: "Hạn sử dụng",
    align: Align.Left,
  },

  {
    id: "trangThai",
    sort: false,
    label: "Trạng thái phân công",
    align: Align.Left,
  },
  {
    id: "thaoTac",
    sort: false,
    label: "Thao tác",
    align: Align.Center,
  },
];

const DanhSachMau = () => {
  return <DanhSach tableHead={tableHead} />;
};

export default DanhSachMau;
