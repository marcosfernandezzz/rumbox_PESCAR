import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

const AdminRoute = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  if (!usuario || usuario.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AdminRoute;
