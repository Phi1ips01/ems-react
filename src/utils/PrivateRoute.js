import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../Routes.constants";

const PrivateRoute = ({ children, role }) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userId = useSelector((state) => state.auth.userId);
  const location = useLocation();

  const isAuthorized = (role) => {
    if (role === "admin" && isAdmin) {
      console.log("Admin");
      return true; // Authorized for admin if admin is true
    } else if (role === "user" && !isAdmin) {
      return true; // Authorized for user if admin is false
    } else {
      return false; // Not authorized for other combinations
    }
  };
  if (!userId) {
    // Redirect to login or loading page if userId is not available
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!isAuthorized(role)) {
    return (
      <Navigate to={ROUTES.UNAUTHORIZED} replace state={{ from: location }} />
    );
  }

  return children;
};
export default PrivateRoute;
