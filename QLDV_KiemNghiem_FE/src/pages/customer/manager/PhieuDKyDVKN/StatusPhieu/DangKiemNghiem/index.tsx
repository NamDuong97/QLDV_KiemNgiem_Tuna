import { Box, Pagination } from "@mui/material";
import TableDangKiemNghiem from "./TableDangKiemNghiem";
import { Align } from "../../../../../../models/Table";
import { useContext, useState } from "react";
import { useGetPhieuDangKyKiemNghiemByTrangThaiArray } from "../../../../../../hooks/customers/usePhieuDKyDVKN";
import { StoreContext } from "../../../../../../contexts/storeProvider";

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

const DangKiemNghiem = (props: Props) => {
  const {} = props;
  const { userInfo } = useContext(StoreContext);
  const dataDangKiemNghiem = useGetPhieuDangKyKiemNghiemByTrangThaiArray({
    queryKey: "dataDangKiemNghiem",
    maKH: userInfo?.maId,
    trangThaiIDs: ["TT07", "TT11"],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = {
    data: dataDangKiemNghiem?.data?.slice(indexOfFirstItem, indexOfLastItem),
    isLoading: dataDangKiemNghiem.isLoading,
  };

  const totalPages = Math.ceil(
    dataDangKiemNghiem?.data && dataDangKiemNghiem?.data?.length / itemsPerPage
  );

  const handlePageChange = (event: any, value: number) => {
    console.log("event", event);
    setCurrentPage(value);
  };

  return (
    <Box className="grid gap-4">
      <Box className="overflow-x-auto whitespace-nowrap border border-gray-300 rounded-md">
        <TableDangKiemNghiem tableHead={tableHead} tableBody={currentItems} />
      </Box>
      {dataDangKiemNghiem?.data?.length > 0 && (
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

export default DangKiemNghiem;
