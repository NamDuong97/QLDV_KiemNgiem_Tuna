"use client";
import { Box, Drawer, Tooltip } from "@mui/material";
// import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { SiGoogleclassroom } from "react-icons/si";
import {
  AccountManager,
  AccountTypeManager,
  CustomerManager,
  CustomerProfileManager,
  danhSachPhanCong,
  DepartmentManager,
  DivisionManager,
  EmployeeManager,
  PhieuDKyDVKNManager,
  PositionManager,
  quanLyPhanCongKhoaChuyenMon,
  // SidebarTab,
} from "../../models/Sidebar";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "../../constants/routers";
// import { image } from "../../constants/image";
import clsx from "clsx";
// import { RiProfileFill } from "react-icons/ri";
// import { MdOutlineAccountTree } from "react-icons/md";
// import { RiAccountPinCircleFill } from "react-icons/ri";
// import { RiAccountBox2Fill } from "react-icons/ri";
// import { FaUsersCog } from "react-icons/fa";
// import { SiGoogleclassroom } from "react-icons/si";
// import { TiDocumentText } from "react-icons/ti";
import { MdAssignment } from "react-icons/md";
import { FaVoteYea } from "react-icons/fa";
import { image } from "../../constants/image";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";

interface SideBarProps {
  drawerWidth: number;
  isMenuDashBoard: boolean;
  handleMenuDashBoard: Dispatch<SetStateAction<boolean>>;
}

const SideBar = (props: SideBarProps) => {
  const { drawerWidth, isMenuDashBoard, handleMenuDashBoard } = props;
  const pathname = useLocation().pathname;

  const navigate = useNavigate();

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
      case PhieuDKyDVKNManager:
        return navigate(
          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
        );
      case danhSachPhanCong:
        return navigate(
          APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_PHONG_CHUYEN_MON.to
        );
      case quanLyPhanCongKhoaChuyenMon:
        return navigate(
          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_KHOA_CHUYEN_MON.to
        );
      default:
        return navigate(APP_ROUTES.TUNA_ADMIN.DASHBOARD.to);
    }
  };

  console.log('pathname.split("/")[0]', pathname.split("/")[2]);

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
              overflow: "auto",
              borderRight: "2px solid #005f78",
              boxShadow: "4px 0 4px rgba(0,0,0,0.25)",
            },
          }}
        >
          {isMenuDashBoard ? (
            <>
              <Box className="px-1 pt-2 flex justify-center">
                <img
                  src={image.imageTunaLogo}
                  alt="imageTunaLogo"
                  className="h-20"
                />
              </Box>
              <Box className="p-4">
                <button
                  className={clsx(
                    "flex items-center w-full gap-2 text-cyan-800 hover:text-orange-500 cursor-pointer",
                    {
                      "text-orange-500":
                        pathname === APP_ROUTES.TUNA_ADMIN.DASHBOARD.to,
                    }
                  )}
                  onClick={() => {
                    handleRedirect();
                    handleMenuDashBoard(false);
                  }}
                >
                  <HomeIcon className="!w-8 !h-8" />
                  <p className="text-base !font-bold uppercase">Thống kê</p>
                </button>
              </Box>
              {/* <Box className="py-2 pl-4 pr-2 gap-4 grid">
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
              </Box> */}
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-start gap-2 w-full text-cyan-800 hover:text-orange-500 cursor-pointer",
                      {
                        "text-orange-500":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(PhieuDKyDVKNManager);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <FaVoteYea className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Phiếu đăng ký kiểm nghiệm
                    </p>
                  </button>
                </Box>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-center gap-2 w-full text-cyan-800 hover:text-orange-500 cursor-pointer",
                      {
                        "text-orange-500":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_PHONG_CHUYEN_MON.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(danhSachPhanCong);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <MdAssignment className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Danh sách phân công
                    </p>
                  </button>
                </Box>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-start gap-2 w-full text-cyan-800 hover:text-orange-500 cursor-pointer",
                      {
                        "text-orange-500":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_KHOA_CHUYEN_MON.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyPhanCongKhoaChuyenMon);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <SiGoogleclassroom className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Danh sách phân công khoa chuyên môn
                    </p>
                  </button>
                </Box>
              </Box>
              <Box className="py-2 pl-4 pr-2 gap-4 grid">
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx(
                      "text-cyan-800 hover:text-orange-500 cursor-pointer"
                    )}
                    onClick={() => handleMenuDashBoard(false)}
                  >
                    <Tooltip
                      title="Đóng lại"
                      placement="bottom"
                      arrow
                      disableInteractive
                    >
                      <FaArrowAltCircleRight className="!w-7 !h-7 rotate-180" />
                    </Tooltip>
                  </button>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box className="px-1 pt-2">
                <img src={image.imageTunaLogo} alt="imageTunaLogo" />
              </Box>
              <Box>
                <button
                  className={clsx(
                    "flex items-center justify-center w-full gap-4 text-cyan-800 hover:text-orange-500 cursor-pointer p-4",
                    {
                      "text-orange-500 ":
                        pathname === APP_ROUTES.TUNA_ADMIN.DASHBOARD.to,
                    }
                  )}
                  onClick={() => handleRedirect()}
                >
                  <Tooltip
                    title="Thống Kê"
                    placement="right"
                    arrow
                    disableInteractive
                  >
                    <HomeIcon className="!w-8 !h-8" />
                  </Tooltip>
                </button>
              </Box>
              <Box>
                {/* <Box className="flex items-center justify-center p-[10px]">
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
                </Box> */}
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx(
                      "text-cyan-800 hover:text-orange-500 cursor-pointer",
                      {
                        "text-orange-500":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(PhieuDKyDVKNManager)}
                  >
                    <Tooltip
                      title="Phiếu đăng ký kiểm nghiệm"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <FaVoteYea className="!w-8 !h-8" />
                    </Tooltip>
                  </button>
                </Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx(
                      "text-cyan-800 hover:text-orange-500 cursor-pointer",
                      {
                        "text-orange-500":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_PHONG_CHUYEN_MON.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(danhSachPhanCong)}
                  >
                    <Tooltip
                      title="Danh sách phân công"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <MdAssignment className="!w-8 !h-8" />
                    </Tooltip>
                  </button>
                </Box>
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx(
                      "text-cyan-800 hover:text-orange-500 cursor-pointer",
                      {
                        "text-orange-500":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_KHOA_CHUYEN_MON.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyPhanCongKhoaChuyenMon)}
                  >
                    <Tooltip
                      title="Danh sách phân công khoa chuyên môn"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <SiGoogleclassroom className="!w-8 !h-8" />
                    </Tooltip>
                  </button>
                </Box>
              </Box>
              <Box className="flex items-center justify-center p-[10px]">
                <button
                  className={clsx(
                    "text-cyan-800 hover:text-orange-500 cursor-pointer"
                  )}
                  onClick={() => handleMenuDashBoard(true)}
                >
                  <Tooltip
                    title="Mở rộng"
                    placement="right"
                    arrow
                    disableInteractive
                  >
                    <FaArrowAltCircleRight className="!w-7 !h-7" />
                  </Tooltip>
                </button>
              </Box>
            </>
          )}
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
