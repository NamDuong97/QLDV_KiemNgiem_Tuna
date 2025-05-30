import { Box, Pagination } from "@mui/material";
import { useState } from "react";
import TableChoXetDuyet from "./TableChoXetDuyet";
import { Align } from "../../../../../../models/Table";
import PopupHuyPhieu from "./PopupHuyPhieu";
import PopupBolocChoXetDuyet from "./PopupBolocChoXetDuyet";
import { usePhieuDKyDVKNALL } from "../../../../../../hooks/customers/usePhieuDKyDVKN";

interface Props {
  maIDTrangThai?: string;
}

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

const ChoTiepNhanXuLy = (props: Props) => {
  const { maIDTrangThai } = props;

  const data = localStorage.getItem("DataPhieuDangKy");
  const dataPhieuDKy = data ? JSON.parse(data) : [];
  const [listCheckbox, setListCheckbox] = useState<any[]>([]);
  const [openPopupHuyPhieu, setOpenPopupHuyPhieu] = useState(false);

  const [openPopupBolocChoXetDuyet, setOpenPopupBolocChoXetDuyet] =
    useState(false);

  const handleHuyPhieu = () => {
    setOpenPopupHuyPhieu(true);
  };

  const { data: dataChoTiepNhanXuLy } = usePhieuDKyDVKNALL({
    queryKey: "dataChoTiepNhanXuLy",
    maKH: "KH001",
    trangThaiID: maIDTrangThai,
  });

  console.log("dataChoTiepNhanXuLy", dataChoTiepNhanXuLy);

  return (
    <Box className="grid gap-4">
      <Box className="flex justify-between">
        <Box>
          <button
            onClick={() => setOpenPopupBolocChoXetDuyet(true)}
            className="border border-solid border-gray-300 rounded-md px-3 py-[6px] text-[#677788] font-medium text-xs/4 sm:text-sm/6 flex items-center gap-2 cursor-pointer shadow-[inset_0_0_3px_rgba(0,0,0,0.2)] hover:shadow-none"
          >
            Bộ Lọc
            <span className="sm:px-[4px] sm:py-[3px] w-6 h-6 text-gray-800 bg-gray-200 rounded-full text-xs/4 flex items-center justify-center">
              0
            </span>
          </button>
        </Box>
        {listCheckbox?.length > 0 && (
          <Box>
            <button
              onClick={handleHuyPhieu}
              className="border border-solid bg-[#fabf35] text-white border-gray-300 rounded-md px-4 py-2 font-medium text-base/6 flex items-center gap-2 cursor-pointer shadow-[inset_0_0_3px_rgba(0,0,0,0.2)] hover:shadow-none hover:border-[#d3b672] hover:bg-[#eaca7f]"
            >
              Hủy phiếu
            </button>
          </Box>
        )}
      </Box>
      <Box className="overflow-x-auto whitespace-nowrap">
        <TableChoXetDuyet
          tableHead={tableHead}
          tableBody={dataPhieuDKy}
          setListCheckbox={setListCheckbox}
          listCheckbox={listCheckbox}
        />
      </Box>
      <Box className="px-4 py-2 flex justify-center">
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
      </Box>
      <PopupHuyPhieu
        open={openPopupHuyPhieu}
        handleClose={() => setOpenPopupHuyPhieu(false)}
      />
      <PopupBolocChoXetDuyet
        open={openPopupBolocChoXetDuyet}
        handleClose={() => setOpenPopupBolocChoXetDuyet(false)}
      />
    </Box>
  );
};

export default ChoTiepNhanXuLy;
