import { Box, Popover } from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import { FaDoorOpen } from "react-icons/fa";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../constants/routers";

interface AccountPopupProps {
  open: boolean;
  anchorEl?: HTMLButtonElement | null;
  handleClose?: () => void;
}

const PopoverAccountAdmin = (props: AccountPopupProps) => {
  const { open, handleClose, anchorEl } = props;

  const navigate = useNavigate();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box className="bg-white border-[1px] border-gray-100 shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25)] rounded-md px-2 py-3 w-[300px] grid gap-1">
        <Box className="flex gap-2 items-center bg-[rgb(210,222,240)] shadow-[inset_0_0_6px_rgba(0,0,0,0.1)] hover:shadow-none cursor-pointer rounded p-1">
          <RxAvatar className="w-9 h-9" />
          <p className="text-gray-800 text-xl/6 font-bold">Nguyễn Văn A</p>
        </Box>
        <hr className="text-gray-300" />
        <Box
          className="flex gap-2 items-center hover:bg-[rgb(230,236,246)] cursor-pointer rounded p-1"
          onClick={() => navigate(APP_ROUTES.TUNA_ADMIN.LOGIN.to)}
        >
          <FaDoorOpen className="w-6 h-6 text-[#d2405d]" />
          <p className="text-[#d71a40] text-base/6 font-medium">Đăng Xuất</p>
        </Box>
      </Box>
    </Popover>
  );
};

export default PopoverAccountAdmin;
