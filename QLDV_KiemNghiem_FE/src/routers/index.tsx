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

const QuanLyNhanVien = lazy(() => import("../pages/admin/managerNhanVien"));

const XemChiTietTTNhanVien = lazy(
  () => import("../pages/admin/managerNhanVien/XemChiTietTTNhanVien")
);

const QuanLyPhieuLuuMau = lazy(
  () => import("../pages/admin/managerPhieuLuuMau")
);

const XemChiTietMauLuu = lazy(
  () => import("../pages/admin/managerPhieuLuuMau/XemChiTietMauLuu")
);

const ThemMauLuu = lazy(
  () => import("../pages/admin/managerPhieuLuuMau/ThemMauLuu")
);

const SuaMauLuu = lazy(
  () => import("../pages/admin/managerPhieuLuuMau/SuaMauLuu")
);

const QuanLyPhanCongNoiBo = lazy(
  () => import("../pages/admin/managerPhanCongNoiBo")
);

const XemChiTietPhanCongNoiBo = lazy(
  () => import("../pages/admin/managerPhanCongNoiBo/XemChiTietPhanCongNoiBo")
);

const TaoPhieuPhanCongNoiBo = lazy(
  () => import("../pages/admin/managerPhanCongNoiBo/PhanCong")
);

const SuaPhanCong = lazy(
  () => import("../pages/admin/managerPhanCongNoiBo/SuaPhanCong")
);

const DanhSachPhanCongNoiBo = lazy(
  () => import("../pages/admin/listPhanCongNoiBo")
);

const XemChiTietPhanCongNoiBoCuaNhanVien = lazy(
  () => import("../pages/admin/listPhanCongNoiBo/XemChiTietPhanCongNoiBo")
);

const QuanLyPhieuDuTru = lazy(() => import("../pages/admin/managerPhieuDuTru"));
const XemChiTietPhieuDuTru = lazy(
  () => import("../pages/admin/managerPhieuDuTru/XemChiTietPhieuDuTru")
);
const ThemPhieuDuTru = lazy(
  () => import("../pages/admin/managerPhieuDuTru/ThemPhieuDuTru")
);
const SuaPhieuDuTru = lazy(
  () => import("../pages/admin/managerPhieuDuTru/SuaPhieuDuTru")
);

const DanhSachPhieuDuTru = lazy(() => import("../pages/admin/listPhieuDuTru"));

const XemChiTietDuTru = lazy(
  () => import("../pages/admin/listPhieuDuTru/XemChiTietPhieuDuTru")
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
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_NHAN_VIEN.to}
            element={<QuanLyNhanVien />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_NHAN_VIEN.xem_chi_tiet}
            element={<XemChiTietTTNhanVien />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.to}
            element={<QuanLyPhieuLuuMau />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.xem_chi_tiet}
            element={<XemChiTietMauLuu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.create_mau_luu}
            element={<ThemMauLuu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.edit_mau_luu}
            element={<SuaMauLuu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.to}
            element={<QuanLyPhanCongNoiBo />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO.xem_chi_tiet}
            element={<XemChiTietPhanCongNoiBo />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO
                .create_phan_cong_noi_bo
            }
            element={<TaoPhieuPhanCongNoiBo />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_CONG_NOI_BO
                .edit_phan_cong_noi_bo
            }
            element={<SuaPhanCong />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_NOI_BO.to}
            element={<DanhSachPhanCongNoiBo />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LIST_PHAN_CONG_NOI_BO.xem_chi_tiet}
            element={<XemChiTietPhanCongNoiBoCuaNhanVien />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.to}
            element={<QuanLyPhieuDuTru />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.xem_chi_tiet}
            element={<XemChiTietPhieuDuTru />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.create_phieu_du_tru
            }
            element={<ThemPhieuDuTru />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_DU_TRU.edit_phieu_du_tru}
            element={<SuaPhieuDuTru />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_DU_TRU.to}
            element={<DanhSachPhieuDuTru />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_DU_TRU.xem_chi_tiet}
            element={<XemChiTietDuTru />}
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
