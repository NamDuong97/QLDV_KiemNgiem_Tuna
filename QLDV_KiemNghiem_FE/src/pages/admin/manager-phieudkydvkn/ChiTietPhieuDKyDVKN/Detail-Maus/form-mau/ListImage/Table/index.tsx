import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Align, TableHeader } from "../../../../../../../../models/Table";

interface TableProps {
  tableHead: TableHeader[];
  handleSort?: (value: string) => void;
  listImage: any;
}

const Tables = (props: TableProps) => {
  const { tableHead, listImage} =
    props;

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
            {tableHead.map((item, index) => (
              <TableCell key={index} padding="normal">
                <Box className={`flex items-center ${handleAlign(item.align)}`}>
                  <p className="text-lg/4 font-bold">{item.label}</p>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="bg-white !flex">
          {listImage?.length > 0 ? (
            listImage.map((item: any, index: any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
              >
                <TableCell align="center">
                  <Box className="flex gap-2 items-center justify-center w-[200px]">
                    <img
                      src={item.base64}
                      alt={item.name}
                      className="object-contain"
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="h-[130px] w-full !flex justify-center items-center">
              <TableCell
                align="center"
                padding="checkbox"
                sx={{ padding: 0, width: "100%", border: 0 }}
              >
                <Box className={`flex items-center justify-center`}>
                  <p className="text-lg/4 font-medium">Không có Ảnh</p>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
