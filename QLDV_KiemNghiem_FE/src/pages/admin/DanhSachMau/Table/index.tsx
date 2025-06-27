import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Align } from "../../../../models/Table";
import { FaEye } from "react-icons/fa";
import { formatDate, renderTrangThaiMau } from "../../../../configs/configAll";

interface TableProps {
  tableBody: any[];
  tableHead: any[];
  isLoading?: boolean;
  handleOpenChiTiet: () => void;
}

const TableQuanLyPhieuDKyDVHN = (props: TableProps) => {
  const { tableBody, tableHead, isLoading, handleOpenChiTiet } = props;

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

  const handleRedirectChiTiet = (id: any) => {
    handleOpenChiTiet();
    sessionStorage.setItem("chi-tiet-mau-kiem-nghiem", JSON.stringify(id));
  };

  return (
    <TableContainer
      sx={{
        "&.MuiTableContainer-root": {
          borderRadius: 2,
        },
      }}
    >
      <Table>
        <TableHead className="bg-gray-200">
          <TableRow>
            {tableHead.map((item) => (
              <TableCell key={item.id} padding="normal">
                <Box className={`flex items-center ${handleAlign(item.align)}`}>
                  <p className="text-base/4 font-bold text-gray-700">
                    {item.label}
                  </p>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover={true}
              className="cursor-pointer"
            >
              <TableCell align="left">
                <div className="flex justify-start">
                  <Skeleton variant="rounded" width={150} height={30} />
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={150} height={30} />
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={150} height={30} />
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={150} height={30} />
                </div>
              </TableCell>
              <TableCell align="center" className="!py-3">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={150} height={30} />
                </div>
              </TableCell>{" "}
              <TableCell align="center" className="!py-3">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={150} height={30} />
                </div>
              </TableCell>{" "}
              <TableCell align="center" className="!py-3">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={150} height={30} />
                </div>
              </TableCell>{" "}
              <TableCell align="center" className="!py-3">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={150} height={30} />
                </div>
              </TableCell>
            </TableRow>
          ) : tableBody?.length > 0 ? (
            tableBody?.map((item: any, index: any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
                className="cursor-pointer"
              >
                <TableCell align="left">
                  <Box className="flex gap-2 items-center justify-start">
                    <p
                      className="text-base/4 font-medium cursor-pointer text-blue-700 hover:underline"
                      onClick={() => handleRedirectChiTiet(item?.maPhieuDangKy)}
                    >
                      {item?.soLo}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-base/4 font-medium text-gray-700">
                      {item?.tenMau}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-base/4 font-medium text-gray-700">
                      {item?.tenLoaiMau}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-base/4 font-medium text-gray-700">
                      {`${item?.soLuong} ${item?.donViTinh}`}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-base/4 font-medium text-gray-700">
                      {formatDate(item?.ngaySanXuat)}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-base/4 font-medium text-gray-700">
                      {formatDate(item?.hanSuDung)}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-base/4 font-medium text-gray-700">
                      {renderTrangThaiMau(item?.trangThaiPhanCong)}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center" className="!py-3">
                  <Box className="flex gap-3 items-center justify-center">
                    <Tooltip
                      title="Xem chi tiết"
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                      disableInteractive
                    >
                      <button
                        onClick={() => handleRedirectChiTiet(item?.maPhieuDangKy)}
                        className="text-blue-700 font-medium text-sm/6 cursor-pointer flex gap-2 items-center"
                      >
                        <FaEye className="w-5 h-5" /> Xem chi tiết
                      </button>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover={true}
              className="cursor-pointer"
            >
              <TableCell colSpan={9}>
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium cursor-pointer text-gray-500 hover:underline">
                    Không tìm thấy
                  </p>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableQuanLyPhieuDKyDVHN;
