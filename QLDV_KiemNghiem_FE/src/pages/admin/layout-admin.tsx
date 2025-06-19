import { Outlet } from "react-router";
import SidebarPersonnal from "../../components/SidebarPersonnal";
import HeaderPersonnal from "../../components/HeaderPersonnal";
import ThemeRegistry from "../../configs/ThemeRegistry";

export const MainLayout = () => {
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
