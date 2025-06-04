import { Box, Pagination } from "@mui/material";
import { MouseEvent, useState } from "react";
import TableChoXetDuyet from "./TableChoXetDuyet";
import { Align } from "../../../../../../models/Table";
import clsx from "clsx";
import PopupHuyPhieu from "./PopupHuyPhieu";
import { useGetPhieuDangKyKiemNghiemByTrangThaiArray } from "../../../../../../hooks/customers/usePhieuDKyDVKN";
import PopupBoloc from "./PopupBoloc";
import { MdOutlineFilterList } from "react-icons/md";

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
    id: "NgayTao",
    sort: false,
    label: "Ngày Tạo",
    align: Align.Center,
  },
];

const ChoXuLy = () => {
  const [listCheckbox, setListCheckbox] = useState<any>({});
  const [openPopupHuyPhieu, setOpenPopupHuyPhieu] = useState(false);

  const handleHuyPhieu = () => {
    setOpenPopupHuyPhieu(true);
  };
  const [anchorElPopupBoloc, setAnchorElPopupBoloc] =
    useState<HTMLButtonElement | null>(null);

  const handleClickPopupBoloc = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElPopupBoloc(event.currentTarget);
  };

  const handleClosePopupBoloc = () => {
    setAnchorElPopupBoloc(null);
  };

  const openPopupBoloc = Boolean(anchorElPopupBoloc);

  const dataChoTiepNhanXuLy = useGetPhieuDangKyKiemNghiemByTrangThaiArray({
    queryKey: "dataChoTiepNhanXuLy",
    maKH: "KH001",
    trangThaiIDs: ["TT01", "TT02", "TT03", "TT04", "TT05"],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = {
    data: dataChoTiepNhanXuLy?.data?.slice(indexOfFirstItem, indexOfLastItem),
    isLoading: dataChoTiepNhanXuLy.isLoading,
  };

  const totalPages = Math.ceil(
    dataChoTiepNhanXuLy?.data &&
      dataChoTiepNhanXuLy?.data?.length / itemsPerPage
  );

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box className="grid gap-4">
      <Box className="flex justify-between items-center">
        <div>
          <button
            onClick={handleClickPopupBoloc}
            className="border-2 border-solid border-gray-300 rounded-md px-3 py-[6px] text-gray-700 group hover:text-sky-600 font-semibold text-xs/4 sm:text-sm/6 flex items-center gap-2 cursor-pointer  hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
          >
            <MdOutlineFilterList />
            Bộ Lọc
            <span className="sm:px-[4px] sm:py-[3px] w-6 h-6 text-gray-800 bg-gray-200 group-hover:text-sky-600 rounded-full text-xs/4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
        <button
          onClick={handleHuyPhieu}
          disabled={Object.values(listCheckbox).length > 0 ? false : true}
          className={clsx(
            "border-[2px] border-solid bg-[#f7341e] text-white border-gray-300 rounded-md px-4 py-2 font-medium text-base/6 flex items-center gap-2  hover:shadow-[0_4px_4px_rgba(0,0,0,0.2)]",
            Object.values(listCheckbox).length > 0
              ? "cursor-pointer"
              : "cursor-no-drop !bg-[#bc3628]"
          )}
        >
          Hủy phiếu
        </button>
      </Box>
      <Box className="overflow-x-auto whitespace-nowrap border border-gray-300 rounded-md">
        <TableChoXetDuyet
          tableHead={tableHead}
          tableBody={currentItems}
          setListCheckbox={setListCheckbox}
          listCheckbox={listCheckbox}
        />
      </Box>
      {dataChoTiepNhanXuLy?.data?.length > 0 && (
        <Box className="px-4 py-2 flex justify-center">
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
            }}
          />
        </Box>
      )}
      <PopupHuyPhieu
        open={openPopupHuyPhieu}
        handleClose={() => setOpenPopupHuyPhieu(false)}
        listCheckbox={listCheckbox}
      />
      <PopupBoloc open={openPopupBoloc} handleClose={handleClosePopupBoloc} />
    </Box>
  );
};

export default ChoXuLy;
