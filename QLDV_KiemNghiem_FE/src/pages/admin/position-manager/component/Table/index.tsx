import {
  Box,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import SquareIcon from "@mui/icons-material/Square";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { TableHeader } from "../../../../../models/Table";
import ModelEdit from "../ModelEdit";
import { PositionManager, statusPosition } from "../../../../../models/Position";
interface TableProps {
  tableBody: PositionManager[];
  tableHead: TableHeader[];
  handleSort: (value: string) => void;
  sort: string | null;
  isCheckboxAll: boolean;
  setIsCheckboxAll: () => void;
}

const Table = (props: TableProps) => {
  const {
    tableBody,
    tableHead,
    handleSort,
    sort,
    setIsCheckboxAll,
    isCheckboxAll,
  } = props;

  const [isSort, setIsSort] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleIsSort = (value: string) => {
    setIsSort(value);
    handleSort(value);
  };

  const handleStatus = (status: string | undefined) => {
    switch (status) {
      case statusPosition.activity:
        return (
          <span className="bg-green-600 text-base rounded text-white p-1">
            {status}
          </span>
        );
      case statusPosition.canceled:
        return (
          <span className="bg-yellow-400 text-base rounded text-white p-1">
            {status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <TableContainer>
      <table width={"100%"}>
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell align="center" padding="checkbox" sx={{ padding: 0 }}>
              <IconButton onClick={() => setIsCheckboxAll()}>
                {isCheckboxAll ? (
                  <IndeterminateCheckBoxIcon className="rounded-2xl text-gray-500" />
                ) : (
                  <SquareIcon className="rounded-2xl text-gray-400" />
                )}
              </IconButton>
            </TableCell>
            {tableHead.map((item) => (
              <TableCell key={item.id} padding="normal">
                <Box className="flex items-center justify-center">
                  <p className="text-lg/4 font-bold">{item.label}</p>
                  {item.sort && (
                    <button
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleIsSort(item.id)}
                    >
                      <Box className="!h-2 flex items-center justify-center">
                        <ArrowDropDownIcon
                          className={`rotate-180 ${
                            isSort === item.id
                              ? sort === item.id
                                ? "text-blue-500"
                                : "text-gray-300"
                              : "text-gray-300"
                          }`}
                        />
                      </Box>
                      <Box className="!h-2 flex items-center justify-center">
                        <ArrowDropDownIcon
                          className={`rotate-0 ${
                            isSort === item.id
                              ? sort !== item.id
                                ? "text-blue-500"
                                : "text-gray-300"
                              : "text-gray-300"
                          }`}
                        />
                      </Box>
                    </button>
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="bg-white">
          {tableBody.map((item, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover={true}
            >
              <TableCell align="center">
                <input type="checkbox" className="size-4 cursor-pointer" />
              </TableCell>
              <TableCell align="center">
                <p
                  className="text-base/4 font-medium hover:underline cursor-pointer"
                  onClick={handleOpenEdit}
                >
                  {item.positionID}
                </p>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item.positionName}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">
                    {item.idPersonCreate}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                {handleStatus(item.statusPosition)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
      <ModelEdit openEdit={openEdit} handleCloseEdit={handleCloseEdit} />
    </TableContainer>
  );
};

export default Table;
