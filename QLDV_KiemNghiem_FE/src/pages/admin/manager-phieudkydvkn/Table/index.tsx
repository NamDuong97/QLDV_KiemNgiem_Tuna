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
import { ImUsers } from "react-icons/im";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";

interface TableProps {
  tableBody: any[];
  tableHead: any[];
  handleSort?: (value: string) => void;
  isLoading: boolean;
  handleClickXemChiTiet: () => void;
}

const TableQuanLyPhieuDKyDVHN = (props: TableProps) => {
  const { tableBody, tableHead, handleClickXemChiTiet, isLoading } = props;

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
  const handleRedirectXemChiTiet = (id: any) => {
    handleClickXemChiTiet();
    sessionStorage.setItem("phieu-DKKN-xem-chi-tiet", JSON.stringify(id));
  };

  const handleRedirectPhanCong = (id: any) => {
    navigate(APP_ROUTES.TUNA_ADMIN.PHAN_CONG_PHONG_CHUYEN_MON.to);
    sessionStorage.setItem("phan-cong", JSON.stringify(id));
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
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
              <TableCell align="center" className="!py-3">
                <div className="flex justify-center">
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            tableBody?.map((item) => (
              <TableRow
                key={item.maId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
                className="cursor-pointer"
              >
                <TableCell align="left">
                  <Box className="flex gap-2 items-center justify-start">
                    <p
                      className="text-base/4 font-medium cursor-pointer text-blue-700 hover:underline"
                      onClick={() => handleRedirectXemChiTiet(item?.maId)}
                    >
                      {item?.soDkpt}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-center">
                    <p className="text-base/4 font-medium text-gray-700">
                      {item?.nguoiGuiMau}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-center">
                    <p className="text-base/4 font-medium text-gray-700">
                      {item?.donViGuiMau}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-center">
                    <p className="text-base/4 font-medium text-gray-700">
                      {new Date(item?.ngayGiaoMau).toLocaleDateString("vi-VN")}
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
                        onClick={() => handleRedirectXemChiTiet(item?.maId)}
                        className="text-blue-700 font-semibold text-sm/6 cursor-pointer flex gap-2 items-center"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                    </Tooltip>
                    {item.trangThaiId === "TT05" && (
                      <Tooltip
                        title="Phân công"
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
                          onClick={() => handleRedirectPhanCong(item?.maId)}
                          className="text-blue-700 font-semibold text-sm/6 cursor-pointer flex gap-2 items-center"
                        >
                          <ImUsers className="w-5 h-5" />
                        </button>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableQuanLyPhieuDKyDVHN;
