import { Box, Pagination } from "@mui/material";
import { Align } from "../../../../../../models/Table";
import TableDaDuyet from "./TableDaDuyet";
import { useGetPhieuDangKyKiemNghiemByTrangThaiArray } from "../../../../../../hooks/customers/usePhieuDKyDVKN";
import { useContext, useState } from "react";
import { StoreContext } from "../../../../../../contexts/storeProvider";

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
  {
    id: "chucNang",
    sort: false,
    label: "Chức năng",
    align: Align.Center,
  },
];

const DaDuyet = () => {
  const { user } = useContext(StoreContext);
  const dataDaDuyet = useGetPhieuDangKyKiemNghiemByTrangThaiArray({
    queryKey: "dataDaDuyet",
    maKH: user?.maKh,
    trangThaiIDs: ["TT05", "TT06"],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = {
    data: dataDaDuyet?.data?.slice(indexOfFirstItem, indexOfLastItem),
    isLoading: dataDaDuyet.isLoading,
  };

  const totalPages = Math.ceil(
    dataDaDuyet?.data && dataDaDuyet?.data?.length / itemsPerPage
  );

  const handlePageChange = (event: any, value: number) => {
    console.log("event", event);
    setCurrentPage(value);
  };

  return (
    <Box className="grid gap-4">
      <Box className="overflow-x-auto whitespace-nowrap border border-gray-300 rounded-md">
        <TableDaDuyet tableHead={tableHead} tableBody={currentItems} />
      </Box>
      {dataDaDuyet?.data?.length > 0 && (
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
    </Box>
  );
};

export default DaDuyet;
