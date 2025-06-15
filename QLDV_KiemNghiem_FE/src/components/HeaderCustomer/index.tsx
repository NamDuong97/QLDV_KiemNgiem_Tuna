import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Badge, Drawer, styled, Tooltip } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useLocation, useNavigate } from "react-router";
import { FaRegNewspaper } from "react-icons/fa";
import { APP_ROUTES } from "../../constants/routers";
import AccountPopup from "../Popup/AccountPopup";
import LoginCustomer from "../Login/Customer";
import NotificationsPopover from "../Popup/NotificationsPopover";
import { IoHome } from "react-icons/io5";
import { FaFileCirclePlus } from "react-icons/fa6";
import clsx from "clsx";
import { motion } from "motion/react";
import { StoreContext } from "../../contexts/storeProvider";

const dataMessages = [
  {
    status: true,
    fullname: "Tun Tun",
    time: "6 giờ",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6 giờ",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6 giờ",
  },
  {
    status: false,
    fullname: "Tun Tun",
    time: "6 giờ",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6 giờ",
  },
  {
    status: false,
    fullname: "Tun Tun",
    time: "6 giờ",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6 giờ",
  },
  {
    status: false,
    fullname: "Tun Tun",
    time: "6 giờ",
  },
  {
    status: true,
    fullname: "Tun Tun",
    time: "6 giờ",
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

export default function HeaderCustomer() {
  const { isLogin, setOpenLoginCustomer, openLoginCustomer } =
    useContext(StoreContext);

  const handleOpenLoginCustomer = () => setOpenLoginCustomer(true);
  const handleCloseLoginCustomer = () => setOpenLoginCustomer(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [anchorElAccountPopup, setAnchorElAccountPopup] =
    useState<HTMLButtonElement | null>(null);
  const openAccountPopup = Boolean(anchorElAccountPopup);
  const navigate = useNavigate();
  const pathName = useLocation().pathname;

  const handleClickNotifications = () => {
    setOpenNotifications(true);
  };

  const handleClickAccountPopup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElAccountPopup(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setOpenNotifications(false);
  };

  const handleCloseAccountPopup = () => {
    setAnchorElAccountPopup(null);
  };

  const handleRedirectHome = () => {
    navigate(APP_ROUTES.TUNA_CUSTOMER.HOME.to);
  };

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex justify-center w-full fixed z-99 pt-2 sm:pt-5`}
    >
      <Box className="gap-6 sm:gap-10 border-[2px] border-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center bg-cyan-800 px-4 py-1 sm:px-10 sm:py-2 rounded-full">
        <Box>
          <Tooltip
            title="Trang Chủ"
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
            <IconButton onClick={handleRedirectHome} className="group">
              <span
                className={clsx(
                  "text-base/6 font-semibold text-white group-hover:!text-orange-400 cursor-pointer uppercase",
                  {
                    "!text-orange-400":
                      pathName === APP_ROUTES.TUNA_CUSTOMER.HOME.to,
                  }
                )}
              >
                <IoHome className="w-6 h-6" />
              </span>
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip
            title="Đăng Ký Kiểm Nghiệm"
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
              onClick={() =>
                navigate(APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to)
              }
              className="group"
            >
              <span
                className={clsx(
                  "text-base/6 font-semibold text-white group-hover:!text-orange-400 cursor-pointer uppercase",
                  {
                    "!text-orange-400":
                      pathName ===
                      APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to,
                  }
                )}
              >
                <FaFileCirclePlus className="w-6 h-6" />
              </span>
            </IconButton>
          </Tooltip>
        </Box>

        <Box>
          <Tooltip
            title="Tin Tức"
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
              className={clsx(
                "text-base/6 font-semibold !text-white hover:!text-orange-400 cursor-pointer uppercase"
              )}
            >
              <FaRegNewspaper className="w-6 h-6" />
            </IconButton>
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
            <IconButton onClick={handleClickNotifications} className="group">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                variant="dot"
              >
                <NotificationsActiveIcon className="text-white group-hover:!text-orange-400" />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          <NotificationsPopover
            dataMessages={dataMessages}
            openNotifications={openNotifications}
            handleCloseNotifications={handleCloseNotifications}
            handleOpenLoginCustomer={() => setOpenLoginCustomer(true)}
          />
        </Box>
        {isLogin ? (
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
                onClick={handleClickAccountPopup}
                color="inherit"
                className="!p-2 group"
              >
                <AccountCircle className="text-white group-hover:!text-orange-400" />
              </IconButton>
            </Tooltip>
            <AccountPopup
              openAccountPopup={openAccountPopup}
              anchorElAccountPopup={anchorElAccountPopup}
              handleCloseAccountPopup={handleCloseAccountPopup}
            />
          </Box>
        ) : (
          <button
            className="bg-cyan-800 border-[2px] border-gray-300 px-3 py-1 rounded cursor-pointer hover:bg-cyan-700 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
            onClick={handleOpenLoginCustomer}
          >
            <span className="text-sm/4 font-bold text-amber-50">Đăng nhập</span>
          </button>
        )}
      </Box>
      <LoginCustomer
        openLoginCustomer={openLoginCustomer}
        handleCloseLoginCustomer={handleCloseLoginCustomer}
      />
      <Drawer
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        anchor="bottom"
      >
        <Box className="flex justify-center px-4 py-6">
          <Box className="flex justify-center items-center w-full">
            <Box className="grid gap-2">
              <Box
                onClick={() => {
                  setOpenMenu(false);
                  handleRedirectHome();
                }}
                className={clsx(
                  "flex items-center justify-center text-cyan-800 text-xl/6 font-semibold whitespace-normal",
                  {
                    "text-orange-500":
                      pathName === APP_ROUTES.TUNA_CUSTOMER.HOME.to,
                  }
                )}
              >
                Trang Chủ
              </Box>
              <Box className="relative group grid gap-4">
                <span
                  className={clsx(
                    "sm:ml-4 flex items-center justify-center w-full gap-2 hover:text-blue-600 cursor-pointer text-cyan-800 text-xl/6 font-semibold whitespace-normal",
                    {
                      "text-orange-500":
                        pathName ===
                        APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to,
                    }
                  )}
                  onClick={() => {
                    setOpenMenu(false);
                    navigate(APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to);
                  }}
                >
                  Đăng ký Dịch vụ
                </span>
              </Box>
              <Box className="hover:text-blue-600 cursor-pointer flex items-center justify-center text-cyan-800 text-xl/6 font-semibold whitespace-normal">
                Tin Tức
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </motion.header>
  );
}
