"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const { currentUser, isAdmin, isModerador } = useContext(AuthContext)

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

        {(isModerador() || isAdmin()) && (
          <div className={styles.menuCard}>
            <h3>Revisión MD</h3>
            <p>Aprueba o rechaza medicamentos ingresados</p>
            <Link to="/revisar-medicamentos" className={styles.menuButton}>
              Revisar Medicamentos
            </Link>
          </div>
        )}

        {isModerador() && (
              <div className={styles.menuCard}>
                <h3>Historial</h3>
                <p>Consulta el historial de medicamentos revisados</p>
                <Link to="/historial-revisiones" className={styles.menuButton}>
                  Ver Historial
                </Link>
              </div>
            )}

        {isAdmin() && (
          <>
          <div className={styles.menuCard}>
            <h3>Usuarios</h3>
            <p>Administra los usuarios del sistema de Farmacia</p>
            <Link to="/usuarios" className={styles.menuButton}>
              Gestionar Usuarios
            </Link>
          </div>

          {/* Tarjeta adicional para rellenar el diseño */}
            <div className={styles.menuCard}>
              <h3>Reportes</h3>
              <p>Consulta reportes generales del sistema</p>
              <Link to="/reportes" className={styles.menuButton}>
                Ver Reportes
              </Link>
            </div>
            {/* Nuevos menucards para admin */}
            <div className={styles.menuCard}>
              <h3>Configuración</h3>
              <p>Gestiona la configuración del sistema de Farmacia</p>
              <Link to="/configuracion" className={styles.menuButton}>
                Ir a Configuración
              </Link>
            </div>
            <div className={styles.menuCard}>
              <h3>Auditorías</h3>
              <p>Revisa el historial de acciones del sistema</p>
              <Link to="/auditorias" className={styles.menuButton}>
                Ver Auditorías
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
