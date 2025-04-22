import { useLocation } from "react-router";
import HeaderLoginForgot from "./HeaderLogin";
import HeaderDefault from "./HeaderDefault";

interface HeaderProps {
  isMenuDashBoard: boolean;
  handleMenuDashBoard: () => void;
  handleToggleDrawer: () => void;
}

const HeaderAdmin = (props: HeaderProps) => {
  const { isMenuDashBoard, handleMenuDashBoard, handleToggleDrawer } = props;
  const path = useLocation();

  switch (path.pathname) {
    case "/tuna/login":
    case "/tuna/forgot-password":
      return <HeaderLoginForgot />;
    default:
      return (
        <HeaderDefault
          handleMenuDashBoard={handleMenuDashBoard}
          handleToggleDrawer={handleToggleDrawer}
          isMenuDashBoard={isMenuDashBoard}
        />
      );
  }
};

export default HeaderAdmin;
