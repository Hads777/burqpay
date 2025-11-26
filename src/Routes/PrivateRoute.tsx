// components/PrivateRoute.js
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { store } from "../redux/store";
import { setNavigator } from "../utils/const.utils";

const PrivateRoute = () => {
  const token = store.getState().block.token;
  const navigate = useNavigate();
  setNavigator(navigate);

  if (!token || token.trim() === "") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
