import { Box } from "@mui/material";
import { Align } from "../../../../../../models/Table";
import TableHoanThanh from "./TableHoanThanh";

interface Props {}

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

const HoanThanh = (props: Props) => {
  const {} = props;

  const data = localStorage.getItem("DataPhieuDangKy");
  const dataPhieuDKy = data ? JSON.parse(data) : [];

  // const { data: dataChoTiepNhanXuLy } = usePhieuDKyDVKNALL({
  //   queryKey: "dataChoTiepNhanXuLy",
  //   maKH: "KH001",
  //   trangThaiID: maIDTrangThai,
  // });

  // console.log("dataChoTiepNhanXuLy", dataChoTiepNhanXuLy);

  return (
    <Box className="overflow-x-auto whitespace-nowrap border border-gray-300 rounded-md">
      <TableHoanThanh tableHead={tableHead} tableBody={dataPhieuDKy} />
    </Box>
  );
};

export default HoanThanh;
