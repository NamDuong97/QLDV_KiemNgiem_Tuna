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
import { Align } from "../../../../../../../models/Table";
import { APP_ROUTES } from "../../../../../../../constants/routers";

interface TableProps {
  tableBody: any[];
  tableHead: any[];
}

const TableDangKiemNghiem = (props: TableProps) => {
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

  const changeUrlParam = (url: any, id: any) => {
    return url.replace(/:id/, id);
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
                  <p className="text-sm/4 sm:text-base/4 font-medium hover:underline cursor-pointer">
                    {item?.SoDKPT}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p
                    onClick={() =>
                      navigate(
                        `${changeUrlParam(
                          APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.to,
                          item.NguoiGuiMau
                        )}?tuna=phieu-dang-ky`
                      )
                    }
                    className="text-sm/4 sm:text-base/4 font-medium"
                  >
                    {item?.NguoiGuiMau}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.DonViGuiMau}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.NgayGiaoMau}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.KetQua === 1 ? " Tiếng Anh" : "Tiếng Việt"}
                  </p>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDangKiemNghiem;
