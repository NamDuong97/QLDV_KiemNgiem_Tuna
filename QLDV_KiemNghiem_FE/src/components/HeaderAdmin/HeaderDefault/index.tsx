import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Badge, styled, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { image } from "../../../constants/image";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import { APP_ROUTES } from "../../../constants/routers";
import { useNavigate } from "react-router";
import PopoverAccountAdmin from "./PopoverAccountAdmin";
import NotificationsPopover from "../../Popup/NotificationsPopover/index";
import PopupThongBaoPhieuDKDVKN from "../../../pages/admin/PopupThongBaoPhieuDKDVKN";
import { MdMarkunreadMailbox } from "react-icons/md";

interface HeaderProps {
  isMenuDashBoard: boolean;
  handleMenuDashBoard: () => void;
  handleToggleDrawer: () => void;
}

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
  const { handleMenuDashBoard, isMenuDashBoard, handleToggleDrawer } = props;

  const [anchorElPopoverAccountAdmin, setAnchorElPopoverAccountAdmin] =
    useState<HTMLButtonElement | null>(null);
  const [anchorElNotificationsPopover, setAnchorElNotificationsPopover] =
    useState<HTMLButtonElement | null>(null);
  const openPopoverAccountAdmin = Boolean(anchorElPopoverAccountAdmin);
  const openNotificationsPopover = Boolean(anchorElNotificationsPopover);
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up("lg"));
  const [openPopupThongBaoPhieuDKDVKN, setOpenPopupThongBaoPhieuDKDVKN] =
    useState(false);

  const navigate = useNavigate();

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

  // const handleRedirectLogout = () => {
  //   navigate(APP_ROUTES.ADMIN.LOGIN.to);
  // };

  const handleRedirectDashboard = () => {
    navigate(APP_ROUTES.TUNA_ADMIN.DASHBOARD.to);
  };

  const handleOpenPopupThongBaoPhieuDKDVKN = () => {
    setOpenPopupThongBaoPhieuDKDVKN(true);
  };

  const handleClosePopupThongBaoPhieuDKDVKN = () => {
    setOpenPopupThongBaoPhieuDKDVKN(false);
  };

  return (
    <header className="w-full !fixed z-99">
      <div className="bg-white px-[18px] flex py-2 w-full border-b border-solid border-gray-300">
        <Box className="flex-1 flex items-center gap-1">
          {isLaptop ? (
            <Tooltip
              title={isMenuDashBoard ? "Thu gọn" : "Mở rộng"}
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
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuDashBoard}
              >
                {isMenuDashBoard ? (
                  <SpaceDashboardIcon className="text-gray-700" />
                ) : (
                  <ViewComfyIcon className="text-gray-700" />
                )}
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleToggleDrawer}
            >
              {isMenuDashBoard ? (
                <SpaceDashboardIcon className="text-gray-700" />
              ) : (
                <ViewComfyIcon className="text-gray-700" />
              )}
            </IconButton>
          )}
          <button className="cursor-pointer" onClick={handleRedirectDashboard}>
            <Box className="flex items-center gap-2">
              <img
                src={image.imageTunaLogo}
                alt="imageTunaLogo"
                className="!h-12"
              />
            </Box>
          </button>
        </Box>
        <Box className="gap-4 flex items-center">
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
                  <MdMarkunreadMailbox className="text-gray-700" />
                  <span className="text-xs text-red-500 !absolute right-[-2px] top-[2px]">10</span>
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
              <Box>
                <IconButton onClick={handleClickNotificationsPopover}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    variant="dot"
                  >
                    <NotificationsActiveIcon className="text-gray-700" />
                  </StyledBadge>
                </IconButton>
              </Box>
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
                <AccountCircle className="text-gray-700" />
              </IconButton>
            </Tooltip>
            <PopoverAccountAdmin
              open={openPopoverAccountAdmin}
              anchorEl={anchorElPopoverAccountAdmin}
              handleClose={handleClosePopoverAccountAdmin}
            />
          </Box>
        </Box>
      </div>

      <PopupThongBaoPhieuDKDVKN
        open={openPopupThongBaoPhieuDKDVKN}
        handleClose={handleClosePopupThongBaoPhieuDKDVKN}
      />
    </header>
  );
}
