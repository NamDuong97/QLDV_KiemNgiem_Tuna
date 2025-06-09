import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Align } from "../../../../models/Table";
import { APP_ROUTES } from "../../../../constants/routers";
import { FaEye } from "react-icons/fa";

interface TableProps {
  tableBody: any[];
  tableHead: any[];
  handleSort?: (value: string) => void;
}

const TableQuanLyPhieuDKyDVHN = (props: TableProps) => {
  const { tableBody, tableHead } = props;

  const navigate = useNavigate();

  const handleAlign = (align: string) => {
    switch (align) {
      case Align.Center:
        return "justify-center";
      case Align.Left:
        return "justify-start";
      case Align.Right:
        return "justify-end";
    }
  };

  const handleRedirect = (id: any) => {
    navigate(
      APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_KHOA_CHUYEN_MON.id_xem_chi_tiet
    );
    sessionStorage.setItem("xem-chi-tiet-phan-cong-khoa", JSON.stringify(id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className="bg-[#D9D9D9]">
          <TableRow>
            {tableHead.map((item) => (
              <TableCell key={item.id} padding="normal">
                <Box className={`flex items-center ${handleAlign(item.align)}`}>
                  <p className="text-sm/4 sm:text-lg/4 font-bold">
                    {item.label}
                  </p>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="bg-white">
          {tableBody?.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover={true}
              className="cursor-pointer"
            >
              <TableCell align="left">
                <Box className="flex gap-2 items-center justify-start">
                  <p className="text-sm/4 sm:text-base/4 font-medium cursor-pointer">
                    {item?.maPhieuDXuat}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.tenKH}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.timeGiaoMau}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.maNV}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.maKhoa}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center" className="!py-3">
                <Box className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => handleRedirect(item?.maPhieuDXuat)}
                    className="border-[2px] border-solid group hover:bg-gray-100 text-white border-gray-300 rounded-full p-1 font-medium text-base/6 flex justify-center cursor-pointer items-center gap-2 shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                  >
                    <FaEye className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400 " />
                  </button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableQuanLyPhieuDKyDVHN;
