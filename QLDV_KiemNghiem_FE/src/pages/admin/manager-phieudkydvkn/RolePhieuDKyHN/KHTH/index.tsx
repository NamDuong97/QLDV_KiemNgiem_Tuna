import { MouseEvent, useState } from "react";
import PopupBoloc from "../../PopupBoloc";
import {
  listPhieuDKKM_KHTH,
  listPhieuDKKNAll,
} from "../../../../../hooks/personnels/quanLyPhieuDKKM";
import { FaFilter } from "react-icons/fa";
import TableQuanLyPhieuDKyDVHN from "../../Table";
import { Pagination } from "@mui/material";
import { keyTag } from "../../../../../models/Account-Customer";

interface Props {
  setOpenXemChiTiet: React.Dispatch<React.SetStateAction<boolean>>;
  tableHead: any;
  activeFilter: string;
}

const KHTH = (props: Props) => {
  const { setOpenXemChiTiet, tableHead, activeFilter } = props;
  const { data, isLoading } = listPhieuDKKM_KHTH({
    queryKey: "listPhieuDKKM_KHTH",
    params: activeFilter ? "TT01" : undefined,
  });

  const { data: dataAll, isLoading: isLoadingAll } = listPhieuDKKNAll({
    queryKey: "listPhieuDKKNAll",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    activeFilter === keyTag.Cho_Xu_Ly
      ? data?.slice(indexOfFirstItem, indexOfLastItem)
      : dataAll?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(
    activeFilter === keyTag.Cho_Xu_Ly
      ? data && data?.length / itemsPerPage
      : dataAll && dataAll?.length / itemsPerPage
  );
  const [anchorElPopupBoloc, setAnchorElPopupBoloc] =
    useState<HTMLButtonElement | null>(null);
  const openPopupBoloc = Boolean(anchorElPopupBoloc);

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

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-2 flex justify-between">
        <div className="flex gap-4 w-full">
          {/* <InputSearch2 placeholder="Số đăng ký phân tích..." /> */}
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
          isLoading={
            activeFilter === keyTag.Cho_Xu_Ly ? isLoading : isLoadingAll
          }
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
    </>
  );
};

export default KHTH;
