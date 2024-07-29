import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "../store";

const AuthLayout = () => {
  const token = useTokenStore((store) => store.token);
  if (token) {
    return <Navigate to={"/dashboard/home"} replace />;
  }
  return (
    <>
      <Outlet />s
    </>
  );
};

export default AuthLayout;
