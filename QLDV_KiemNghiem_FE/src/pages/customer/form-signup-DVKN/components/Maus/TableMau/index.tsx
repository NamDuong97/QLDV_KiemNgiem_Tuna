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
} from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { Mau } from "../../../../../../models/mau";
import { Align, TableHeader } from "../../../../../../models/Table";
import { Dispatch, SetStateAction } from "react";

interface TableMauProps {
  tableBody: Mau[];
  tableHead: TableHeader[];
  handleSort?: (value: string) => void;
  setListCheckbox: Dispatch<SetStateAction<any[]>>;
  listCheckbox: any[];
  setDataEditMaus: Dispatch<SetStateAction<any>>;
  dataEditMaus?: any;
  handleRedirectTag1?: () => void;
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
  } = props;

  const handleCheckbox = (item: any) => {
    const { name, checked } = item.target;
    if (checked) {
      const selectedItem = tableBody.find((item: any) => item.TenMau === name);
      setListCheckbox((prev: any[]) => [...prev, selectedItem]);
    } else {
      setListCheckbox((prev: any[]) =>
        prev.filter((item: any) => item.TenMau !== name)
      );
    }
  };
  const handleCheckboxAll = () => {
    if (listCheckbox.length === tableBody.length) {
      setListCheckbox([]);
    } else {
      setListCheckbox([...tableBody]);
    }
  };

  const handleEditMaus = (TenMau: string | undefined) => {
    const selectedItem = tableBody.find((item: any) => item.TenMau === TenMau);
    if (dataEditMaus && dataEditMaus.TenMau === selectedItem?.TenMau)
      setDataEditMaus(null);
    else {
      const removeListCheckboxByTenPLHC = listCheckbox.filter(
        (item) => item.TenMau !== TenMau
      );
      setListCheckbox([...removeListCheckboxByTenPLHC]);
      setDataEditMaus(selectedItem);
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
                  name={item.TenMau}
                  checked={
                    !!listCheckbox.find(
                      (itemMau) => itemMau.TenMau === item?.TenMau
                    )
                  }
                  onChange={handleCheckbox}
                />
              </TableCell>
              <TableCell align="left">
                <Box className="flex gap-2 items-center justify-start">
                  <p
                    className="text-base/4 font-medium hover:underline cursor-pointer"
                    onClick={() => handleEditMaus(item?.TenMau)}
                  >
                    {item?.TenMau}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item?.LoaiMau}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item?.TieuChuan}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item?.SoLo}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item?.SoLuong}</p>
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
