import { Route } from "react-router";

interface RouterPrivateProps {
  path?: any;
  components?: any;
}

const RouterPrivate = (props: RouterPrivateProps) => {
  const { path, components } = props;
  const roleUser = 1;

  return roleUser && <Route path={path} element={components} />;
};

export default RouterPrivate;
