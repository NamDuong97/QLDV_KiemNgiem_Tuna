import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { APP_ROUTES } from "../constants/routers";
import LayoutCustomer from "../pages/Guest/layout";
import LayoutCustomerManager from "../pages/Guest/manager/layout";
const PhieuDKyDVKN = lazy(() => import("../pages/Guest/manager/PhieuDKyDVKN"));
const QuanLyHoaDon = lazy(() => import("../pages/Guest/manager/QuanLyHoaDon"));
const EditPhieuDKyDVKN = lazy(
  () => import("../pages/Guest/manager/PhieuDKyDVKN/editPhieuDKyDVKN")
);
import XacMinhEmail from "../pages/XacminhEmail";
import RedirectCustomer from "./redirectCustomer";
import { StoreProvider } from "../contexts/storeProvider";
import NotFound from "../pages/404NotFound";

const ProfileCustomer = lazy(() => import("../pages/Guest/manager/Profile"));

const ShowPhieuDKyDVKN = lazy(
  () => import("../pages/Guest/manager/PhieuDKyDVKN/showPhieuDKyDVKN")
);
const XemChiTiet = lazy(
  () => import("../pages/Guest/manager/QuanLyHoaDon/ChiTietHoaDon/XemChiTiet")
);

const PhanTichKetQua = lazy(
  () => import("../pages/Guest/manager/PhanTichKetQua")
);

const ShowDetail = lazy(
  () => import("../pages/Guest/manager/PhanTichKetQua/ShowDetail")
);

const Home = lazy(() => import("../pages/Guest/home"));
const FormSignUpDVKN = lazy(() => import("../pages/Guest/formSignUpDVKN"));

const RoutersCustomer = () => {
  return (
    <Suspense>
      <Routes>
        <Route
          path={APP_ROUTES.TUNA_XAC_MINH_EMAIL}
          element={<XacMinhEmail />}
        />
        {/* ==== Customer Routes ====*/}
        <Route
          element={
            <StoreProvider>
              <LayoutCustomer />
            </StoreProvider>
          }
        >
          <Route path={APP_ROUTES.TUNA_CUSTOMER.HOME.to} element={<Home />} />

          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.FORM_SIGN_UP_DVKN.to}
            element={<FormSignUpDVKN />}
          />

          {/* Customer Manager Pages */}
          <Route
            element={
              <RedirectCustomer pathRedirect={APP_ROUTES.TUNA_CUSTOMER.HOME.to}>
                <LayoutCustomerManager />
              </RedirectCustomer>
            }
          >
            <Route
              path={APP_ROUTES.TUNA_CUSTOMER.PROFILE.to}
              element={<ProfileCustomer />}
            />
            <Route
              path={APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}
              element={<PhieuDKyDVKN />}
            />
            <Route
              path={APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.to}
              element={<QuanLyHoaDon />}
            />
            <Route
              path={APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_PHAN_TICH_KET_QUA.to}
              element={<PhanTichKetQua />}
            />
          </Route>
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.EDIT_PHIEU_DKY_DVKN.to}
            element={
              <RedirectCustomer
                pathRedirect={APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}
              >
                <EditPhieuDKyDVKN />
              </RedirectCustomer>
            }
          />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.SHOW_PHIEU_DKY_DVKN.to}
            element={
              <RedirectCustomer
                pathRedirect={APP_ROUTES.TUNA_CUSTOMER.PHIEU_DKY_DVKN.to}
              >
                <ShowPhieuDKyDVKN />
              </RedirectCustomer>
            }
          />
          <Route
            path={
              APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_PHAN_TICH_KET_QUA.xem_chi_tiet
            }
            element={<ShowDetail />}
          />
          <Route
            path={APP_ROUTES.TUNA_CUSTOMER.QUAN_LY_HOA_DON.SHOW_HOA_DON.to}
            element={<XemChiTiet />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RoutersCustomer;
