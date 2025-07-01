import { Outlet, useLocation } from "react-router";
import SidebarPersonnal from "../../components/SidebarPersonnal";
import HeaderPersonnal from "../../components/HeaderPersonnal";
import ThemeRegistry from "../../configs/ThemeRegistry";
import ToastNotification from "../../configs/stores/Notification";
import { useEffect } from "react";
import { APP_ROUTES } from "../../constants/routers";

export const MainLayout = () => {
  const pathname = useLocation().pathname;
  ToastNotification();
  useEffect(() => {
    if (
      pathname !==
      APP_ROUTES.TUNA_ADMIN.DANH_SACH_PHAN_CONG_KHOA_CM.xem_chi_tiet
    )
      sessionStorage.removeItem("chi-tiet-phan-cong");
    if (pathname !== APP_ROUTES.TUNA_ADMIN.QUAN_LY_PHIEU_LUU_MAU.edit_mau_luu)
      sessionStorage.removeItem("chi-tiet-mau-luu-sua");
  }, [pathname]);
  return (
    <ThemeRegistry>
      <div className="flex h-screen bg-gray-50">
        <SidebarPersonnal />
        <div className="flex flex-col flex-1 overflow-hidden">
          <HeaderPersonnal />
          <main className="overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeRegistry>
  );
};
