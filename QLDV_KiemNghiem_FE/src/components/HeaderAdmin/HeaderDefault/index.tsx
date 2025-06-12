import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Badge, styled, Tooltip } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PopoverAccountAdmin from "./PopoverAccountAdmin";
import NotificationsPopover from "../../Popup/NotificationsPopover/index";
import PopupThongBaoPhieuDKDVKN from "../../../pages/admin/PopupThongBaoPhieuDKDVKN";
import { MdMarkunreadMailbox } from "react-icons/md";
import { motion } from "motion/react";

interface HeaderProps {}

const dataMessages = [
  {
    status: true,
    fullname: "Tun Tun",
    time: "6h",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6h",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6h",
  },
  {
    status: false,
    fullname: "Tun Tun",
    time: "6h",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6h",
  },
  {
    status: false,
    fullname: "Tun Tun",
    time: "6h",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6h",
  },
  {
    status: false,
    fullname: "Tun Tun",
    time: "6h",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6h",
  },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function HeaderDefault(props: HeaderProps) {
  const {} = props;

  const [anchorElPopoverAccountAdmin, setAnchorElPopoverAccountAdmin] =
    useState<HTMLButtonElement | null>(null);
  const [anchorElNotificationsPopover, setAnchorElNotificationsPopover] =
    useState<HTMLButtonElement | null>(null);
  const openPopoverAccountAdmin = Boolean(anchorElPopoverAccountAdmin);
  const openNotificationsPopover = Boolean(anchorElNotificationsPopover);
  const [openPopupThongBaoPhieuDKDVKN, setOpenPopupThongBaoPhieuDKDVKN] =
    useState(false);

  const handleClickPopoverAccountAdmin = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElPopoverAccountAdmin(event.currentTarget);
  };

  const handleClosePopoverAccountAdmin = () => {
    setAnchorElPopoverAccountAdmin(null);
  };

  const handleClickNotificationsPopover = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElNotificationsPopover(event.currentTarget);
  };

  const handleCloseNotificationsPopover = () => {
    setAnchorElNotificationsPopover(null);
  };

  const handleOpenPopupThongBaoPhieuDKDVKN = () => {
    setOpenPopupThongBaoPhieuDKDVKN(true);
  };

  const handleClosePopupThongBaoPhieuDKDVKN = () => {
    setOpenPopupThongBaoPhieuDKDVKN(false);
  };

  return (
    <motion.header
      key="HeaderDefault"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed z-99 px-[18px] flex justify-center"
    >
      <Box className="gap-10 flex items-center border-[2px] rounded-bl-full rounded-br-full border-solid bg-cyan-800 border-gray-300 py-2 px-14 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <Box>
          <Tooltip
            title="Thông Báo Phiếu Đăng Ký Kiểm Nghiệm"
            placement="top"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}
            disableInteractive
          >
            <Box>
              <IconButton
                className="!relative"
                onClick={handleOpenPopupThongBaoPhieuDKDVKN}
              >
                <MdMarkunreadMailbox className="text-white" />
                <span className="text-xs text-yellow-300 !absolute right-[-2px] top-[2px]">
                  10
                </span>
              </IconButton>
            </Box>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip
            title="Thông Báo"
            placement="top"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}
            disableInteractive
          >
            <IconButton
              onClick={handleClickNotificationsPopover}
              className="bg-[#22c55e]"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                variant="dot"
              >
                <NotificationsActiveIcon className="text-white" />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          <NotificationsPopover
            dataMessages={dataMessages}
            openNotifications={openNotificationsPopover}
            handleCloseNotifications={handleCloseNotificationsPopover}
          />
        </Box>
        <Box>
          <Tooltip
            title="Tài Khoản"
            placement="top"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}
            disableInteractive
          >
            <IconButton
              size="large"
              onClick={handleClickPopoverAccountAdmin}
              color="inherit"
              className="relative !p-2"
            >
              <AccountCircle className="text-white" />
            </IconButton>
          </Tooltip>
          <PopoverAccountAdmin
            open={openPopoverAccountAdmin}
            anchorEl={anchorElPopoverAccountAdmin}
            handleClose={handleClosePopoverAccountAdmin}
          />
        </Box>
      </Box>
      <PopupThongBaoPhieuDKDVKN
        open={openPopupThongBaoPhieuDKDVKN}
        handleClose={handleClosePopupThongBaoPhieuDKDVKN}
      />
    </motion.header>
  );
}
