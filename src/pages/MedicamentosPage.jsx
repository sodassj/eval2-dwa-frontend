"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicamentoForm from "../components/MedicamentoForm";
import styles from "./TablePages.module.css";

const MedicamentosPage = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentMedicamento, setCurrentMedicamento] = useState(null);
  const { isAdmin } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL; // Accede a la variable de entorno

  const fetchMedicamentos = async () => {
    try {
      const response = await fetch(`${API_URL}/medicamentos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar medicamentos");
      }

      const data = await response.json();
      setMedicamentos(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const handleEdit = (medicamento) => {
    setCurrentMedicamento(medicamento);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este medicamento?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/medicamentos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar medicamento");
      }

      // Actualizar la lista
      setMedicamentos(medicamentos.filter((med) => med.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      let url = `${API_URL}/medicamentos`;
      let method = "POST";

      if (currentMedicamento) {
        url = `${url}/${currentMedicamento.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Error al ${currentMedicamento ? "actualizar" : "crear"} medicamento`,
        );
      }

      // Actualizar la lista
      fetchMedicamentos();
      setShowForm(false);
      setCurrentMedicamento(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando medicamentos...</div>;
  }

  return (
    <div className={styles.tablePageContainer}>
      <div className={styles.tableHeader}>
        <h1>Gestión de Medicamentos</h1>
        {isAdmin() && (
          <button
            className={styles.addButton}
            onClick={() => {
              setCurrentMedicamento(null);
              setShowForm(true);
            }}
          >
            Agregar Medicamento
          </button>
        )}
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {showForm && (
        <MedicamentoForm
          medicamento={currentMedicamento}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setCurrentMedicamento(null);
          }}
        />
      )}

      {medicamentos.length === 0
        ? <p className={styles.noData}>No hay medicamentos registrados.</p>
        : (
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th>Precio Venta</th>
                  <th>Stock</th>
                  {isAdmin() && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {medicamentos.map((med) => (
                  <tr key={med.id}>
                    <td>{med.id}</td>
                    <td>{med.descripcionMed}</td>
                    <td>{Number(med.precioVentaUni).toFixed(2)}</td>

                    <td>{med.stock}</td>
                    {isAdmin() && (
                      <td className={styles.actionButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEdit(med)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(med.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default MedicamentosPage;
