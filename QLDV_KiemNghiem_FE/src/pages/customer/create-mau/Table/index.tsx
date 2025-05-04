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
import { Align, TableHeader } from "../../../../models/Table";
import PopupEditPKHC from "../PopupEditPK-HC";
import { useState } from "react";
import classes from "./styles.module.scss";

interface TableProps {
  tableBody: any;
  tableHead: TableHeader[];
  handleSort?: (value: string) => void;
  setIsCheckboxAll: () => void;
  isCheckboxAll?: boolean;
}

const Tables = (props: TableProps) => {
  const { tableBody, tableHead, isCheckboxAll, setIsCheckboxAll } = props;

  const handleCheckboxAll = () => setIsCheckboxAll();
  const [openPopupEditPKHC, setOpenPopupEditPKHC] = useState(false);

  const handleClickOpenPopupEditPKHC = () => {
    setOpenPopupEditPKHC(true);
  };

  const handleClosePopupEditPKHC = () => {
    setOpenPopupEditPKHC(false);
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
    <TableContainer component={Paper} className={classes.tableReponsive}>
      <Table className={classes.table}>
        <TableHead className="bg-[#D9D9D9]">
          <TableRow>
            <TableCell align="center" padding="checkbox" sx={{ padding: 0 }}>
              <IconButton onClick={handleCheckboxAll}>
                {isCheckboxAll ? (
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
          {tableBody.map((item: any, index: number) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover={true}
              className="cursor-pointer"
            >
              <TableCell align="center">
                <input type="checkbox" className="size-4 cursor-pointer" />
              </TableCell>
              <TableCell align="left">
                <Box className="flex gap-2 items-center justify-start">
                  <p
                    className="text-base/4 font-medium hover:underline cursor-pointer"
                    onClick={handleClickOpenPopupEditPKHC}
                  >
                    {item.TenPhuLieu_HC}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">
                    {item.SoLuongCungCap}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item.DonViTinh}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">
                    {item.MaLoaiPhuLieu_HC}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium truncate w-[167px]">
                    {item.GhiChu}
                  </p>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PopupEditPKHC
        openPopupEditPKHC={openPopupEditPKHC}
        handleClosePopupEditPKHC={handleClosePopupEditPKHC}
      />
    </TableContainer>
  );
};

export default Tables;
