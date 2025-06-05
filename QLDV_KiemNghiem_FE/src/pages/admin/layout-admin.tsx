import { Box } from "@mui/material";
import { useState } from "react";
import ThemeRegistry from "../../configs/ThemeRegistry";
import { Outlet, useLocation } from "react-router";
import SideBar from "../../components/Sidebar";
import HeaderAdmin from "../../components/HeaderAdmin";

export default function LayoutAdmin() {
  const [isMenuDashBoard, setIsMenuDashBoard] = useState(false);
  const [isToggleDrawer, setIsToggleDrawer] = useState(false);
  const drawerWidth = isMenuDashBoard ? 270 : 60;
  const path = useLocation();

  const isLoginForgot = ["/tuna/login", "/tuna/forgot-password"].includes(
    path.pathname
  );
  const handleMenuDashBoard = () => setIsMenuDashBoard(!isMenuDashBoard);
  const toggleDrawer = (newOpen: boolean) => () => {
    setIsToggleDrawer(newOpen);
  };

  return (
    <ThemeRegistry>
      <Box>
        <HeaderAdmin
          handleMenuDashBoard={handleMenuDashBoard}
          handleToggleDrawer={() => setIsToggleDrawer(true)}
          isMenuDashBoard={isMenuDashBoard}
        />
        <Box className="flex">
          <Box>
            {!isLoginForgot && (
              <SideBar
                drawerWidth={drawerWidth}
                isMenuDashBoard={isMenuDashBoard}
                isToggleDrawer={isToggleDrawer}
                toggleDrawer={toggleDrawer(false)}
              />
            )}
          </Box>
          <Box className="w-full mt-10">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeRegistry>
  );
}
