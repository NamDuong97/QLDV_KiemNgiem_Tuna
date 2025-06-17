import { Box, Drawer, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { SiGoogleclassroom } from "react-icons/si";
import {
  danhSachHoaDon,
  danhSachPhanCong,
  danhSachPhanCongNoiBo,
  danhSachPhieuDuTru,
  danhSachPhieuMuaVatTu,
  PhieuDKyDVKNManager,
  quanLyHoaDonTrangAdmin,
  quanLyLuuMau,
  quanLyNhanVien,
  quanLyPhanCongKhoaChuyenMon,
  quanLyPhanCongNoiBo,
  quanLyPhieuDuTru,
  quanLyPhieuMuaVatTu,
  quanLyPhieuPhanTichKetQua,
  quanLyPhieuThu,
  quanLyPhieuTienDo,
  quanLyPhieuXuatKho,
} from "../../models/Sidebar";
import { useLocation, useNavigate } from "react-router";
import { APP_ROUTES } from "../../constants/routers";
import clsx from "clsx";
import {
  MdAddShoppingCart,
  MdAssignment,
  MdAssignmentInd,
  MdReceipt,
  MdReceiptLong,
  MdTimeline,
} from "react-icons/md";
import {
  FaBox,
  FaChartBar,
  FaFileSignature,
  FaFlask,
  FaShoppingCart,
  FaUserCheck,
  FaVoteYea,
} from "react-icons/fa";
import { image } from "../../constants/image";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { FaUsers } from "react-icons/fa6";
import { VscSaveAs } from "react-icons/vsc";
import { GiTestTubes } from "react-icons/gi";
import { usePersonnel } from "../../contexts/PersonelsProvider";

interface SideBarProps {
  drawerWidth: number;
  isMenuDashBoard: boolean;
  handleMenuDashBoard: Dispatch<SetStateAction<boolean>>;
}

const SideBar = (props: SideBarProps) => {
  const { drawerWidth, isMenuDashBoard, handleMenuDashBoard } = props;
  const pathname = useLocation().pathname;
  const { personnelInfo } = usePersonnel();
  console.log("personnelInfo", personnelInfo);

  const navigate = useNavigate();

  const handleRedirect = (value?: string) => {
    switch (value) {
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
      case quanLyNhanVien:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_NHAN_VIEN.to);
      case quanLyLuuMau:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to);
      case quanLyPhanCongNoiBo:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.to);
      case danhSachPhanCongNoiBo:
        return navigate(APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_NOI_BO.to);
      case quanLyPhieuDuTru:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.to);
      case danhSachPhieuDuTru:
        return navigate(APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_DU_TRU.to);
      case quanLyPhieuXuatKho:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_XUAT_KHO.to);
      case quanLyPhieuMuaVatTu:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU.to);
      case danhSachPhieuMuaVatTu:
        return navigate(APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_MUA_VAT_TU.to);
      case quanLyHoaDonTrangAdmin:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_HOA_DON.to);
      case danhSachHoaDon:
        return navigate(APP_ROUTES.TUNA_ADMIN.LIST_HOA_DON.to);
      case quanLyPhieuTienDo:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_TIEN_DO.to);
      case quanLyPhieuPhanTichKetQua:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.to);
      case quanLyPhieuThu:
        return navigate(APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.to);
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
                <Box className="gap-4 grid">
                  <button
                    className={clsx(
                      "flex items-center gap-2 w-full text-cyan-800 hover:text-orange-500 cursor-pointer",
                      {
                        "text-orange-500":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_NHAN_VIEN.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyNhanVien);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <FaUsers className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Quản lý nhân viên
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyLuuMau);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <VscSaveAs className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Quản lý Lưu Mẫu
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyPhanCongNoiBo);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <MdAssignmentInd className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Quản lý Phân công nội bộ
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
                          APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_NOI_BO.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(danhSachPhanCongNoiBo);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <FaUserCheck className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Danh sách Phân công nội bộ
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyPhieuDuTru);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <FaFlask className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Quản lý phiếu dự trù
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
                          APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_DU_TRU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(danhSachPhieuDuTru);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <GiTestTubes className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Danh Sách phiếu dự trù
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
                          APP_ROUTES.TUNA_ADMIN.LIST_HOA_DON.to.split("/")[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(danhSachHoaDon);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <MdReceiptLong className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Danh Sách Hóa Đơn
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
                          APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_MUA_VAT_TU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(danhSachPhieuMuaVatTu);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <FaShoppingCart className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      Danh Sách phiếu mua vật tư
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_HOA_DON.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyHoaDonTrangAdmin);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <MdReceipt className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      quản lý hóa đơn
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyPhieuMuaVatTu);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <MdAddShoppingCart className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      quản lý phiếu mua vật tư
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyPhieuPhanTichKetQua);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <FaChartBar className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      quản lý phiếu phân tích kết quả
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_XUAT_KHO.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyPhieuXuatKho);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <FaBox className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      quản lý phiếu xuất kho
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_TIEN_DO.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyPhieuTienDo);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <MdTimeline className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      quản lý phiếu tiến độ
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => {
                      handleRedirect(quanLyPhieuThu);
                      handleMenuDashBoard(false);
                    }}
                  >
                    <div className="w-8">
                      <FaFileSignature className="!w-8 !h-8" />
                    </div>

                    <p className="text-base !font-bold whitespace-normal text-start uppercase">
                      quản lý phiếu thu
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
                    title="Thống kê"
                    placement="right"
                    arrow
                    disableInteractive
                  >
                    <HomeIcon className="!w-8 !h-8" />
                  </Tooltip>
                </button>
              </Box>
              <Box>
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
                <Box className="flex items-center justify-center p-[10px]">
                  <button
                    className={clsx(
                      "text-cyan-800 hover:text-orange-500 cursor-pointer",
                      {
                        "text-orange-500":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_NHAN_VIEN.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyNhanVien)}
                  >
                    <Tooltip
                      title="Quản lý nhân viên"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <FaUsers className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyLuuMau)}
                  >
                    <Tooltip
                      title="Quản lý lưu mẫu"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <VscSaveAs className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyPhanCongNoiBo)}
                  >
                    <Tooltip
                      title="Quản lý phân công nội bộ"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <MdAssignmentInd className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_NOI_BO.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(danhSachPhanCongNoiBo)}
                  >
                    <Tooltip
                      title="Danh sách phân công nội bộ"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <FaUserCheck className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyPhieuDuTru)}
                  >
                    <Tooltip
                      title="Quản lý phiếu dự trù"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <FaFlask className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_DU_TRU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(danhSachPhieuDuTru)}
                  >
                    <Tooltip
                      title="Danh sách phiếu dự trù"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <GiTestTubes className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.LIST_HOA_DON.to.split("/")[2],
                      }
                    )}
                    onClick={() => handleRedirect(danhSachHoaDon)}
                  >
                    <Tooltip
                      title="Danh sách hóa đơn"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <MdReceiptLong className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_MUA_VAT_TU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(danhSachPhieuMuaVatTu)}
                  >
                    <Tooltip
                      title="Danh sách phiếu mua vật tư"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <FaShoppingCart className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_HOA_DON.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyHoaDonTrangAdmin)}
                  >
                    <Tooltip
                      title="Quản lý hóa đơn"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <MdReceipt className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyPhieuMuaVatTu)}
                  >
                    <Tooltip
                      title="Quản lý phiếu mua vật tư"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <MdAddShoppingCart className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyPhieuPhanTichKetQua)}
                  >
                    <Tooltip
                      title="Quản lý phiếu phân tích kết quả"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <FaChartBar className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_XUAT_KHO.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyPhieuXuatKho)}
                  >
                    <Tooltip
                      title="Quản lý phiếu xuất kho"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <FaBox className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_TIEN_DO.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyPhieuTienDo)}
                  >
                    <Tooltip
                      title="Quản lý phiếu tiến độ"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <MdTimeline className="!w-8 !h-8" />
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
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                    onClick={() => handleRedirect(quanLyPhieuThu)}
                  >
                    <Tooltip
                      title="Quản lý phiếu thu"
                      placement="right"
                      arrow
                      disableInteractive
                    >
                      <FaFileSignature className="!w-8 !h-8" />
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
