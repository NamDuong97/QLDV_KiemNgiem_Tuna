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
import { Align } from "../../../../../../../models/Table";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../../../constants/routers";

interface TableProps {
  tableBody: any[];
  tableHead: any[];
  handleSort?: (value: string) => void;
}

const TableThanhToan = (props: TableProps) => {
  const { tableBody, tableHead } = props;

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

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(
      APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.SHOW_THANH_TOAN_HOA_DON.to
    );
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
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.MaHD}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.SoDKPT}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.TongTien}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.NgayLap}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center" className="!py-3">
                <Box className="flex gap-2 items-center justify-center">
                  <button
                    onClick={handleRedirect}
                    className="capitalize border-[2px] border-solid bg-blue-600 hover:bg-blue-500 text-white border-gray-300 rounded-md px-4 py-2 font-medium text-base/6 flex justify-center cursor-pointer items-center gap-2 shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                  >
                    Xem chi tiết
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

export default TableThanhToan;
