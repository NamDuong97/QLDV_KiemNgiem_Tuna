import { useLocation } from "react-router";
import HeaderLoginForgot from "./HeaderLogin";
import HeaderDefault from "./HeaderDefault";

interface HeaderProps {
}

const HeaderAdmin = (props: HeaderProps) => {
  const { } = props;
  const path = useLocation();

  switch (path.pathname) {
    case "/tuna/login":
    case "/tuna/forgot-password":
      return <HeaderLoginForgot />;
    default:
      return (
        <HeaderDefault
        />
      );
  }
};

export default HeaderAdmin;
