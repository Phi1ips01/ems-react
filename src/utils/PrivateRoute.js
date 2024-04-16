import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../Routes.constants";

const PrivateRoute = ({ children, role }) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const location = useLocation();

  const isAuthorized = (role) => {
    if (role === "admin" && isAdmin) {
      console.log("Admin");
      return true; // Authorized for admin if admin is true
    } else if (role === "user" && !isAdmin) {
      console.log("user");
      return true; // Authorized for user if admin is false
    } else {
      return false; // Not authorized for other combinations
    }
  };

  if (!isAuthorized(role)) {
    console.log("Unauthorized access", role);
    return (
      <Navigate to={ROUTES.UNAUTHORIZED} replace state={{ from: location }} />
    );
  }

  console.log("Authorized access");
  return children;
};

export default PrivateRoute;
