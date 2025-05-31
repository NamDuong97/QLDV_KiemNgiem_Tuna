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
import { Dispatch, SetStateAction } from "react";
import { Align, TableHeader } from "../../../../../../../../models/Table";

interface TableProps {
  tableBody: any[];
  tableHead: TableHeader[];
  handleSort?: (value: string) => void;
  setListCheckbox: Dispatch<SetStateAction<any[]>>;
  listCheckbox: any[];
  setDataEditPLHC: Dispatch<any>;
  dataEditPLHC?: any;
  handleRedirectTag1: () => void;
}

const TablePLHC = (props: TableProps) => {
  const {
    tableBody,
    tableHead,
    listCheckbox,
    setListCheckbox,
    setDataEditPLHC,
    dataEditPLHC,
    handleRedirectTag1,
  } = props;

  const handleCheckbox = (item: any) => {
    const { name, checked } = item.target;
    if (checked) {
      const selectedItem = tableBody.find((item: any) => item.tenPlhc === name);
      setListCheckbox((prev: any[]) => [...prev, selectedItem]);
    } else {
      setListCheckbox((prev: any[]) =>
        prev.filter((item: any) => item.tenPlhc !== name)
      );
    }
  };

  const handleCheckboxAll = () => {
    const data = tableBody.filter(
      (item) => item.tenPlhc !== dataEditPLHC?.tenPlhc
    );
    if (listCheckbox.length === tableBody.length) {
      setListCheckbox([]);
    } else {
      setListCheckbox([...data]);
    }
  };

  const handleThemListPLHCEdit = (tenPlhc: string) => {
    const selectedItem = tableBody.find(
      (item: any) => item.tenPlhc === tenPlhc
    );
    if (dataEditPLHC && dataEditPLHC.tenPlhc === selectedItem?.tenPlhc)
      setDataEditPLHC(null);
    else {
      const removeListCheckboxByTenPLHC = listCheckbox.filter(
        (item) => item.tenPlhc !== tenPlhc
      );
      setListCheckbox([...removeListCheckboxByTenPLHC]);
      setDataEditPLHC(selectedItem);
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
            {tableHead.map((item, index) => (
              <TableCell key={index} padding="normal">
                <Box className={`flex items-center ${handleAlign(item.align)}`}>
                  <p className="text-lg/4 font-bold">{item.label}</p>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="bg-white">
          {tableBody?.map((item: any, index: number) => (
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
                  name={item.tenPlhc}
                  checked={
                    !!listCheckbox.find(
                      (itemPLHC) => itemPLHC.tenPlhc === item?.tenPlhc
                    )
                  }
                  disabled={
                    dataEditPLHC?.tenPlhc === item?.tenPlhc ? true : false
                  }
                  onChange={handleCheckbox}
                />
              </TableCell>
              <TableCell align="left">
                <Box className="flex gap-2 items-center justify-start">
                  <p
                    onClick={() => handleThemListPLHCEdit(item.tenPlhc)}
                    className="text-base/4 font-medium hover:underline cursor-pointer"
                  >
                    {item.tenPlhc}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item.tenHienThi}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item.soLuong}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item.donViTinh}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium truncate w-[167px]">
                    {item.dieuKienBaoQuan}
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

export default TablePLHC;
