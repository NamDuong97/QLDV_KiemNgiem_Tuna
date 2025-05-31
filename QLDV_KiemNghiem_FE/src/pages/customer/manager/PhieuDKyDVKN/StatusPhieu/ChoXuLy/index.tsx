import { Box } from "@mui/material";
import { useState } from "react";
import TableChoXetDuyet from "./TableChoXetDuyet";
import { Align } from "../../../../../../models/Table";
import clsx from "clsx";
import PopupHuyPhieu from "./PopupHuyPhieu";

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

const ChoXuLy = (props: Props) => {
  const {} = props;

  const data = localStorage.getItem("DataPhieuDangKy");
  const dataPhieuDKy = data ? JSON.parse(data) : [];
  const [listCheckbox, setListCheckbox] = useState<any[]>([]);
  const [openPopupHuyPhieu, setOpenPopupHuyPhieu] = useState(false);

  const handleHuyPhieu = () => {
    setOpenPopupHuyPhieu(true);
  };

  // const { data: dataChoTiepNhanXuLy } = usePhieuDKyDVKNALL({
  //   queryKey: "dataChoTiepNhanXuLy",
  //   maKH: "KH001",
  //   trangThaiID: maIDTrangThai,
  // });

  // console.log("dataChoTiepNhanXuLy", dataChoTiepNhanXuLy);

  return (
    <Box className="grid gap-4">
      <Box className="flex justify-end">
        <button
          onClick={handleHuyPhieu}
          disabled={listCheckbox?.length === 0 ? true : false}
          className={clsx(
            "border-[2px] border-solid bg-[#f7341e] text-white border-gray-300 rounded-md px-4 py-2 font-medium text-base/6 flex items-center gap-2 shadow-[0_4px_4px_rgba(0,0,0,0.2)] hover:shadow-none",
            listCheckbox?.length === 0
              ? "cursor-no-drop !bg-[#bc3628]"
              : "cursor-pointer"
          )}
        >
          Hủy {listCheckbox?.length} phiếu
        </button>
      </Box>
      <Box className="overflow-x-auto whitespace-nowrap border border-gray-300 rounded-md">
        <TableChoXetDuyet
          tableHead={tableHead}
          tableBody={dataPhieuDKy}
          setListCheckbox={setListCheckbox}
          listCheckbox={listCheckbox}
        />
      </Box>
      <PopupHuyPhieu
        open={openPopupHuyPhieu}
        handleClose={() => setOpenPopupHuyPhieu(false)}
      />
    </Box>
  );
};

export default ChoXuLy;
