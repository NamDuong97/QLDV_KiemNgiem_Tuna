import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Badge, Drawer, styled, Tooltip } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useLocation, useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { APP_ROUTES } from "../../constants/routers";
import { image } from "../../constants/image";
import AccountPopup from "../Popup/AccountPopup";
import LoginCustomer from "../Login/Customer";
import { CgMenuGridO } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import NotificationsPopover from "../Popup/NotificationsPopover";
import clsx from "clsx";

interface HeaderProps {}

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

export default function HeaderCustomer(props: HeaderProps) {
  const {} = props;

  const isLogin = true;
  const [openLoginCustomer, setOpenLoginCustomer] = useState(false);
  const handleOpenLoginCustomer = () => setOpenLoginCustomer(true);
  const handleCloseLoginCustomer = () => setOpenLoginCustomer(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isDanhMuc, setIsDanhMuc] = useState(false);
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<HTMLButtonElement | null>(null);
  const openNotifications = Boolean(anchorElNotifications);
  const [anchorElAccountPopup, setAnchorElAccountPopup] =
    useState<HTMLButtonElement | null>(null);
  const openAccountPopup = Boolean(anchorElAccountPopup);
  const navigate = useNavigate();
  const pathName = useLocation().pathname;

  const handleClickNotifications = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleClickAccountPopup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElAccountPopup(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleCloseAccountPopup = () => {
    setAnchorElAccountPopup(null);
  };

  const toggleDrawerMenu = (newOpen: boolean) => () => {
    setOpenMenu(newOpen);
  };

  // const handleRedirectLogout = () => {
  //   navigate(APP_ROUTES.ADMIN.LOGIN.to);
  // };

  const handleRedirectHome = () => {
    navigate(APP_ROUTES.TUNA_CUSTOMER.HOME.to);
  };

  return (
    <div className="w-full sticky">
      <header
        id="heightRef"
        className={`flex justify-center px-6 border-b-[2px] bg-white text-slate-900 shadow py-2 w-full border border-solid border-gray-300 heightRef -top-full`}
      >
        <Box className="flex justify-between w-full max-w-[1240px] ">
          <Box className="flex items-center gap-1">
            <button
              className="block lg:!hidden !p-[6px]"
              onClick={toggleDrawerMenu(true)}
            >
              <CgMenuGridO className="text-gray-700 w-7 h-7" />
            </button>
            <div className="cursor-pointer" onClick={handleRedirectHome}>
              <img
                src={image.imageTunaLogo}
                alt="imageBanner"
                className="h-16 w-auto object-cover"
              />
            </div>
          </Box>
          <Box className="hidden lg:flex lg:items-center">
            <Box className="gap-8 flex text-cyan-800">
              <p
                className={clsx(
                  "text-base/6 font-semibold hover:text-orange-500 cursor-pointer uppercase",
                  {
                    "text-blue-500":
                      pathName === APP_ROUTES.TUNA_CUSTOMER.HOME.to,
                  }
                )}
                onClick={handleRedirectHome}
              >
                Trang Chủ
              </p>
              <p
                className={clsx(
                  "text-base/6 font-semibold hover:text-orange-500 cursor-pointer uppercase",
                  {
                    "text-blue-500":
                      pathName ===
                      APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to,
                  }
                )}
                onClick={() =>
                  navigate(APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to)
                }
              >
                Đăng ký Dịch vụ
              </p>
              <p
                className={clsx(
                  "text-base/6 font-semibold hover:text-orange-500 cursor-pointer uppercase"
                )}
              >
                Tin tức
              </p>
            </Box>
          </Box>

          <Box className="gap-6 flex items-center">
            <Box>
              <button className="hidden sm:flex items-center justify-between p-2 rounded-full bg-slate-300 cursor-pointer hover:bg-blue-300">
                <FaSearch className="text-gray-600" />
              </button>
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
                  onClick={handleClickNotifications}
                  className="bg-[#22c55e]"
                >
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    variant="dot"
                  >
                    <NotificationsActiveIcon className="text-[#0f172a]" />
                  </StyledBadge>
                </IconButton>
              </Tooltip>

              <NotificationsPopover
                dataMessages={dataMessages}
                openNotifications={openNotifications}
                anchorElNotifications={anchorElNotifications}
                handleCloseNotifications={handleCloseNotifications}
                handleOpenLoginCustomer={handleOpenLoginCustomer}
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
                    className="relative !p-2"
                  >
                    <AccountCircle className="text-cyan-800" />
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
                className="bg-blue-500 px-3 py-1 rounded cursor-pointer hover:bg-blue-600 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]"
                onClick={handleOpenLoginCustomer}
              >
                <span className="text-sm/4 font-bold text-amber-50">
                  Đăng nhập
                </span>
              </button>
            )}
          </Box>
        </Box>
        <LoginCustomer
          openLoginCustomer={openLoginCustomer}
          handleCloseLoginCustomer={handleCloseLoginCustomer}
        />
        <Drawer
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
            setIsDanhMuc(false);
          }}
          anchor="bottom"
        >
          <Box className="flex justify-center px-4 py-6 !relative">
            <Box
              className="!absolute top-2 right-2"
              onClick={() => {
                setOpenMenu(false);
                setIsDanhMuc(false);
              }}
            >
              <IoIosCloseCircle className="w-8 h-8 text-gray-300" />
            </Box>
            <Box className="flex justify-start items-center sm:justify-center w-full">
              <Box className="grid gap-2">
                <Box className="hover:text-blue-600 cursor-pointer flex items-center justify-start sm:justify-center text-[#525252] text-xl/6 font-medium whitespace-normal">
                  Giới Thiệu
                </Box>
                <Box className="relative group grid gap-4">
                  <span
                    className="sm:ml-4 flex items-center justify-start sm:justify-center w-full gap-2 hover:text-blue-600 cursor-pointer text-[#525252] text-xl/6 font-medium whitespace-normal"
                    onClick={() => setIsDanhMuc(!isDanhMuc)}
                  >
                    Danh Mục <IoMdArrowDropdown />
                  </span>
                  <AnimatePresence mode="popLayout">
                    <motion.ul
                      key="subItemDanhMuc"
                      initial={{ x: -5, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -5, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`pl-2 ${
                        isDanhMuc === false &&
                        "hidden transition-all ease-in-out duration-500"
                      }`}
                    >
                      <li
                        className="hover:text-blue-600 cursor-pointer text-xl/6 sm:text-lg/6"
                        onClick={() => {
                          setOpenMenu(false);
                          navigate(
                            APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to
                          );
                        }}
                      >
                        Đăng Ký Dịch Vụ Kiểm Nghiệm
                      </li>
                    </motion.ul>
                  </AnimatePresence>
                </Box>
                <Box className="hover:text-blue-600 cursor-pointer flex items-center justify-start sm:justify-center text-[#525252] text-xl/6 font-medium whitespace-normal">
                  Tin Tức
                </Box>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </header>
    </div>
  );
}
