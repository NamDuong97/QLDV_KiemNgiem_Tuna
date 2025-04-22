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
import CreateMau from "../pages/customer/create-mau";
import EditMau from "../pages/customer/edit-mau";

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
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
