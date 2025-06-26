import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { APP_ROUTES } from "../constants/routers";
import { MainLayout } from "../pages/Admin/layout-admin";
import XacMinhEmail from "../pages/XacminhEmail";
import RedirectPersonnel from "./redirectPersonnel";

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

const DanhSachMau = lazy(() => import("../pages/Admin/DanhSachMau"));

const DanhSachMauLuu = lazy(() => import("../pages/Admin/DanhSachMauLuu"));
const TaoPhieu = lazy(() => import("../pages/Admin/DanhSachMauLuu/TaoPhieu"));

const DanhSachPhanCongNoiBo = lazy(
  () => import("../pages/Admin/DanhSachPhanCongNoiBo")
);

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
            path={APP_ROUTES.TUNA_ADMIN.DANH_SACH_MAU.to}
            element={<DanhSachMau />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to}
            element={<DanhSachMauLuu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.create_mau_luu}
            element={<TaoPhieu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.to}
            element={<DanhSachPhanCongNoiBo />}
          />
        </Route>

        <Route
          path={APP_ROUTES.TUNA_XAC_MINH_EMAIL}
          element={<XacMinhEmail />}
        />
      </Routes>
    </Suspense>
  );
};

export default RoutesPersonnels;
