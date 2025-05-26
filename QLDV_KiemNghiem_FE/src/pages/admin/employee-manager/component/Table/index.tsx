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
import { FaRegEdit } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { statusAccount } from "../../../../../models/Account";
import { TableHeader } from "../../../../../models/Table";
import ModelEdit from "../ModelEdit";
interface TableProps {
  tableBody: any[];
  tableHead: TableHeader[];
  handleSort: (value: string) => void;
  sort: string | null;
}

const Table = (props: TableProps) => {
  const { tableBody, tableHead, handleSort, sort } = props;

  const [isSort, setIsSort] = useState<string | null>(null);
  const [isPassword, setIsPassword] = useState<string | null>(null);
  const [isCheckboxAll, setIsCheckboxAll] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleIsSort = (value: string) => {
    setIsSort(value);
    handleSort(value);
  };

  const handleIsPassword = (password: string) => {
    setIsPassword(isPassword === password ? null : password);
  };

  const handleCheckboxAll = () => {
    setIsCheckboxAll(!isCheckboxAll);
  };

  const handleStatus = (status: string) => {
    switch (status) {
      case statusAccount.activity:
        return (
          <span className="bg-green-600 text-base rounded text-white p-1">
            {status}
          </span>
        );
      case statusAccount.retired:
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
            <TableCell
              align="center"
              padding="normal"
              sx={{ fontWeight: "bold", fontSize: "1rem" }}
            >
              <p className="text-lg/4 font-bold">Chức Năng</p>
            </TableCell>
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
                <p className="text-base/4 font-medium">{item.username}</p>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  {isPassword === item.password ? (
                    <p className="text-base/4 font-medium">{item.password}</p>
                  ) : (
                    <p className="text-base/4 font-medium h-2">*******</p>
                  )}

                  <button
                    className="p-1 cursor-pointer hover:bg-blue-200 hover:rounded-full"
                    onClick={() => handleIsPassword(item.password)}
                  >
                    {isPassword === item.password ? (
                      <FaEye className="w-4 h-4" />
                    ) : (
                      <FaEyeSlash className="w-4 h-4" />
                    )}
                  </button>
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex justify-center">
                  <img
                    src={item.imageEmployee}
                    alt="imageEmployee"
                    className="w-10 h-10"
                  />
                </Box>
              </TableCell>
              <TableCell align="center">
                <p className="text-base/4 font-medium">
                  {item.fullNameEmployee}
                </p>
              </TableCell>
              <TableCell align="center">
                <p className="text-base/4 font-medium">{item.nameRole}</p>
              </TableCell>
              <TableCell align="center">
                <Box>{handleStatus(item.statusAccount)}</Box>
              </TableCell>
              <TableCell>
                <Box className="flex justify-center">
                  <button
                    className="px-3 py-2 border-[1px] border-solid border-gray-300 rounded-md flex items-center gap-1 hover:bg-yellow-400 cursor-pointer hover:shadow-md hover:ease-in-out hover:duration-500"
                    onClick={handleOpenEdit}
                  >
                    <FaRegEdit className="!w-4 !h-4" />
                    <p className="text-sm">Sửa</p>
                  </button>
                </Box>
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
