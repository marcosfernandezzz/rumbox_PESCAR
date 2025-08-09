import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";

const ClienteRoute = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  // Permitir acceso solo si no está logueado o si es cliente
  if (usuario && usuario.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default ClienteRoute;
