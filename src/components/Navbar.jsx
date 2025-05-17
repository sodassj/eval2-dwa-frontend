import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { currentUser, logout, isAdmin, isModerador } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      logout();
      navigate("/login");
    }
  };

  if (!currentUser) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.logo}>Sistema de Farmacia</div>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/register">Registrarse</Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Sistema de Farmacia</div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/medicamentos">Medicamentos</Link>
        </li>

        {isModerador() && (
          <>
            <li>
              <Link to="/revisar-medicamentos">Revisar Medicamentos</Link>
            </li>
            <li>
              <Link to="/historial-revisiones">Historial Revisiones</Link>
            </li>
          </>
        )}

        {isAdmin() && (
          <>
            <li>
              <Link to="/usuarios">Usuarios</Link>
            </li>
            <li>
              <Link to="/reportes">Reportes</Link>
            </li>
            <li>
              <Link to="/configuracion">Configuración</Link>
            </li>
            <li>
              <Link to="/auditorias">Auditorías</Link>
            </li>
          </>
        )}

        <li>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
