"use client";

import { useEffect, useState } from "react";
import UsuarioForm from "../components/UsuarioForm";
import styles from "./TablePages.module.css";

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL; // Accede a la variable de entorno

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar usuarios");
      }

      const data = await response.json();
      setUsuarios(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = (usuario) => {
    setCurrentUsuario(usuario);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      // Actualizar la lista
      setUsuarios(usuarios.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/usuarios/${currentUsuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      }

      // Actualizar la lista
      fetchUsuarios();
      setShowForm(false);
      setCurrentUsuario(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando usuarios...</div>;
  }

  return (
    <div className={styles.tablePageContainer}>
      <h1>Gestión de Usuarios</h1>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {showForm && (
        <UsuarioForm
          usuario={currentUsuario}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setCurrentUsuario(null);
          }}
        />
      )}

      {usuarios.length === 0
        ? <p className={styles.noData}>No hay usuarios registrados.</p>
        : (
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre}</td>
                    <td>{user.email}</td>
                    <td>{user.rol}</td>
                    <td className={styles.actionButtons}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEdit(user)}
                      >
                        Editar
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(user.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default UsuariosPage;
