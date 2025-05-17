import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Esta ruta permite el acceso a usuarios con rol 'moderador' o 'admin'
const ModeradorRoute = ({ children }) => {
  const { currentUser, isModerador, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!currentUser || (!isModerador() && !isAdmin())) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ModeradorRoute;
