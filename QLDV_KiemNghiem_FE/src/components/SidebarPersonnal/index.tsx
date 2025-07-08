import {
  Home,
  Clipboard,
  Archive,
  Share,
  FileText,
  ShoppingCart,
} from "react-feather";
import { image } from "../../constants/image";
import {
  danhSachHoaDon,
  danhSachPhanCong,
  danhSachPhanCongNoiBo,
  danhSachPhieuDuTru,
  danhSachPhieuMuaVatTu,
  phanCongKhoaCM,
  PhieuDKyDVKNManager,
  quanLyHoaDonTrangAdmin,
  quanLyLuuMau,
  quanLyMau,
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
import { APP_ROUTES } from "../../constants/routers";
import { useLocation, useNavigate } from "react-router";
import clsx from "clsx";
import { MdAssignment, MdAssignmentInd, MdReceiptLong } from "react-icons/md";
import { usePersonnel } from "../../contexts/PersonelsProvider";
import { TbLogout } from "react-icons/tb";
import { role } from "../../configs/parseJwt";
import { FaFlask } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { getChucVuByID } from "../../hooks/personnels/queryChucVu";
import { getRoleGroup } from "../../configs/Role";

const SidebarPersonnal = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { personnelInfo, logout } = usePersonnel();

  const { data } = getChucVuByID({
    queryKey: "getChucVuByID",
    params: personnelInfo?.maChucVu,
  });

  const handleRedirect = (value?: string) => {
    switch (value) {
      case PhieuDKyDVKNManager:
        return navigate(
          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
        );
      case danhSachPhanCong:
        return navigate(APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.to);
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
      case phanCongKhoaCM:
        return navigate(APP_ROUTES.TUNA_ADMIN.PHAN_CONG_PHONG_CHUYEN_MON.list);
      case quanLyMau:
        return navigate(APP_ROUTES.TUNA_ADMIN.DANH_SACH_MAU.to);
      default:
        return navigate(APP_ROUTES.TUNA_ADMIN.DASHBOARD.to);
    }
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 ">
        <img src={image.imageTunaLogo} alt="imageTunaLogo" className="h-16" />
      </div>
      <div className="flex flex-col flex-grow p-4 overflow-auto">
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => {
              handleRedirect();
            }}
            className={clsx(
              "flex sidebar-link items-center space-x-2 px-4 py-3 text-gray-700 rounded-lg",
              {
                "text-indigo-600 active":
                  pathname === APP_ROUTES.TUNA_ADMIN.DASHBOARD.to,
              }
            )}
          >
            <Home
              className={clsx("w-5 h-5 text-gray-500", {
                "text-indigo-600":
                  pathname === APP_ROUTES.TUNA_ADMIN.DASHBOARD.to,
              })}
            />
            <span className="capitalize">Tổng quan</span>
          </button>
          <div className="flex flex-col space-y-2">
            <div className="pl-4">
              <p className="uppercase font-bold text-gray-400 text-sm/4">
                Quản lý
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              {(getRoleGroup(role) === "KHTH" ||
                getRoleGroup(role) === "BLD") && (
                <>
                  <button
                    onClick={() => {
                      handleRedirect(PhieuDKyDVKNManager);
                    }}
                    className={clsx(
                      "flex items-center space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                      {
                        "text-indigo-600 active":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to.split(
                            "/"
                          )[2],
                      }
                    )}
                  >
                    <span className="w-5">
                      <Clipboard
                        className={clsx("w-5 h-5 text-gray-500", {
                          "text-indigo-600":
                            pathname.split("/")[2] ===
                            APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to.split(
                              "/"
                            )[2],
                        })}
                      />
                    </span>
                    <span className="text-start capitalize">Phiếu kiểm nghiệm</span>
                  </button>
                  <button
                    onClick={() => {
                      handleRedirect(phanCongKhoaCM);
                    }}
                    className={clsx(
                      "flex items-start space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                      {
                        "text-indigo-600 active":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.PHAN_CONG_PHONG_CHUYEN_MON.list.split(
                            "/"
                          )[2],
                      }
                    )}
                  >
                    <span className="w-5">
                      <MdAssignmentInd
                        className={clsx("w-5 h-5 text-gray-500", {
                          "text-indigo-600":
                            pathname.split("/")[2] ===
                            APP_ROUTES.TUNA_ADMIN.PHAN_CONG_PHONG_CHUYEN_MON.list.split(
                              "/"
                            )[2],
                        })}
                      />
                    </span>
                    <span className="text-start capitalize">
                      Phân công Khoa chuyên môn
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handleRedirect(quanLyMau);
                    }}
                    className={clsx(
                      "flex items-center space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                      {
                        "text-indigo-600 active":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.DANH_SACH_MAU.to.split("/")[2],
                      }
                    )}
                  >
                    <span className="w-5">
                      <FaFlask
                        className={clsx("w-5 h-5 text-gray-500", {
                          "text-indigo-600":
                            pathname.split("/")[2] ===
                            APP_ROUTES.TUNA_ADMIN.DANH_SACH_MAU.to.split(
                              "/"
                            )[2],
                        })}
                      />
                    </span>
                    <span className="text-start capitalize">Danh sách mẫu</span>
                  </button>
                </>
              )}

              {(getRoleGroup(role) === "BLD" ||
                getRoleGroup(role) === "KHTH" ||
                role === "KN_L" ||
                role === "KN_P") && (
                <button
                  onClick={() => {
                    handleRedirect(danhSachPhanCong);
                  }}
                  className={clsx(
                    "flex items-start space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                    {
                      "text-indigo-600 active":
                        pathname.split("/")[2] ===
                        APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.to.split(
                          "/"
                        )[2],
                    }
                  )}
                >
                  <span className="w-5">
                    <MdAssignment
                      className={clsx("w-5 h-5 text-gray-500", {
                        "text-indigo-600":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.to.split(
                            "/"
                          )[2],
                      })}
                    />
                  </span>
                  <span className="text-start capitalize">Danh sách phân công khoa</span>
                </button>
              )}
              {(getRoleGroup(role) === "BLD" ||
                getRoleGroup(role) === "KN") && (
                <>
                  {(role === "KN_L" ||
                    role === "KN_P" ||
                    getRoleGroup(role) === "BLD") && (
                    <button
                      onClick={() => {
                        handleRedirect(quanLyLuuMau);
                      }}
                      className={clsx(
                        "flex items-center space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                        {
                          "text-indigo-600 active":
                            pathname.split("/")[2] ===
                            APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to.split(
                              "/"
                            )[2],
                        }
                      )}
                    >
                      <span className="w-5">
                        <Archive
                          className={clsx("w-5 h-5 text-gray-500", {
                            "text-indigo-600":
                              pathname.split("/")[2] ===
                              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to.split(
                                "/"
                              )[2],
                          })}
                        />
                      </span>
                      <span className="text-start capitalize">Phiếu lưu mẫu</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleRedirect(quanLyPhanCongNoiBo);
                    }}
                    className={clsx(
                      "flex items-center space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                      {
                        "text-indigo-600 active":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.to.split(
                            "/"
                          )[2],
                      }
                    )}
                  >
                    <span className="w-5">
                      <Share
                        className={clsx("w-5 h-5 text-gray-500", {
                          "text-indigo-600":
                            pathname.split("/")[2] ===
                            APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.to.split(
                              "/"
                            )[2],
                        })}
                      />
                    </span>
                    <span className="text-start capitalize">Phân công nội bộ</span>
                  </button>
                  <button
                    onClick={() => {
                      handleRedirect(quanLyPhieuDuTru);
                    }}
                    className={clsx(
                      "flex items-center space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                      {
                        "text-indigo-600 active":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                  >
                    <span className="w-5">
                      <FileText
                        className={clsx("w-5 h-5 text-gray-500", {
                          "text-indigo-600":
                            pathname.split("/")[2] ===
                            APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.to.split(
                              "/"
                            )[2],
                        })}
                      />
                    </span>
                    <span className="text-start capitalize">Phiếu Dự trù</span>
                  </button>
                </>
              )}

              {(getRoleGroup(role) === "BLD" ||
                getRoleGroup(role) === "KHTH" ||
                getRoleGroup(role) === "KET" ||
                getRoleGroup(role) === "KYT") && (
                <button
                  onClick={() => {
                    handleRedirect(quanLyHoaDonTrangAdmin);
                  }}
                  className={clsx(
                    "flex items-center space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                    {
                      "text-indigo-600 active":
                        pathname.split("/")[2] ===
                        APP_ROUTES.TUNA_ADMIN.QUAN_LY_HOA_DON.to.split("/")[2],
                    }
                  )}
                >
                  <span className="w-5">
                    <MdReceiptLong
                      className={clsx("w-5 h-5 text-gray-500", {
                        "text-indigo-600":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_HOA_DON.to.split(
                            "/"
                          )[2],
                      })}
                    />
                  </span>
                  <span className="text-start capitalize">Hóa đơn</span>
                </button>
              )}
              <button
                onClick={() => {
                  handleRedirect(quanLyPhieuPhanTichKetQua);
                }}
                className={clsx(
                  "flex items-start space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                  {
                    "text-indigo-600 active":
                      pathname.split("/")[2] ===
                      APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.to.split(
                        "/"
                      )[2],
                  }
                )}
              >
                <span className="w-5">
                  <FaChartLine
                    className={clsx("w-5 h-5 text-gray-500", {
                      "text-indigo-600":
                        pathname.split("/")[2] ===
                        APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.to.split(
                          "/"
                        )[2],
                    })}
                  />
                </span>
                <span className="text-start capitalize">Phiếu Phân tích kết quả</span>
              </button>
              {/* {(getRoleGroup(role) === "BLD" ||
                getRoleGroup(role) === "KET") && (
                <>
                  <button
                    onClick={() => {
                      handleRedirect(quanLyPhieuThu);
                    }}
                    className={clsx(
                      "flex items-center space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                      {
                        "text-indigo-600 active":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                  >
                    <span className="w-5">
                      <HiClipboardDocumentList
                        className={clsx("w-5 h-5 text-gray-500", {
                          "text-indigo-600":
                            pathname.split("/")[2] ===
                            APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.to.split(
                              "/"
                            )[2],
                        })}
                      />
                    </span>
                    <span className="text-start">Phiếu thu</span>
                  </button>
                  <button
                    onClick={() => {
                      handleRedirect(quanLyPhieuMuaVatTu);
                    }}
                    className={clsx(
                      "flex items-center space-x-2 sidebar-link px-4 py-3 text-gray-700 rounded-lg",
                      {
                        "text-indigo-600 active":
                          pathname.split("/")[2] ===
                          APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU.to.split(
                            "/"
                          )[2],
                      }
                    )}
                  >
                    <span className="w-5">
                      <ShoppingCart
                        className={clsx("w-5 h-5 text-gray-500", {
                          "text-indigo-600":
                            pathname.split("/")[2] ===
                            APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU.to.split(
                              "/"
                            )[2],
                        })}
                      />
                    </span>
                    <span className="text-start">Mua vật tư</span>
                  </button>
                </>
              )} */}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="pl-4">
              <p className="uppercase font-bold text-gray-400 text-sm/4">
                Cài đặt
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <button
                onClick={logout}
                className="flex items-center space-x-2 sidebar-link px-4 py-3 text-red-500 rounded-lg"
              >
                <span className="w-5">
                  <TbLogout className="w-5 h-5 text-red-500" />
                </span>
                <span className="text-start">Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200  hover:bg-[#6366f11a]">
        <div className="flex items-center cursor-pointer">
          <img
            className="w-10 h-10 rounded-full border border-blue-500"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234f46e5'%3E%3Ccircle cx='12' cy='7' r='5'/%3E%3Cpath d='M17 14h.26A8.74 8.74 0 0121 22.6v.4H3v-.4A8.74 8.74 0 016.74 14H17z'/%3E%3C/svg%3E"
            alt="Avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">
              {personnelInfo?.hoTen}
            </p>
            <p className="text-xs text-gray-500">{data?.tenChucVu}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPersonnal;
