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
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        ".MuiPaper-root": {
          borderRadius: 3,
          border: "2px solid #d1d5dc",
        },
      }}
    >
      <Box className="bg-white border-[1px] border-gray-100 shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25)] rounded-md grid gap-2">
        <Box className="flex gap-2 items-center justify-center cursor-pointer rounded p-1 px-5 pt-2">
          <RxAvatar className="w-8 h-8" />
          <p className="text-cyan-950 text-xl/6 font-bold">Nguyễn Văn A</p>
        </Box>
        <hr className="text-gray-300" />
        <Box
          className="flex gap-2 items-center justify-center hover:bg-[rgb(230,236,246)] cursor-pointer rounded px-5 pb-2"
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
