import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL; // Accede a la variable de entorno

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Independientemente de la respuesta, hacemos logout local
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Aún así, hacemos logout local
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
        {isAdmin() && (
          <li>
            <Link to="/usuarios">Usuarios</Link>
          </li>
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
