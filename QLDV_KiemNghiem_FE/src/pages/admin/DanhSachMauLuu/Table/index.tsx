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
import { FaEdit, FaEye } from "react-icons/fa";
import { formatDate } from "../../../../configs/configAll";
import { Trash2 } from "react-feather";
import { role } from "../../../../configs/parseJwt";

interface TableProps {
  tableBody: any[];
  tableHead: any[];
  isLoading?: boolean;
  handleOpenChiTiet: () => void;
  handleOpenSuaMauLuu: () => void;
  handleOpenXoa: (id: any, trangThai: any) => void;
}

const TableQuanLyPhieuDKyDVHN = (props: TableProps) => {
  const {
    tableBody,
    tableHead,
    isLoading,
    handleOpenChiTiet,
    handleOpenSuaMauLuu,
    handleOpenXoa,
  } = props;

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

  const handleRedirectSua = (id: any) => {
    handleOpenSuaMauLuu();
    sessionStorage.setItem("chi-tiet-mau-luu-sua", JSON.stringify(id));
  };

  const handleRedirectChiTiet = (id: any) => {
    handleOpenChiTiet();
    sessionStorage.setItem("chi-tiet-mau-luu", JSON.stringify(id));
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
        <TableHead className="bg-gray-100">
          <TableRow>
            {tableHead.map((item) => (
              <TableCell key={item.id} padding="normal">
                <Box className={`flex items-center ${handleAlign(item.align)}`}>
                  <p className="text-base/4 font-[550] text-gray-600">
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
                      onClick={() => handleRedirectChiTiet(item?.maId)}
                    >
                      {item?.maPhieuLuu}
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
                      {`${item?.soLuong} ${item?.donViTinh}`}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-base/4 font-medium text-gray-700">
                      {formatDate(item?.luuDenNgay)}
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
                    {item?.trangThai === "active" ? (
                      <p
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800`}
                      >
                        Đã lưu
                      </p>
                    ) : (
                      <p
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800`}
                      >
                        Đã hủy
                      </p>
                    )}
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
                        onClick={() => handleRedirectChiTiet(item?.maId)}
                        className="text-blue-700 font-medium text-sm/6 cursor-pointer flex gap-2 items-center"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                    </Tooltip>
                    {(role === "KN_L" || role === "KN_P") && (
                      <>
                        <Tooltip
                          title="Sửa mẫu lưu"
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
                            onClick={() => handleRedirectSua(item?.maId)}
                            className="text-blue-700 font-medium text-sm/6 cursor-pointer flex gap-2 items-center"
                          >
                            <FaEdit className="w-5 h-5" />
                          </button>
                        </Tooltip>
                        <Tooltip
                          title="Sửa mẫu lưu"
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
                            onClick={() =>
                              handleOpenXoa(item?.maId, item?.trangThai)
                            }
                            className="text-red-700 font-medium text-sm/6 cursor-pointer flex gap-2 items-center"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </Tooltip>
                      </>
                    )}
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
              <TableCell colSpan={7}>
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
