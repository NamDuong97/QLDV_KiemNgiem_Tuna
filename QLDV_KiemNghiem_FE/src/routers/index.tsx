import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { APP_ROUTES } from "../constants/routers";

import LayoutAdmin from "../pages/admin/layout-admin";
import LayoutCustomer from "../pages/customer/layout";
import LayoutCustomerManager from "../pages/customer/manager/layout";
const PhieuDKyDVKN = lazy(
  () => import("../pages/customer/manager/PhieuDKyDVKN")
);
const QuanLyHoaDon = lazy(
  () => import("../pages/customer/manager/QuanLyHoaDon")
);
const EditPhieuDKyDVKN = lazy(
  () => import("../pages/customer/manager/PhieuDKyDVKN/editPhieuDKyDVKN")
);
import Redirect from "./redirect";
const ShowPhieuDKyDVKN = lazy(
  () => import("../pages/customer/manager/PhieuDKyDVKN/showPhieuDKyDVKN")
);
const XemChiTiet = lazy(
  () =>
    import("../pages/customer/manager/QuanLyHoaDon/ChiTietHoaDon/XemChiTiet")
);
const ThanhToanHoaDon = lazy(
  () =>
    import(
      "../pages/customer/manager/QuanLyHoaDon/ChiTietHoaDon/ThanhToanHoaDon"
    )
);

const Dashboard = lazy(() => import("../pages/admin/dashboard"));
const LoginPage = lazy(() => import("../pages/admin/login"));
const ForGotPasswordPage = lazy(() => import("../pages/admin/forgot-password"));
// const ListEmployeeManager = lazy(
//   () => import("../pages/admin/employee-manager")
// );
// const PositionManager = lazy(() => import("../pages/admin/position-manager"));
// const CustomerManager = lazy(() => import("../pages/admin/customer-manager"));
// const CustomerProfileManager = lazy(
//   () => import("../pages/admin/customer-profile-manager")
// );
// const AccountTypeManager = lazy(() => import("../pages/admin/account-type"));
// const AccountManager = lazy(() => import("../pages/admin/account"));
// const DivisionManager = lazy(() => import("../pages/admin/division"));
// const DepartmentManager = lazy(() => import("../pages/admin/department"));

const Home = lazy(() => import("../pages/customer/home"));
const FormSignUpDVKN = lazy(() => import("../pages/customer/formSignUpDVKN"));

const QuanLyPhieuDKyDVHN = lazy(
  () => import("../pages/admin/manager-phieudkydvkn")
);
const ChiTietPhieuDKyDVKN = lazy(
  () => import("../pages/admin/manager-phieudkydvkn/ChiTietPhieuDKyDVKN")
);

const PhanCongPhongCM = lazy(() => import("../pages/admin/PhanCongPhongCM"));

const DanhSachPhanCong = lazy(() => import("../pages/admin/DanhSachPhanCong"));

const ChoXetDuyet = lazy(
  () => import("../pages/admin/DanhSachPhanCong/ChiTiePhanCong/ChoXetDuyet")
);

const XemChiTietPhanCong = lazy(
  () => import("../pages/admin/DanhSachPhanCong/ChiTiePhanCong/XemChiTiet")
);

const QuanLyPhanCongKhoaChuyenMon = lazy(
  () => import("../pages/admin/managerPhanCongKhoa")
);

const XemChiTietPhanCongKhoa = lazy(
  () => import("../pages/admin/managerPhanCongKhoa/XemChiTietPhanCongKhoa")
);

const Routers = () => {
  return (
    <Suspense>
      <Routes>
        {/* Admin Routes */}
        <Route path="/tuna" element={<LayoutAdmin />}>
          <Route
            path={APP_ROUTES.TUNA_ADMIN.DASHBOARD.to}
            element={<Dashboard />}
          />
          {/* <Route
            path={APP_ROUTES.TUNA_ADMIN.EMPLOYEE_MANAGER.to}
            element={<ListEmployeeManager />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.POSITION_MANAGER.to}
            element={<PositionManager />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.CUSTOMER_MANAGER.to}
            element={<CustomerManager />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.CUSTOMER_PROFILE_MANAGER.to}
            element={<CustomerProfileManager />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.DIVISION.to}
            element={<DivisionManager />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.DEPARTMENT.to}
            element={<DepartmentManager />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.ACCOUNT_TYPE.to}
            element={<AccountTypeManager />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.ACCOUNT.to}
            element={<AccountManager />}
          /> */}
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LOGIN.to}
            element={<LoginPage />}
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
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DANG_KY_DICH_VU_KIEM_NGHIEM.id
            }
            element={<ChiTietPhieuDKyDVKN />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.PHAN_CONG_PHONG_CHUYEN_MON.to}
            element={<PhanCongPhongCM />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_PHONG_CHUYEN_MON.to}
            element={<DanhSachPhanCong />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_PHONG_CHUYEN_MON
                .id_cho_xet_duyet
            }
            element={<ChoXetDuyet />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_PHONG_CHUYEN_MON
                .id_xem_chi_tiet
            }
            element={<XemChiTietPhanCong />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_KHOA_CHUYEN_MON.to}
            element={<QuanLyPhanCongKhoaChuyenMon />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_KHOA_CHUYEN_MON
                .id_xem_chi_tiet
            }
            element={<XemChiTietPhanCongKhoa />}
          />
        </Route>

        {/* ==== Customer Routes ====*/}
        <Route element={<LayoutCustomer />}>
          <Route path={APP_ROUTES.TUNA_CUSTOMER.HOME.to} element={<Home />} />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to}
            element={<FormSignUpDVKN />}
          />

          {/* Customer Manager Pages */}
          <Route element={<LayoutCustomerManager />}>
            <Route
              path={APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}
              element={<PhieuDKyDVKN />}
            />
            <Route
              path={APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to}
              element={<QuanLyHoaDon />}
            />
          </Route>
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.to}
            element={
              <Redirect path={APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}>
                <EditPhieuDKyDVKN />
              </Redirect>
            }
          />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.SHOW_PHIEU_DKY_DVKN.to}
            element={
              <Redirect path={APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}>
                <ShowPhieuDKyDVKN />
              </Redirect>
            }
          />
          <Route
            path={
              APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.SHOW_THANH_TOAN_HOA_DON
                .to
            }
            element={
              // <Redirect path={APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to}>
              <ThanhToanHoaDon />
              // </Redirect>
            }
          />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.SHOW_HOA_DON.to}
            element={
              // <Redirect path={APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to}>
              <XemChiTiet />
              // </Redirect>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routers;
