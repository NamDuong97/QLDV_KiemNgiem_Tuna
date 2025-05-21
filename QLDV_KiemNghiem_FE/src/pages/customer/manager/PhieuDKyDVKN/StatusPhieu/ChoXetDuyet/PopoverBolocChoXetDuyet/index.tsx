import { Box, Popover } from "@mui/material";
import { IoMdClose } from "react-icons/io";

interface Props {
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
}

const PopoverBolocChoXetDuyet = (props: Props) => {
  const { open, anchorEl, handleClose } = props;



  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{
        "& .MuiPaper-root": {
          boxShadow: "0 6px 12px rgba(140, 152, 164, 0.075)",
          borderRadius: 2,
          border: "0.1px solid #d1d5dc",
        },
      }}
    >
      <Box className="w-[300px]">
        <Box className="px-4 py-2 border-b border-solid border-gray-300 flex justify-between items-center">
          <p className="text-gray-80 font-bold text-lg/6">Bộ Lọc</p>
          <button className="p-1 rounded-full group hover:bg-blue-200">
            <IoMdClose className="text-gray-500 group-hover:text-blue-800" />
          </button>
        </Box>
        <form action="" className="px-4 py-5 grid gap-6">
          <Box className="grid gap-2">
            <p className="text-sm/4 font-semibold text-[#586573]">
              Ngày bắt đầu:
            </p>
            <input
              type="date"
              name=""
              id=""
              className="border border-solid border-gray-300 py-1 px-2 rounded"
            />
          </Box>
          <Box className="grid gap-2">
            <p className="text-sm/4 font-semibold text-[#586573]">
              Ngày kết thúc:
            </p>
            <input
              type="date"
              name=""
              id=""
              className="border border-solid border-gray-300 py-1 px-2 rounded"
            />
          </Box>
          <Box>
            <button className="w-full flex justify-center border border-solid border-blue-500 rounded-md px-3 py-[6px] text-blue-500 font-bold text-base/6 gap-2 cursor-pointer hover:bg-blue-500 hover:text-white">
              Lọc
            </button>
          </Box>
        </form>
      </Box>
    </Popover>
  );
};

export default PopoverBolocChoXetDuyet;
