import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Align } from "../../../../../../../models/Table";
import { APP_ROUTES } from "../../../../../../../constants/routers";
import { FaEye } from "react-icons/fa";
import { GiTestTubes } from "react-icons/gi";
import { formatDate } from "../../../../../../../configs/configAll";

interface TableProps {
  tableBody: any;
  tableHead: any[];
}

const TableHoanThanh = (props: TableProps) => {
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

  const handleRedirecEditPage = (item: any) => {
    navigate(APP_ROUTES.TUNA_CUSTOMER.SHOW_PHIEU_DKY_DVKN.to);
    sessionStorage.setItem("xem-phieuDky", JSON.stringify(item));
  };

  const handleRedirecPhanTichPage = (item: any) => {
    navigate(
      APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.QUAN_LY_PHAN_TICH_KET_QUA.to
    );
    sessionStorage.setItem("xem-phan-tich-ket-qua", JSON.stringify(item));
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
          {tableBody.isLoading ? (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover={true}
              key={"isLoading"}
              className="cursor-pointer"
            >
              <TableCell align="center">
                <Skeleton variant="rounded" width={20} height={20} />
              </TableCell>
              <TableCell align="left">
                <Box className="flex gap-2 items-center justify-start">
                  <Skeleton variant="rounded" width={"100%"} height={40} />
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <Skeleton variant="rounded" width={"100%"} height={40} />
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <Skeleton variant="rounded" width={"100%"} height={40} />
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <Skeleton variant="rounded" width={"100%"} height={40} />
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <Skeleton variant="rounded" width={"100%"} height={40} />
                </Box>
              </TableCell>
            </TableRow>
          ) : tableBody?.data?.length > 0 ? (
            tableBody?.data?.map((item: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
              >
                <TableCell align="left">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-sm/4 sm:text-base/4 font-medium">
                      {item?.soDkpt}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-center">
                    <p className="text-sm/4 sm:text-base/4 font-medium">
                      {item?.nguoiGuiMau}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-center">
                    <p className="text-sm/4 sm:text-base/4 font-medium">
                      {item?.donViGuiMau}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-center">
                    <p className="text-sm/4 sm:text-base/4 font-medium">
                      {formatDate(item?.ngayGiaoMau)}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-center">
                    <p className="text-sm/4 sm:text-base/4 font-medium">
                      {formatDate(item?.ngayTao)}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center items-center gap-2">
                    <Tooltip
                      title="Xem chi tiết"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -10],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <button
                        onClick={() => handleRedirecEditPage(item)}
                        className="px-2 py-1 rounded cursor-pointer border border-solid border-yellow-500 group hover:bg-yellow-500"
                      >
                        <span className="text-base/4 lg:text-xl/6 font-bold text-yellow-500 group-hover:text-white">
                          <FaEye />
                        </span>
                      </button>
                    </Tooltip>
                    <Tooltip
                      title="Xem danh sách phân tích kết quả"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -10],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <button
                        onClick={() => handleRedirecPhanTichPage(item?.maId)}
                        className="px-2 py-1 rounded cursor-pointer border border-solid border-blue-500 group hover:bg-blue-500"
                      >
                        <span className="text-base/4 lg:text-xl/6 font-bold text-blue-500 group-hover:text-white">
                          <GiTestTubes />
                        </span>
                      </button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={6}>
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHoanThanh;
