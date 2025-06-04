// Component/protectRoutes/PublicRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  return !user ? children : <Navigate to="/dashbord/home" />;
};

export default PublicRoute;
