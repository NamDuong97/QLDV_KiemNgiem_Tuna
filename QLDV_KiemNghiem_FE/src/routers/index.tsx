import { Route, Routes } from "react-router";
import { APP_ROUTES } from "../constants/routers";
import Dashboard from "../pages/admin/dashboard";
import LoginPage from "../pages/admin/login";
import ForGotPasswordPage from "../pages/admin/forgot-password";
import ListEmployeeManager from "../pages/admin/employee-manager";
import PositionManager from "../pages/admin/position-manager";
import CustomerManager from "../pages/admin/customer-manager";
import CustomerProfileManager from "../pages/admin/customer-profile-manager";
import AccountTypeManager from "../pages/admin/account-type";
import AccountManager from "../pages/admin/account";
import DivisionManager from "../pages/admin/division";
import DepartmentManager from "../pages/admin/department";
import LayoutAdmin from "../pages/admin/layout-admin";
import LayoutCustomer from "../pages/customer/layout";
import Home from "../pages/customer/home";
import FormSignUpDVKN from "../pages/customer/form-signup-DVKN";
import CreateMau from "../pages/customer/form-signup-DVKN/create-mau";
import EditMau from "../pages/customer/form-signup-DVKN/edit-mau";
import PhieuDKyDVKN from "../pages/customer/manager/PhieuDKyDVKN";
import Edit_PhieuDKyDVKN from "../pages/customer/manager/PhieuDKyDVKN/Edit_PhieuDKyDVKN";
import PhieuDKyDVKN_CreateMau from "../pages/customer/manager/PhieuDKyDVKN/Edit_PhieuDKyDVKN/PhieuDKyDVKN_CreateMau";
import PhieuDKyDVKN_EditMau from "../pages/customer/manager/PhieuDKyDVKN/Edit_PhieuDKyDVKN/PhieuDKyDVKN_EditMau";
import QuanLyHoaDon from "../pages/customer/manager/QuanLyHoaDon";
import LayoutCustomerManager from "../pages/customer/manager/layout";
import QuanLyPhieuDKyDVHN from "../pages/admin/manager-phieudkydvkn";
import ChiTietPhieuDKyDVKN from "../pages/admin/manager-phieudkydvkn/ChiTietPhieuDKyDVKN";

interface Props {}

const Routers = (props: Props) => {
  const {} = props;
  return (
    <div>
      <Routes>
        <Route path="/tuna" element={<LayoutAdmin />}>
          <Route
            path={APP_ROUTES.TUNA_ADMIN.DASHBOARD.to}
            element={<Dashboard />}
          />
          <Route
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
          />
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
        </Route>

        <Route element={<LayoutCustomer />}>
          <Route path={APP_ROUTES.TUNA_CUSTOMER.HOME.to} element={<Home />} />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to}
            element={<FormSignUpDVKN />}
          />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.CREATE_MAU.to}
            element={<CreateMau />}
          />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.Edit_MAU.to}
            element={<EditMau />}
          />

          {/* Trang Quản lý phía Khách hàng */}
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
            element={<Edit_PhieuDKyDVKN />}
          />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.CREATE_MAU.to}
            element={<PhieuDKyDVKN_CreateMau />}
          />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.Edit_MAU.to}
            element={<PhieuDKyDVKN_EditMau />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
