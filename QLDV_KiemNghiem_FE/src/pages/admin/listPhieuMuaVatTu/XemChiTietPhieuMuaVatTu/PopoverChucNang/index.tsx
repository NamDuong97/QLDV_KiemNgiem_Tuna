import { Popover } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLButtonElement | null;
}

const PopoverChucNang = (props: Props) => {
  const { open, handleClose, anchorEl } = props;

  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        ".MuiPaper-root": {
          backgroundColor: "oklch(45% 0.085 224.283)",
          border: "2px solid #d1d5dc",
          boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
          borderRadius: 3,
          padding: "12px 16px",
          display: "grid",
          gap: 2,
        },
      }}
    >
      <button className="text-white flex justify-center gap-2 items-center border-[2px] border-gray-300 py-2 px-6 bg-yellow-500 text-center rounded-lg  cursor-pointer hover:bg-yellow-400 hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <span className="text-lg/6 font-semibold capitalize">Từ chối</span>
      </button>
      <button className="text-white  flex gap-2 justify-center items-center py-2 px-6 border-[2px] border-gray-300 bg-green-500 text-center rounded-lg  cursor-pointer hover:bg-green-400 hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <span className="text-lg/6 font-semibold capitalize">Duyệt</span>
      </button>
    </Popover>
  );
};

export default PopoverChucNang;
