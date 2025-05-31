import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Badge, Drawer, styled, Tooltip } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router";
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
  const [isDanhMucNotMobile, setIsDanhMucNotMobile] = useState(false);
  const [anchorElNotifications, setAnchorElNotifications] =
    useState<HTMLButtonElement | null>(null);
  const openNotifications = Boolean(anchorElNotifications);
  const [anchorElAccountPopup, setAnchorElAccountPopup] =
    useState<HTMLButtonElement | null>(null);
  const openAccountPopup = Boolean(anchorElAccountPopup);
  const navigate = useNavigate();

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
    <div className="w-full max-w-[1840px] 2xl:max-w-full sticky">
      <header
        id="heightRef"
        className={`flex justify-center px-[18px] bg-white py-2 w-full border border-solid border-gray-300 heightRef -top-full`}
      >
        <Box className="max-w-[1440px] flex justify-between w-full px-6">
          <Box className="flex items-center gap-1">
            <button
              className="block lg:!hidden !p-[6px]"
              onClick={toggleDrawerMenu(true)}
            >
              <CgMenuGridO className="text-gray-700 w-7 h-7" />
            </button>
            <div className="">
              <img
                src={image.imageTunaLogo}
                alt="imageBanner"
                className="h-14 w-auto object-contain"
              />
            </div>
          </Box>
          <Box className="hidden lg:flex lg:items-center">
            <ul className="flex gap-12 text-xl h-full">
              <li
                className="hover:text-gray-800 cursor-pointer h-full flex items-center"
                onClick={handleRedirectHome}
              >
                Trang Chủ
              </li>
              <li className="hover:text-gray-800 cursor-pointer h-full flex items-center">
                Giới Thiệu
              </li>
              <li className="!relative group h-full flex items-center">
                <span
                  className="flex items-center gap-2 hover:text-gray-800 cursor-pointer"
                  onClick={() => setIsDanhMucNotMobile(!isDanhMucNotMobile)}
                  onMouseOut={() => setIsDanhMucNotMobile(false)}
                >
                  Danh Mục <IoMdArrowDropdown />
                </span>

                <Box
                  className={`group-hover:block ${
                    isDanhMucNotMobile ? "block" : "hidden"
                  } !absolute top-10 z-99 bg-white -left-24 w-72 p-2 rounded-md border border-solid border-gray-300 shadow-[3px_3px_2px_rgba(0,0,0,0.4)]`}
                >
                  <div className="!absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-10 border-r-10 border-b-8 border-l-transparent border-r-transparent border-b-white" />
                  <ul>
                    <li
                      className="hover:text-blue-500 text-gray-800 cursor-pointer text-base/6"
                      onClick={() =>
                        navigate(APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to)
                      }
                    >
                      Đăng Ký Dịch Vụ Kiểm Nghiệm
                    </li>
                  </ul>
                </Box>
              </li>
              <li className="hover:text-gray-800 cursor-pointer h-full flex items-center">
                Tin Tức
              </li>
            </ul>
          </Box>
          <Box className="gap-4 flex items-center">
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
                  className="relative"
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
                    <AccountCircle className="text-white" />
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
        >
          <Box className="flex justify-center p-4 w-[300px] md:w-[350px]">
            <Box className="grid gap-6 w-full">
              <Box className="flex justify-between items-center">
                <Box className="flex items-center gap-2">
                  <img
                    src={image.imageLogo}
                    alt="imageLogo"
                    className="w-9 h-9 sm:!w-12 sm:!h-12 text-black"
                  />
                </Box>
                <Box
                  onClick={() => {
                    setOpenMenu(false);
                    setIsDanhMuc(false);
                  }}
                >
                  <IoIosCloseCircle className="w-8 h-8 text-gray-300" />
                </Box>
              </Box>
              <Box className="grid gap-4">
                <Box
                  className="hover:text-blue-600 cursor-pointer flex items-center text-xl/6 sm:text-2xl/6 font-semibold"
                  onClick={() => {
                    setOpenMenu(false);
                    handleRedirectHome();
                  }}
                >
                  Trang Chủ
                </Box>
                <Box className="hover:text-blue-600 cursor-pointer flex items-center text-xl/6 sm:text-2xl/6 font-semibold">
                  Giới Thiệu
                </Box>
                <Box className="relative group grid gap-4">
                  <span
                    className="flex items-center justify-between w-full gap-2 hover:text-blue-600 cursor-pointer text-xl/6 sm:text-2xl/6 font-semibold"
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
                        className="hover:text-blue-600 cursor-pointer text-base/6 sm:text-lg/6 font-semibold"
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
                <Box className="hover:text-blue-600 cursor-pointer flex items-center text-xl/6 sm:text-2xl/6 font-semibold">
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
