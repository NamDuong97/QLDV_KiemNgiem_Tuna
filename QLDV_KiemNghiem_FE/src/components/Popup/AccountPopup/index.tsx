import { Box, Popover } from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import { FaVoteYea } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../constants/routers";

interface AccountPopupProps {
  openAccountPopup: boolean;
  anchorElAccountPopup?: HTMLButtonElement | null;
  handleCloseAccountPopup?: () => void;
}

const AccountPopup = (props: AccountPopupProps) => {
  const { openAccountPopup, handleCloseAccountPopup, anchorElAccountPopup } =
    props;

  const navigate = useNavigate();

  return (
    <Popover
      open={openAccountPopup}
      anchorEl={anchorElAccountPopup}
      onClose={handleCloseAccountPopup}
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
        <Box className="flex gap-2 items-center cursor-pointer rounded p-1">
          <RxAvatar className="w-9 h-9" />
          <p className="text-gray-800 text-xl/6 font-bold">Nguyễn Văn A</p>
        </Box>
        <hr className="text-gray-300" />
        <Box
          className="flex gap-2 items-center hover:bg-[rgb(230,236,246)] cursor-pointer rounded p-1"
          onClick={() => {
            navigate(`${APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}`);
            handleCloseAccountPopup?.();
          }}
        >
          <FaVoteYea className="w-6 h-6 text-[#404dd2]" />
          <p className="text-gray-800 text-base/6 font-medium">
            Quản lý phiếu DKDVKN
          </p>
        </Box>
        <Box
          className="flex gap-2 items-center hover:bg-[rgb(230,236,246)] cursor-pointer rounded p-1"
          onClick={() => {
            navigate(APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to);
            handleCloseAccountPopup?.();
          }}
        >
          <RiBillLine className="w-6 h-6 text-[#2b89d1]" />
          <p className="text-gray-800 text-base/6 font-medium">
            Quản lý hóa đơn
          </p>
        </Box>
        <Box className="flex gap-2 items-center hover:bg-[rgb(230,236,246)] cursor-pointer rounded p-1">
          <FaDoorOpen className="w-6 h-6 text-[#d2405d]" />
          <p className="text-[#d71a40] text-base/6 font-medium">Đăng Xuất</p>
        </Box>
      </Box>
    </Popover>
  );
};

export default AccountPopup;
