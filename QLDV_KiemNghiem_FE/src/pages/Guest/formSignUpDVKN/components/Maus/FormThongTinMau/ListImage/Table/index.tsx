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
import { Dispatch, SetStateAction } from "react";
import { Align, TableHeader } from "../../../../../../../../models/Table";

interface TableProps {
  setListImage: Dispatch<SetStateAction<any>>;
  setSelectedRow: Dispatch<SetStateAction<any>>;
  listImage: any;
  selectedRow: string | null;
  handleChangeNote: (name: string, noteValue: string) => void;
}

const Tables = (props: TableProps) => {
  const {
    setListImage,
    listImage,
    setSelectedRow,
    selectedRow,
    handleChangeNote,
  } = props;

  const handleSelectRow = (name: string) => {
    let tempCheckbox = listImage.map((item: any) =>
      item.ten === name ? { ...item } : item
    );
    setListImage(tempCheckbox);
    setSelectedRow(selectedRow === name ? null : name);
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
  console.log("listImage", listImage);

  return (
    <Box className="space-y-4">
      {listImage?.length > 0 ? (
        listImage.map((item: any, index: any) => (
          <Box
            key={index}
            className={`cursor-pointer p-2 rounded-md ${
              selectedRow === item.ten && "border border-solid border-red-500"
            }`}
          >
            <Box className="flex gap-2 items-center justify-center w-full">
              <input
                type="radio"
                onChange={() => handleSelectRow(item.ten)}
                checked={selectedRow === item?.ten}
                className="w-6 h-6 cursor-pointer"
              />
              <div className="grid sm:flex gap-2 w-full">
                <img
                  src={item.base64}
                  alt={item.ten}
                  className="object-contain h-[150px]"
                />
                <div className="w-full h-[150px] grid">
                  <label className="font-bold">Ghi chú:</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-3 min-h-full max-h-full focus-within:outline-1 focus-within:border focus-within:border-blue-300"
                    rows={3}
                    placeholder="Nhập ghi chú..."
                    defaultValue={item.ghiChu}
                    onChange={(e) => handleChangeNote(item.ten, e.target.value)}
                  />
                </div>
              </div>
            </Box>
          </Box>
        ))
      ) : (
        <Box className={`flex items-center justify-center`}>
          <p className="text-lg/4 font-medium">Không có Ảnh</p>
        </Box>
      )}
    </Box>
  );
};

export default Tables;
