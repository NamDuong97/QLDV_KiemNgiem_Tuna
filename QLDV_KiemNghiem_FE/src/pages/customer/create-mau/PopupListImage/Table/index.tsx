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
import classes from "./styles.module.scss";
import { Align, TableHeader } from "../../../../../models/Table";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import yup from "../../../../../configs/yup.custom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface TableProps {
  tableHead: TableHeader[];
  handleSort?: (value: string) => void;
  setListCheckBox: Dispatch<SetStateAction<any>>;
  listCheckBox: any;
}

interface FormListAnh {
  image?: string;
  nameString: string;
}

const Tables = (props: TableProps) => {
  const { tableHead, setListCheckBox, listCheckBox } = props;

  const handleCheckboxAll = (e: any) => {
    const { name, checked } = e.target;
    let tempCheckbox = listCheckBox.map((item: any) =>
      item.image === name ? { ...item, isChecked: checked } : item
    );
    setListCheckBox(tempCheckbox);
  };

  console.log("listCheckBox", listCheckBox);

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

  let schema = useMemo(() => {
    return yup.object().shape({
      nameString: yup.string().required("Yêu cầu nhập tên ảnh"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormListAnh>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      nameString: "",
    });
  }, []);

  return (
    <TableContainer component={Paper} className={classes.tableReponsive}>
      <Table className={classes.table}>
        <TableHead className="bg-[#D9D9D9]">
          <TableRow>
            <TableCell align="center" padding="checkbox" sx={{ padding: 0 }}>
              <IconButton>
                {listCheckBox.length ? (
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
          {listCheckBox.map((item: any) => (
            <TableRow
              key={item.image}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover={true}
              className="cursor-pointer"
            >
              <TableCell align="center">
                <input
                  type="checkbox"
                  className="size-4 cursor-pointer"
                  checked={item.image ? listCheckBox.isChecked : false}
                  name={item.image}
                  onChange={handleCheckboxAll}
                />
              </TableCell>
              <TableCell align="center">
                <Box className="flex gap-2 items-center justify-center">
                  <img src={item.image} alt={item.image} className="w-14" />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
