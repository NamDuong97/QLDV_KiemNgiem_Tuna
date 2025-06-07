import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

import { Align, TableHeader } from "../../../../../../models/Table";
import { Dispatch, SetStateAction } from "react";
import { Maus } from "../../../../../../models/mau";
import { useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";

interface TableMauProps {
  tableBody: Maus[];
  tableHead: TableHeader[];
  handleSort?: (value: string) => void;
  setListCheckbox: Dispatch<SetStateAction<any[]>>;
  listCheckbox: any[];
  setDataEditMaus: Dispatch<SetStateAction<any>>;
  dataEditMaus?: any;
  handleRedirectTag1?: () => void;
  dataCopyMaus?: any;
  setDataCopyMaus: Dispatch<any>;
}

const TableMau = (props: TableMauProps) => {
  const {
    tableBody,
    tableHead,
    listCheckbox,
    setListCheckbox,
    setDataEditMaus,
    dataEditMaus,
    handleRedirectTag1,
    dataCopyMaus,
    setDataCopyMaus,
  } = props;

  const queryClient = useQueryClient();

  const dataTieuChuanAll: any = queryClient.getQueryData(["TieuChuanAll"]);
  const dataLoaiDichVuAll: any = queryClient.getQueryData(["LoaiDichVuAll"]);

  const handleCheckbox = (item: any) => {
    const { name, checked } = item.target;
    if (checked) {
      const selectedItem = tableBody.find((item: any) => item.tenMau === name);
      setListCheckbox((prev: any[]) => [...prev, selectedItem]);
    } else {
      setListCheckbox((prev: any[]) =>
        prev.filter((item: any) => item.tenMau !== name)
      );
    }
  };
  const handleCheckboxAll = () => {
    const data = tableBody.filter(
      (item) => item.tenMau !== dataEditMaus?.tenMau
    );
    if (listCheckbox.length === tableBody.length) {
      setListCheckbox([]);
    } else {
      setListCheckbox([...data]);
    }
  };

  const handleEditMaus = (tenMau: string | undefined) => {
    const selectedItem = tableBody.find((item: any) => item.tenMau === tenMau);
    if (dataEditMaus && dataEditMaus.tenMau === selectedItem?.tenMau)
      setDataEditMaus(null);
    else {
      const removeListCheckboxByTenPLHC = listCheckbox.filter(
        (item) => item.tenMau !== tenMau
      );
      setListCheckbox([...removeListCheckboxByTenPLHC]);
      setDataEditMaus(selectedItem);
      handleRedirectTag1?.();
    }
  };

  const handleCopyMaus = (tenMau: string | undefined) => {
    const selectedItem = tableBody.find((item: any) => item.tenMau === tenMau);
    if (dataCopyMaus && dataCopyMaus.tenMau === selectedItem?.tenMau)
      setDataCopyMaus(null);
    else {
      const removeListCheckboxByTenPLHC = listCheckbox.filter(
        (item) => item.tenMau !== tenMau
      );
      setListCheckbox([...removeListCheckboxByTenPLHC]);
      setDataCopyMaus(selectedItem);
      handleRedirectTag1?.();
    }
  };

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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className="bg-[#D9D9D9]">
          <TableRow>
            <TableCell align="center" padding="checkbox" sx={{ padding: 0 }}>
              <IconButton onClick={handleCheckboxAll}>
                {listCheckbox.length > 0 ? (
                  <IndeterminateCheckBoxIcon className="rounded-2xl text-gray-500" />
                ) : (
                  <SquareIcon className="rounded-2xl text-gray-400" />
                )}
              </IconButton>
            </TableCell>
            {tableHead.map((item) => (
              <TableCell key={item.id} padding="normal">
                <Box className={`flex items-center ${handleAlign(item.align)}`}>
                  <p className="text-lg/4 font-bold">{item.label}</p>
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
                <input
                  type="checkbox"
                  className="size-4 cursor-pointer"
                  name={item.tenMau}
                  checked={
                    !!listCheckbox.find(
                      (itemMau) => itemMau.tenMau === item?.tenMau
                    )
                  }
                  disabled={
                    dataEditMaus?.tenMau === item?.tenMau ? true : false
                  }
                  onChange={handleCheckbox}
                />
              </TableCell>
              <TableCell align="left">
                <Box className="flex gap-2 items-center justify-start">
                  <p className="text-base/4 font-medium">{item?.tenMau}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">
                    {
                      dataLoaiDichVuAll?.find(
                        (loaiDV: any) => loaiDV.maLoaiDv === item?.loaiDv
                      ).tenDichVu
                    }
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">
                    {
                      dataTieuChuanAll?.find(
                        (tieuchuan: any) => tieuchuan.maId === item?.maTieuChuan
                      ).tenTieuChuan
                    }
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item?.soLo}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item?.soLuong}</p>
                </Box>
              </TableCell>
              <TableCell align="center" className="!py-2">
                <Box className="flex gap-2 items-center justify-center">
                  <Tooltip
                    title="Sửa"
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
                      onClick={() => handleEditMaus(item?.tenMau)}
                      className="px-2 py-1 rounded cursor-pointer border border-solid border-yellow-500 group hover:bg-yellow-500"
                    >
                      <span className="text-base/4 lg:text-lg/6 font-bold text-yellow-500 group-hover:text-white">
                        <CiEdit />
                      </span>
                    </button>
                  </Tooltip>
                  <Tooltip
                    title="Sao chép"
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
                      onClick={() => handleCopyMaus(item?.tenMau)}
                      className="px-2 py-1 rounded cursor-pointer border border-solid border-gray-500 text-red-500 group hover:bg-gray-500"
                    >
                      <span className="text-base/4 lg:text-lg/6 font-bold text-gray-500 group-hover:text-white">
                        <MdContentCopy />
                      </span>
                    </button>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMau;
