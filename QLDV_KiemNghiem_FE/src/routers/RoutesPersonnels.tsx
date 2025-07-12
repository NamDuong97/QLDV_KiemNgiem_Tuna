import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { APP_ROUTES } from "../constants/routers";
import { MainLayout } from "../pages/Admin/layout-admin";
import XacMinhEmail from "../pages/XacminhEmail";
import RedirectPersonnel from "./redirectPersonnel";
import NotFound from "../pages/404NotFound";

const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const LoginPage = lazy(() => import("../pages/Admin/Login"));
const ForGotPasswordPage = lazy(() => import("../pages/Admin/Forgot-password"));

const QuanLyPhieuDKyDVHN = lazy(
  () => import("../pages/Admin/QuanLyDangKyKiemNghiem")
);

const DanhSachPhieuChoPhanCongKhoaCM = lazy(
  () => import("../pages/Admin/DanhSachChoPhanCongKhoaCM")
);

const DanhSachPhanCongKhoaCM = lazy(
  () => import("../pages/Admin/DanhSachPhanCongKhoaCM")
);

const ChiTietPhanCongPhongCM = lazy(
  () => import("../pages/Admin/DanhSachPhanCongKhoaCM/ChiTietPhanCongPhongCM")
);

const SuaPhanCongPhongCM = lazy(
  () => import("../pages/Admin/DanhSachPhanCongKhoaCM/SuaPhanCongPhongCM")
);

const DanhSachMauLuu = lazy(() => import("../pages/Admin/DanhSachMauLuu"));

const DanhSachPhanCongNoiBo = lazy(
  () => import("../pages/Admin/DanhSachPhanCongNoiBo")
);

const DanhSachDuTru = lazy(() => import("../pages/Admin/DanhSachDuTru"));
const DanhSachHoaDon = lazy(() => import("../pages/Admin/DanhSachHoaDon"));
const DanhSachPhieuThu = lazy(() => import("../pages/Admin/DanhSachPhieuThu"));
const DeNghiXuatKho = lazy(() => import("../pages/Admin/DeNghiXuatKho"));
const MuaVatTu = lazy(() => import("../pages/Admin/MuaVatTu"));
const PhanTichKetQua = lazy(() => import("../pages/Admin/PhanTichKetQua"));

const RoutesPersonnels = () => {
  return (
    <Suspense>
      <Routes>
        {/* Admin Routes */}
        <Route path={APP_ROUTES.TUNA_ADMIN.LOGIN.to} element={<LoginPage />} />
        <Route
          path="/tuna"
          element={
            <RedirectPersonnel pathRedirect={APP_ROUTES.TUNA_ADMIN.LOGIN.to}>
              <MainLayout />
            </RedirectPersonnel>
          }
        >
          <Route
            path={APP_ROUTES.TUNA_ADMIN.DASHBOARD.to}
            element={<Dashboard />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.FORGOTPASSWORD.to}
            element={<ForGotPasswordPage />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.to
            }
            element={<QuanLyPhieuDKyDVHN />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.PHAN_CONG_PHONG_CHUYEN_MON.list}
            element={<DanhSachPhieuChoPhanCongKhoaCM />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.to}
            element={<DanhSachPhanCongKhoaCM />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.xem_chi_tiet
            }
            element={
              <RedirectPersonnel
                pathRedirect={
                  APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.to
                }
              >
                <ChiTietPhanCongPhongCM />
              </RedirectPersonnel>
            }
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM
                .sua_phan_cong_khoa_chuyen_mon
            }
            element={<SuaPhanCongPhongCM />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to}
            element={<DanhSachMauLuu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.to}
            element={<DanhSachPhanCongNoiBo />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.to}
            element={<DanhSachDuTru />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_HOA_DON.to}
            element={<DanhSachHoaDon />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.to}
            element={<DanhSachPhieuThu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_XUAT_KHO.to}
            element={<DeNghiXuatKho />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU.to}
            element={<MuaVatTu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.to}
            element={<PhanTichKetQua />}
          />
        </Route>

        <Route
          path={APP_ROUTES.TUNA_XAC_MINH_EMAIL}
          element={<XacMinhEmail />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesPersonnels;
