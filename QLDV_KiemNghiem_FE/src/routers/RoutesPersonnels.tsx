import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { APP_ROUTES } from "../constants/routers";
import { MainLayout } from "../pages/admin/layout-admin";
import XacMinhEmail from "../pages/xacminhEmail";
import RedirectPersonnel from "./redirectPersonnel";

const Dashboard = lazy(() => import("../pages/admin/dashboard"));
const LoginPage = lazy(() => import("../pages/admin/login"));
const ForGotPasswordPage = lazy(() => import("../pages/admin/forgot-password"));

const QuanLyPhieuDKyDVHN = lazy(
  () => import("../pages/admin/manager-phieudkydvkn")
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

const QuanLyPhieuXuatKho = lazy(
  () => import("../pages/admin/managerPhieuXuatKho")
);

const ThemPhieuXuatKho = lazy(
  () => import("../pages/admin/managerPhieuXuatKho/ThemPhieuXuatKho")
);

const SuaPhieuXuatKho = lazy(
  () => import("../pages/admin/managerPhieuXuatKho/SuaPhieuXuatKho")
);

const XemChiTietPhieuXuatKho = lazy(
  () => import("../pages/admin/managerPhieuXuatKho/XemChiTietPhieuXuatKho")
);

const DanhSachHoaDon = lazy(() => import("../pages/admin/listHoaDon"));

const XemChiTietHoaDonTuDanhSach = lazy(
  () => import("../pages/admin/listHoaDon/XemChiTietHoaDon")
);

const DanhSachPhieuMuaVatTu = lazy(
  () => import("../pages/admin/listPhieuMuaVatTu")
);

const XemChiTietPhieuMuaVatTuTuDanhSach = lazy(
  () => import("../pages/admin/listPhieuMuaVatTu/XemChiTietPhieuMuaVatTu")
);

const QuanLyHoaDonTrangAdmin = lazy(
  () => import("../pages/admin/managerHoaDon")
);

const SuaHoaDon = lazy(() => import("../pages/admin/managerHoaDon/SuaHoaDon"));

const XemChiTietHoaDon = lazy(
  () => import("../pages/admin/managerHoaDon/XemChiTietHoaDon")
);

const QuanLyPhieuMuaVatTu = lazy(
  () => import("../pages/admin/managerPhieuMuaVatTu")
);

const ThemPhieuMuaVatTu = lazy(
  () => import("../pages/admin/managerPhieuMuaVatTu/ThemPhieuMuaVatTu")
);

const SuaPhieuMuaVatTu = lazy(
  () => import("../pages/admin/managerPhieuMuaVatTu/SuaPhieuMuaVatTu")
);

const XemChiTietPhieuMuaVatTu = lazy(
  () => import("../pages/admin/managerPhieuMuaVatTu/XemChiTietPhieuMuaVatTu")
);

const QuanLyPhieuPhanTichKetQua = lazy(
  () => import("../pages/admin/managerPhieuPhanTichKetQua")
);

const ThemPhieuPhanTichKetQua = lazy(
  () =>
    import("../pages/admin/managerPhieuPhanTichKetQua/ThemPhieuPhanTichKetQua")
);

const SuaPhieuPhanTichKetQua = lazy(
  () =>
    import("../pages/admin/managerPhieuPhanTichKetQua/SuaPhieuPhanTichKetQua")
);

const XemChiTietPhieuPhanTichKetQua = lazy(
  () =>
    import(
      "../pages/admin/managerPhieuPhanTichKetQua/XemChiTietPhieuPhanTichKetQua"
    )
);

const QuanLyPhieuTienDo = lazy(() => import("../pages/admin/managerTienDo"));

const ThemPhieuTienDo = lazy(
  () => import("../pages/admin/managerTienDo/ThemPhieuTienDo")
);

const SuaPhieuTienDo = lazy(
  () => import("../pages/admin/managerTienDo/SuaPhieuTienDo")
);

const XemChiTietPhieuTienDo = lazy(
  () => import("../pages/admin/managerTienDo/XemChiTietPhieuTienDo")
);

const QuanLyPhieuThu = lazy(() => import("../pages/admin/managePhieuThu"));

const ThemPhieuThu = lazy(
  () => import("../pages/admin/managePhieuThu/ThemPhieuThu")
);

const SuaPhieuThu = lazy(
  () => import("../pages/admin/managePhieuThu/SuaPhieuThu")
);

const XemChiTietPhieuThu = lazy(
  () => import("../pages/admin/managePhieuThu/XemChiTietPhieuThu")
);

const DanhSachPhieuChoPhanCongKhoaCM = lazy(
  () => import("../pages/admin/listChoPhanCongKhoaCM")
);

const DanhSachPhanCongKhoaCM = lazy(
  () => import("../pages/admin/listPhanCongKhoaCM")
);

const ChiTietPhanCongPhongCM = lazy(
  () => import("../pages/admin/listPhanCongKhoaCM/ChiTietPhanCongPhongCM")
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
            <RedirectPersonnel>
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
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_XUAT_KHO.to}
            element={<QuanLyPhieuXuatKho />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_XUAT_KHO.create_phieu_xuat_kho
            }
            element={<ThemPhieuXuatKho />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_XUAT_KHO.edit_phieu_xuat_kho
            }
            element={<SuaPhieuXuatKho />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_XUAT_KHO.xem_chi_tiet}
            element={<XemChiTietPhieuXuatKho />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU.to}
            element={<QuanLyPhieuMuaVatTu />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU
                .create_phieu_mua_vat_tu
            }
            element={<ThemPhieuMuaVatTu />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU
                .edit_phieu_mua_vat_tu
            }
            element={<SuaPhieuMuaVatTu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_MUA_VAT_TU.xem_chi_tiet}
            element={<XemChiTietPhieuMuaVatTu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_MUA_VAT_TU.to}
            element={<DanhSachPhieuMuaVatTu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LIST_PHIEU_MUA_VAT_TU.xem_chi_tiet}
            element={<XemChiTietPhieuMuaVatTuTuDanhSach />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_HOA_DON.to}
            element={<QuanLyHoaDonTrangAdmin />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_HOA_DON.edit_hoa_don}
            element={<SuaHoaDon />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_HOA_DON.xem_chi_tiet}
            element={<XemChiTietHoaDon />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LIST_HOA_DON.to}
            element={<DanhSachHoaDon />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.LIST_HOA_DON.xem_chi_tiet}
            element={<XemChiTietHoaDonTuDanhSach />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_TIEN_DO.to}
            element={<QuanLyPhieuTienDo />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_TIEN_DO.create_tien_do}
            element={<ThemPhieuTienDo />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_TIEN_DO.edit_tien_do}
            element={<SuaPhieuTienDo />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_TIEN_DO.xem_chi_tiet}
            element={<XemChiTietPhieuTienDo />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.to}
            element={<QuanLyPhieuPhanTichKetQua />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA
                .create_phan_tich_ket_qua
            }
            element={<ThemPhieuPhanTichKetQua />}
          />
          <Route
            path={
              APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA
                .edit_phan_tich_ket_qua
            }
            element={<SuaPhieuPhanTichKetQua />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHAN_TICH_KET_QUA.xem_chi_tiet}
            element={<XemChiTietPhieuPhanTichKetQua />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.to}
            element={<QuanLyPhieuThu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.create_phieu_thu}
            element={<ThemPhieuThu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.edit_phieu_thu}
            element={<SuaPhieuThu />}
          />
          <Route
            path={APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_THU.xem_chi_tiet}
            element={<XemChiTietPhieuThu />}
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
            element={<ChiTietPhanCongPhongCM />}
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
