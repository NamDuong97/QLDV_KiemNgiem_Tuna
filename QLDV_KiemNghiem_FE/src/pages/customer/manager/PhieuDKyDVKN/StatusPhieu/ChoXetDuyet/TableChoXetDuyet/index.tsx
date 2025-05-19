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
import { useNavigate } from "react-router";
import { Dispatch, SetStateAction } from "react";
import { Align } from "../../../../../../../models/Table";
import { APP_ROUTES } from "../../../../../../../constants/routers";

interface TableChoXetDuyetProps {
  tableBody: any[];
  tableHead: any[];
  handleSort?: (value: string) => void;
  setListCheckbox: Dispatch<SetStateAction<any[]>>;
  listCheckbox: any[];
}

const TableChoXetDuyet = (props: TableChoXetDuyetProps) => {
  const { tableBody, tableHead, listCheckbox, setListCheckbox } = props;

  const handleCheckbox = (item: any) => {
    const { name, checked } = item.target;
    if (checked) {
      const selectedItem = tableBody.find(
        (item: any) => item.NguoiGuiMau === name
      );
      setListCheckbox((prev: any[]) => [...prev, selectedItem]);
    } else {
      setListCheckbox((prev: any[]) =>
        prev.filter((item: any) => item.NguoiGuiMau !== name)
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

  const navigate = useNavigate();

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

  const changeUrlParam = (url: any, id: any) => {
    return url.replace(/:id/, id);
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
                  <p className="text-sm/4 sm:text-lg/4 font-bold">{item.label}</p>
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
                  name={item.NguoiGuiMau}
                  checked={
                    !!listCheckbox?.find(
                      (itemMau) => itemMau.NguoiGuiMau === item?.NguoiGuiMau
                    )
                  }
                  onChange={handleCheckbox}
                />
              </TableCell>
              <TableCell align="left">
                <Box className="flex gap-2 items-center justify-start">
                  <p className="text-sm/4 sm:text-base/4 font-medium hover:underline cursor-pointer">
                    {item?.SoDKPT}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p
                    onClick={() =>
                      navigate(
                        `${changeUrlParam(
                          APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.to,
                          item.NguoiGuiMau
                        )}?tuna=phieu-dang-ky`
                      )
                    }
                    className="text-sm/4 sm:text-base/4 font-medium"
                  >
                    {item?.NguoiGuiMau}
                  </p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">{item?.DonViGuiMau}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">{item?.NgayGiaoMau}</p>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <p className="text-sm/4 sm:text-base/4 font-medium">
                    {item?.KetQua === 1 ? " Tiếng Anh" : "Tiếng Việt"}
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

export default TableChoXetDuyet;
