"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const { currentUser, isAdmin } = useContext(AuthContext)

  return (
    <div className={styles.dashboardContainer}>
      <h1>Bienvenido al Sistema de Gestión de Farmacia</h1>
      <p className={styles.welcomeMessage}>
        Hola, <span className={styles.userName}>{currentUser?.email}</span>
      </p>

      <div className={styles.menuGrid}>
        <div className={styles.menuCard}>
          <h3>Medicamentos</h3>
          <p>Gestiona el inventario de medicamentos</p>
          <Link to="/medicamentos" className={styles.menuButton}>
            Ver Medicamentos
          </Link>
        </div>

        {isAdmin() && (
          <div className={styles.menuCard}>
            <h3>Usuarios</h3>
            <p>Administra los usuarios del sistema</p>
            <Link to="/usuarios" className={styles.menuButton}>
              Gestionar Usuarios
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
