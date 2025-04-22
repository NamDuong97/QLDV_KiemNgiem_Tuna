import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Badge, styled, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { icons, image } from "../../../constants/image";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import NotificationsPopup from "../../Popup/NotificationsPopup/index";
import AccountPopup from "../../Popup/AccountPopup";
import LanguagePopup from "../../Popup/LanguagePopup";
import { APP_ROUTES } from "../../../constants/routers";
import { useNavigate } from "react-router";

interface HeaderProps {
  isMenuDashBoard: boolean;
  handleMenuDashBoard: () => void;
  handleToggleDrawer: () => void;
}

const language = [
  {
    image: icons.iconVietNam,
    name: "Việt Nam",
  },
  {
    image: icons.iconItaly,
    name: "Italy",
  },
  {
    image: icons.iconUS,
    name: "English (US)",
  },
];

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

  const [openAccount, setOpenAccount] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [selectLang, setSelectLang] = useState<string>(icons.iconVietNam);
  const [openNotifications, setOpenNotifications] = useState(false);
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const handleOpenAccount = () => {
    setOpenAccount(!openAccount);
  };

  const handleCloseAccount = () => {
    setOpenAccount(false);
  };

  const handleOpenLanguage = () => {
    setOpenLanguage(!openLanguage);
  };

  const handleCloseLang = () => {
    setOpenLanguage(false);
  };

  const handleOpenNotifications = () => {
    setOpenNotifications(!openNotifications);
  };

  const handleCloseNotifications = () => {
    setOpenNotifications(false);
  };

  const handleChangeLang = (value: string) => {
    setSelectLang(value);
    setOpenLanguage(false);
  };

  // const handleRedirectLogout = () => {
  //   navigate(APP_ROUTES.ADMIN.LOGIN.to);
  // };

  const handleRedirectDashboard = () => {
    navigate(APP_ROUTES.TUNA_ADMIN.DASHBOARD.to);
  };

  return (
    <header className="bg-white px-[18px] flex py-1 fixed z-50 w-full border-b border-solid border-gray-300">
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
              src={image.imageLogo}
              alt="imageLogo"
              className="!w-8 !h-8 text-black"
            />
          </Box>
        </button>
      </Box>
      <Box className="gap-4 flex items-center">
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
              onClick={handleOpenNotifications}
              onBlur={handleCloseNotifications}
              className="relative"
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                variant="dot"
              >
                <NotificationsActiveIcon className="text-gray-700" />
              </StyledBadge>
            </IconButton>
          </Tooltip>

          <NotificationsPopup
            dataMessages={dataMessages}
            openNotifications={openNotifications}
          />
        </Box>
        <Box>
          <Tooltip
            title="Ngôn Ngữ"
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
              onClick={handleOpenLanguage}
              onBlur={handleCloseLang}
              className="relative"
            >
              <img src={selectLang} alt="iconVietNam" className="w-6 h-6" />
            </IconButton>
          </Tooltip>

          <LanguagePopup
            openLanguage={openLanguage}
            language={language}
            handleChangeLang={handleChangeLang}
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
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenAccount}
              onBlur={handleCloseAccount}
              color="inherit"
              className="relative !p-2"
            >
              <AccountCircle className="text-gray-700" />
            </IconButton>
          </Tooltip>

          <AccountPopup openAccount={openAccount} />
        </Box>
      </Box>
    </header>
  );
}
