import { Route } from "react-router";

interface RouterPublicProps {
  path?: any;
  components?: any;
}

const RouterPublic = (props: RouterPublicProps) => {
  const { path, components } = props;
  const roleUser = 1;

  return roleUser && <Route path={path} element={components} />;
};

export default RouterPublic;
