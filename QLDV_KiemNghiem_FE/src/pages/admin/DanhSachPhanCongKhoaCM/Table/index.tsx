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
import { queryKhoaAll } from "../../../../hooks/personnels/queryKhoa";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";
import {
  formatDate,
  renderTrangThaiPhieuDeXuatPhongBan,
} from "../../../../configs/configAll";
import { role } from "../../../../configs/parseJwt";
import { getRoleGroup } from "../../../../configs/Role";

interface TableProps {
  tableBody: any[];
  tableHead: any[];
  handleSort?: (value: string) => void;
  isLoading: boolean;
}

const TableQuanLyPhieuDKyDVHN = (props: TableProps) => {
  const { tableBody, tableHead, isLoading } = props;

  const { data } = queryKhoaAll({
    queryKey: "KhoaAll",
  });
  const dataKhoa: any = data;

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

  const handleRedirectChiTiet = (id: any) => {
    navigate(APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.xem_chi_tiet);
    sessionStorage.setItem("chi-tiet-phan-cong", JSON.stringify(id));
  };

  const handleRedirectSua = (id: any) => {
    navigate(
      APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM
        .sua_phan_cong_khoa_chuyen_mon
    );
    sessionStorage.setItem("sua-phan-cong", JSON.stringify(id));
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
                <div className="flex justify-start">
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-start">
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-start">
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
              <TableCell align="center" className="!py-3">
                <div className="flex justify-start">
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
              <TableCell align="center" className="!py-3">
                <div className="flex justify-start">
                  <Skeleton variant="rounded" width={210} height={30} />
                </div>
              </TableCell>
            </TableRow>
          ) : tableBody?.length > 0 ? (
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
                      onClick={() => handleRedirectChiTiet(item?.maId)}
                    >
                      {item?.maPhieuDeXuat}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-base/4 font-medium text-gray-700">
                      {formatDate(item?.thoiGianGiaoMau)}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-base/4 font-medium text-gray-700">
                      {
                        dataKhoa?.find(
                          (Khoa: any) => Khoa?.maId === item?.maKhoaTiepNhan
                        ).tenKhoa
                      }
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-xs/4 font-medium inline-block px-2 py-1 rounded-full bg-red-100 text-red-800">
                      {`Còn
                      ${
                        item?.chiTietPhieuDeXuatPhongBans.filter(
                          (item: any) => item.trangThai === 1
                        ).length
                      }
                      mẫu chờ hủy`}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    <p className="text-xs/4 font-medium inline-block px-2 py-1 rounded-full bg-red-100 text-red-800">
                      {`Còn
                      ${
                        item?.chiTietPhieuDeXuatPhongBans.filter(
                          (item: any) => item.trangThai === 2
                        ).length
                      }
                      mẫu chưa duyệt`}
                    </p>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-start">
                    {renderTrangThaiPhieuDeXuatPhongBan(item?.trangThai)}
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
                    {(getRoleGroup(role) === "KHTH" ||
                      getRoleGroup(role) === "BLD") && (
                      <Tooltip
                        title="Sửa phân công"
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
                          className="text-gray-600 font-medium text-sm/6 cursor-pointer flex gap-2 items-center"
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                      </Tooltip>
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
