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
import { Customer } from "../../../../../models/Customer";
interface TableProps {
  tableBody: Customer[];
  tableHead: TableHeader[];
  handleSort: (value: string) => void;
  sort: string | null;
}

const Table = (props: TableProps) => {
  const { tableBody, tableHead, handleSort, sort } = props;

  const [isSort, setIsSort] = useState<string | null>(null);
  const [isCheckboxAll, setIsCheckboxAll] = useState(false);

  const handleIsSort = (value: string) => {
    setIsSort(value);
    handleSort(value);
  };

  const handleCheckboxAll = () => {
    setIsCheckboxAll(!isCheckboxAll);
  };

  return (
    <TableContainer>
      <table width={"100%"}>
        <TableHead className="bg-gray-100">
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
                <p className="text-base/4 font-medium">{item.id}</p>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item.fullname}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item.phonenumber}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item.address}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-base/4 font-medium">{item.email}</p>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
    </TableContainer>
  );
};

export default Table;
