"use client";
import { Box, Divider, Drawer, Tooltip } from "@mui/material";
// import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import { FaUsers, FaUserTie } from "react-icons/fa";
import {
  AccountManager,
  AccountTypeManager,
  CustomerManager,
  CustomerProfileManager,
  DepartmentManager,
  DivisionManager,
  EmployeeManager,
  PositionManager,
  // SidebarTab,
} from "../../models/Sidebar";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "../../constants/routers";
import { image } from "../../constants/image";
import clsx from "clsx";
import { RiProfileFill } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { RiAccountBox2Fill } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";

interface SideBarProps {
  drawerWidth: number;
  isMenuDashBoard: boolean;
  isToggleDrawer: boolean;
  toggleDrawer: () => void;
}

const SideBar = (props: SideBarProps) => {
  const { drawerWidth, isMenuDashBoard, toggleDrawer, isToggleDrawer } = props;

  // const [isSetting, setIsSetting] = useState(false);
  // const [isEmployeeManager, setIsEmployeeManager] = useState(false);
  // const [isCustomerManager, setIsCustomerManager] = useState(false);
  // const [isDepartmentManager, setIsDepartmentManager] = useState(false);
  // const [isAccountTypeManager, setIsAccountTypeManager] = useState(false);
  // const [isAccountManager, setIsAccountManager] = useState(false);
  // const [isDivisionManager, setIsDivisionManager] = useState(false);
  // const [isPositionManager, setIsPositionManager] = useState(false);
  // const [isCustomerProfileManager, setIsCustomerProfileManager] =
  //   useState(false);
  const pathname = useLocation().pathname;

  const navigate = useNavigate();

  // const handleMenuClick = (value: string) => {
  //   switch (value) {
  //     case SidebarTab.setting:
  //       return setIsSetting(!isSetting);
  //     case SidebarTab.employeeManager:
  //       return setIsEmployeeManager(!isEmployeeManager);
  //     case SidebarTab.positionManager:
  //       return setIsPositionManager(!isPositionManager);
  //     case SidebarTab.customerManager:
  //       return setIsCustomerManager(!isCustomerManager);
  //     case SidebarTab.customerProfileManager:
  //       return setIsCustomerProfileManager(!isCustomerProfileManager);
  //     case SidebarTab.departmentManager:
  //       return setIsDepartmentManager(!isDepartmentManager);
  //     case SidebarTab.accountTypeManager:
  //       return setIsAccountTypeManager(!isAccountTypeManager);
  //     case SidebarTab.accountManager:
  //       return setIsAccountManager(!isAccountManager);
  //     case SidebarTab.divisionManager:
  //       return setIsDivisionManager(!isDivisionManager);
  //     default:
  //       return null;
  //   }
  // };

  const handleRedirect = (value?: string) => {
    switch (value) {
      case EmployeeManager:
        return navigate(APP_ROUTES.TUNA_ADMIN.EMPLOYEE_MANAGER.to);
      case PositionManager:
        return navigate(APP_ROUTES.TUNA_ADMIN.POSITION_MANAGER.to);
      case CustomerManager:
        return navigate(APP_ROUTES.TUNA_ADMIN.CUSTOMER_MANAGER.to);
      case CustomerProfileManager:
        return navigate(APP_ROUTES.TUNA_ADMIN.CUSTOMER_PROFILE_MANAGER.to);
      case DepartmentManager:
        return navigate(APP_ROUTES.TUNA_ADMIN.DEPARTMENT.to);
      case AccountManager:
        return navigate(APP_ROUTES.TUNA_ADMIN.ACCOUNT.to);
      case AccountTypeManager:
        return navigate(APP_ROUTES.TUNA_ADMIN.ACCOUNT_TYPE.to);
      case DivisionManager:
        return navigate(APP_ROUTES.TUNA_ADMIN.DIVISION.to);
      default:
        return navigate(APP_ROUTES.TUNA_ADMIN.DASHBOARD.to);
    }
  };

  return (
    <>
      <Box className="hidden lg:block">
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: 7.1,
              overflow: "auto",
            },
          }}
        >
          {isMenuDashBoard ? (
            <>
              <Box className="p-4">
                <button
                  className={clsx(
                    "flex items-center w-full gap-2 hover:text-blue-500 cursor-pointer",
                    {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.DASHBOARD.to,
                    }
                  )}
                  onClick={() => handleRedirect()}
                >
                  <HomeIcon className="!w-7 !h-7" />
                  <p className="text-base !font-bold">Dashboard</p>
                </button>
              </Box>
              <Divider className="text-black" />
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <button
                  className={clsx(
                    "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                    {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.EMPLOYEE_MANAGER.to,
                    }
                  )}
                  onClick={() => handleRedirect(EmployeeManager)}
                >
                  <FaUsers className="!w-7 !h-7" />
                  <p className="text-base !font-bold">Quản Lý Nhân Viên</p>
                </button>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                      {
                        "text-blue-500":
                          pathname ===
                          APP_ROUTES.TUNA_ADMIN.POSITION_MANAGER.to,
                      }
                    )}
                    onClick={() => handleRedirect(PositionManager)}
                  >
                    <FaUserTie className="!w-7 !h-7" />
                    <p className="text-base !font-bold">Chức vụ</p>
                  </button>
                </Box>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                      {
                        "text-blue-500":
                          pathname ===
                          APP_ROUTES.TUNA_ADMIN.CUSTOMER_MANAGER.to,
                      }
                    )}
                    onClick={() => handleRedirect(CustomerManager)}
                  >
                    <RiAccountBox2Fill className="!w-7 !h-7" />
                    <p className="text-base !font-bold">Khách Hàng</p>
                  </button>
                </Box>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                      {
                        "text-blue-500":
                          pathname ===
                          APP_ROUTES.TUNA_ADMIN.CUSTOMER_PROFILE_MANAGER.to,
                      }
                    )}
                    onClick={() => handleRedirect(CustomerProfileManager)}
                  >
                    <RiProfileFill className="!w-7 !h-7" />
                    <p className="text-base !font-bold">
                      Quản Lý Hồ Sơ Đăng Ký
                    </p>
                  </button>
                </Box>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                      {
                        "text-blue-500":
                          pathname === APP_ROUTES.TUNA_ADMIN.DIVISION.to,
                      }
                    )}
                    onClick={() => handleRedirect(DivisionManager)}
                  >
                    <FaUsersCog className="!w-7 !h-7" />
                    <p className="text-base !font-bold">Quản Lý Bộ Phận</p>
                  </button>
                </Box>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                      {
                        "text-blue-500":
                          pathname === APP_ROUTES.TUNA_ADMIN.ACCOUNT_TYPE.to,
                      }
                    )}
                    onClick={() => handleRedirect(AccountTypeManager)}
                  >
                    <MdOutlineAccountTree className="!w-7 !h-7" />
                    <p className="text-base !font-bold">Loại Tài Khoản</p>
                  </button>
                </Box>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                      {
                        "text-blue-500":
                          pathname === APP_ROUTES.TUNA_ADMIN.ACCOUNT.to,
                      }
                    )}
                    onClick={() => handleRedirect(AccountManager)}
                  >
                    <RiAccountPinCircleFill className="!w-7 !h-7" />
                    <p className="text-base !font-bold">Tài Khoản</p>
                  </button>
                </Box>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                      {
                        "text-blue-500":
                          pathname === APP_ROUTES.TUNA_ADMIN.DEPARTMENT.to,
                      }
                    )}
                    onClick={() => handleRedirect(DepartmentManager)}
                  >
                    <SiGoogleclassroom className="!w-7 !h-7" />
                    <p className="text-base !font-bold">Khoa</p>
                  </button>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <button
                  className={clsx(
                    "flex items-center w-full gap-4 hover:text-blue-500 cursor-pointer p-4",
                    {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.DASHBOARD.to,
                    }
                  )}
                  onClick={() => handleRedirect()}
                >
                  <Tooltip
                    title="Dashboard"
                    placement="right"
                    arrow
                    disableInteractive
                  >
                    <HomeIcon className="!w-7 !h-7" />
                  </Tooltip>
                </button>
              </Box>
              <Divider className="text-gray-700" />
              <Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx("hover:text-blue-500 cursor-pointer", {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.EMPLOYEE_MANAGER.to,
                    })}
                    onClick={() => handleRedirect(EmployeeManager)}
                  >
                    <Tooltip
                      title="Nhân Viên"
                      placement="bottom"
                      arrow
                      disableInteractive
                    >
                      <FaUsers className="!w-7 !h-7" />
                    </Tooltip>
                  </button>
                </Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx("hover:text-blue-500 cursor-pointer", {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.POSITION_MANAGER.to,
                    })}
                    onClick={() => handleRedirect(PositionManager)}
                  >
                    <Tooltip
                      title="Chức vụ"
                      placement="bottom"
                      arrow
                      disableInteractive
                    >
                      <FaUserTie className="!w-7 !h-7" />
                    </Tooltip>
                  </button>
                </Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx("hover:text-blue-500 cursor-pointer", {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.CUSTOMER_MANAGER.to,
                    })}
                    onClick={() => handleRedirect(CustomerManager)}
                  >
                    <Tooltip
                      title="Khách Hàng"
                      placement="bottom"
                      arrow
                      disableInteractive
                    >
                      <RiAccountBox2Fill className="!w-7 !h-7" />
                    </Tooltip>
                  </button>
                </Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx("hover:text-blue-500 cursor-pointer", {
                      "text-blue-500":
                        pathname ===
                        APP_ROUTES.TUNA_ADMIN.CUSTOMER_PROFILE_MANAGER.to,
                    })}
                    onClick={() => handleRedirect(CustomerProfileManager)}
                  >
                    <Tooltip
                      title="Quản Lý Hồ Sơ Đăng Ký"
                      placement="bottom"
                      arrow
                      disableInteractive
                    >
                      <RiProfileFill className="!w-7 !h-7" />
                    </Tooltip>
                  </button>
                </Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx("hover:text-blue-500 cursor-pointer", {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.DIVISION.to,
                    })}
                    onClick={() => handleRedirect(DivisionManager)}
                  >
                    <Tooltip
                      title="Quản Lý Bộ Phận"
                      placement="bottom"
                      arrow
                      disableInteractive
                    >
                      <FaUsersCog className="!w-7 !h-7" />
                    </Tooltip>
                  </button>
                </Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx("hover:text-blue-500 cursor-pointer", {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.ACCOUNT_TYPE.to,
                    })}
                    onClick={() => handleRedirect(AccountTypeManager)}
                  >
                    <Tooltip
                      title="Loại Tài Khoản"
                      placement="bottom"
                      arrow
                      disableInteractive
                    >
                      <MdOutlineAccountTree className="!w-7 !h-7" />
                    </Tooltip>
                  </button>
                </Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx("hover:text-blue-500 cursor-pointer", {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.ACCOUNT.to,
                    })}
                    onClick={() => handleRedirect(AccountManager)}
                  >
                    <Tooltip
                      title="Tài Khoản"
                      placement="bottom"
                      arrow
                      disableInteractive
                    >
                      <RiAccountPinCircleFill className="!w-7 !h-7" />
                    </Tooltip>
                  </button>
                </Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx("hover:text-blue-500 cursor-pointer", {
                      "text-blue-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.DEPARTMENT.to,
                    })}
                    onClick={() => handleRedirect(DepartmentManager)}
                  >
                    <Tooltip
                      title="Khoa"
                      placement="bottom"
                      arrow
                      disableInteractive
                    >
                      <SiGoogleclassroom className="!w-7 !h-7" />
                    </Tooltip>
                  </button>
                </Box>
              </Box>
            </>
          )}
        </Drawer>
      </Box>
      <Box>
        <Drawer
          open={isToggleDrawer}
          onClose={toggleDrawer}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: 270,
              boxSizing: "border-box",
              overflow: "auto",
            },
          }}
        >
          <Box className="flex items-center justify-between px-4 py-2">
            <Box className="flex items-center gap-2">
              <img
                src={image.imageLogo}
                alt="imageLogo"
                className="!w-8 !h-8 text-black"
              />
            </Box>
            <Box>
              <button
                className="p-1 w-6 h-6 flex items-center justify-center bg-gray-300 rounded-full"
                onClick={toggleDrawer}
              >
                <CloseIcon className="!w-5 !h-5" />
              </button>
            </Box>
          </Box>
          <Box className="p-4">
            <button
              className={clsx(
                "flex items-center w-full gap-4 hover:text-blue-500 cursor-pointer",
                {
                  "text-blue-500":
                    pathname === APP_ROUTES.TUNA_ADMIN.DASHBOARD.to,
                }
              )}
              onClick={() => handleRedirect()}
            >
              <HomeIcon className="!w-7 !h-7" />
              <p className="text-base !font-bold">Dashboard</p>
            </button>
          </Box>
          <Divider className="text-black" />
          <Box className="py-2 pl-4 pr-2 gap-4 grid">
            <button
              className={clsx(
                "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                {
                  "text-blue-500":
                    pathname === APP_ROUTES.TUNA_ADMIN.EMPLOYEE_MANAGER.to,
                }
              )}
              onClick={() => handleRedirect(EmployeeManager)}
            >
              <FaUsers className="!w-7 !h-7" />
              <p className="text-base !font-bold">Quản Lý Nhân Viên</p>
            </button>
          </Box>
          <Box className="py-2 pl-4 pr-2 gap-4 grid">
            <Box className="gap-4 grid">
              <button
                className={clsx(
                  "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                  {
                    "text-blue-500":
                      pathname === APP_ROUTES.TUNA_ADMIN.POSITION_MANAGER.to,
                  }
                )}
                onClick={() => handleRedirect(PositionManager)}
              >
                <FaUserTie className="!w-7 !h-7" />
                <p className="text-base !font-bold">Chức vụ</p>
              </button>
            </Box>
          </Box>
          <Box className="py-2 pl-4 pr-2 gap-4 grid">
            <Box className="gap-4 grid">
              <button
                className={clsx(
                  "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                  {
                    "text-blue-500":
                      pathname === APP_ROUTES.TUNA_ADMIN.CUSTOMER_MANAGER.to,
                  }
                )}
                onClick={() => handleRedirect(CustomerManager)}
              >
                <RiAccountBox2Fill className="!w-7 !h-7" />
                <p className="text-base !font-bold">Khách Hàng</p>
              </button>
            </Box>
          </Box>
          <Box className="py-2 pl-4 pr-2 gap-4 grid">
            <Box className="gap-4 grid">
              <button
                className={clsx(
                  "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                  {
                    "text-blue-500":
                      pathname ===
                      APP_ROUTES.TUNA_ADMIN.CUSTOMER_PROFILE_MANAGER.to,
                  }
                )}
                onClick={() => handleRedirect(CustomerProfileManager)}
              >
                <RiProfileFill className="!w-7 !h-7" />
                <p className="text-base !font-bold">Quản Lý Hồ Sơ Đăng Ký</p>
              </button>
            </Box>
          </Box>
          <Box className="py-2 pl-4 pr-2 gap-4 grid">
            <Box className="gap-4 grid">
              <button
                className={clsx(
                  "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                  {
                    "text-blue-500":
                      pathname === APP_ROUTES.TUNA_ADMIN.DIVISION.to,
                  }
                )}
                onClick={() => handleRedirect(DivisionManager)}
              >
                <FaUsersCog className="!w-7 !h-7" />
                <p className="text-base !font-bold">Quản Lý Bộ Phận</p>
              </button>
            </Box>
          </Box>
          <Box className="py-2 pl-4 pr-2 gap-4 grid">
            <Box className="gap-4 grid">
              <button
                className={clsx(
                  "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                  {
                    "text-blue-500":
                      pathname === APP_ROUTES.TUNA_ADMIN.ACCOUNT_TYPE.to,
                  }
                )}
                onClick={() => handleRedirect(AccountTypeManager)}
              >
                <MdOutlineAccountTree className="!w-7 !h-7" />
                <p className="text-base !font-bold">Loại Tài Khoản</p>
              </button>
            </Box>
          </Box>
          <Box className="py-2 pl-4 pr-2 gap-4 grid">
            <Box className="gap-4 grid">
              <button
                className={clsx(
                  "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                  {
                    "text-blue-500":
                      pathname === APP_ROUTES.TUNA_ADMIN.ACCOUNT.to,
                  }
                )}
                onClick={() => handleRedirect(AccountManager)}
              >
                <RiAccountPinCircleFill className="!w-7 !h-7" />
                <p className="text-base !font-bold">Tài Khoản</p>
              </button>
            </Box>
          </Box>
          <Box className="py-2 pl-4 pr-2 gap-4 grid">
            <Box className="gap-4 grid">
              <button
                className={clsx(
                  "flex items-center gap-2 w-full hover:text-blue-500 cursor-pointer",
                  {
                    "text-blue-500":
                      pathname === APP_ROUTES.TUNA_ADMIN.DEPARTMENT.to,
                  }
                )}
                onClick={() => handleRedirect(DepartmentManager)}
              >
                <SiGoogleclassroom className="!w-7 !h-7" />
                <p className="text-base !font-bold">Khoa</p>
              </button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
