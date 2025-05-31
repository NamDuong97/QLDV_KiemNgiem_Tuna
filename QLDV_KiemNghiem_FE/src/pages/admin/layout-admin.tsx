import { Box } from "@mui/material";
import { useState } from "react";
import ThemeRegistry from "../../configs/ThemeRegistry";
import { Outlet, useLocation } from "react-router";
import SideBar from "../../components/Sidebar";
import HeaderAdmin from "../../components/HeaderAdmin";
import PopupThongBaoPhieuDKDVKN from "./PopupThongBaoPhieuDKDVKN";

export default function LayoutAdmin() {
  const [isMenuDashBoard, setIsMenuDashBoard] = useState(false);
  const [isToggleDrawer, setIsToggleDrawer] = useState(false);
  const drawerWidth = isMenuDashBoard ? 270 : 60;
  const path = useLocation();
  const [openPopupThongBaoPhieuDKDVKN, setOpenPopupThongBaoPhieuDKDVKN] =
    useState(false);

  const isLoginForgot = ["/tuna/login", "/tuna/forgot-password"].includes(
    path.pathname
  );
  const handleMenuDashBoard = () => setIsMenuDashBoard(!isMenuDashBoard);
  const toggleDrawer = (newOpen: boolean) => () => {
    setIsToggleDrawer(newOpen);
  };

  const handleClosePopupThongBaoPhieuDKDVKN = () => {
    setOpenPopupThongBaoPhieuDKDVKN(false);
  };

  // useEffect(() => {
  //   setOpenPopupThongBaoPhieuDKDVKN(true);
  // }, []);

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
          <Box className="w-full">
            <Outlet />
          </Box>
        </Box>
      </Box>
      <PopupThongBaoPhieuDKDVKN
        open={openPopupThongBaoPhieuDKDVKN}
        handleClose={handleClosePopupThongBaoPhieuDKDVKN}
      />
    </ThemeRegistry>
  );
}
