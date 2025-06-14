import { Popover } from "@mui/material";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";

interface Props {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLButtonElement | null;
}

const PopoverChucNang = (props: Props) => {
  const { open, handleClose, anchorEl } = props;

  const navigate = useNavigate();

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
          padding: "10px 10px",
          display: "grid",
          gap: 2,
        },
      }}
    >
      <button
        onClick={() =>
          navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.create_phieu_thu)
        }
        className="text-cyan-800 flex gap-2 items-center p-2 bg-white text-center rounded-lg border-[2px] border-cyan-800 cursor-pointer hover:text-orange-400 hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      >
        <FaUserPlus className="w-6 h-6" />
        <span className="text-lg/6 font-semibold capitalize">
          Thêm phiếu thu
        </span>
      </button>
      <button
        onClick={() =>
          navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.edit_phieu_thu)
        }
        className="text-cyan-800 flex gap-2 items-center p-2 bg-white text-center rounded-lg border-[2px] border-cyan-800 cursor-pointer hover:text-orange-400 hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      >
        <FaUserEdit className="w-6 h-6" />
        <span className="text-lg/6 font-semibold capitalize">
          Sửa phiếu thu
        </span>
      </button>
    </Popover>
  );
};

export default PopoverChucNang;
