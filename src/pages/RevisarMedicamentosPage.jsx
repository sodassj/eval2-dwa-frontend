// src/pages/RevisarMedicamentosPage.jsx
import React, { useState, useEffect } from "react";

const mockMedicamentos = [
  { id: 1, nombre: "Paracetamol", laboratorio: "Lab Farma", estado: "pendiente" },
  { id: 2, nombre: "Ibuprofeno", laboratorio: "SaludCorp", estado: "pendiente" },
  { id: 3, nombre: "Amoxicilina", laboratorio: "MediPlus", estado: "pendiente" },
];

const RevisarMedicamentosPage = () => {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    setMedicamentos(mockMedicamentos);
  }, []);

  const handleAprobar = (id) => {
    setMedicamentos((prev) =>
      prev.map((med) =>
        med.id === id ? { ...med, estado: "aprobado" } : med
      )
    );
  };

  const handleRechazar = (id) => {
    setMedicamentos((prev) =>
      prev.map((med) =>
        med.id === id ? { ...med, estado: "rechazado" } : med
      )
    );
  };

  return (
    <main style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ fontWeight: "700", fontSize: "2rem", marginBottom: "1rem" }}>
        Revisión de Medicamentos
      </h1>
      <p style={{ marginBottom: "2rem", color: "#555" }}>
        Aquí el moderador puede aprobar o rechazar medicamentos ingresados.
      </p>

      {medicamentos.length === 0 ? (
        <p>No hay medicamentos pendientes de revisión.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
          <thead style={{ backgroundColor: "#3f51b5", color: "white" }}>
            <tr>
              <th style={{ padding: "12px", textAlign: "left" }}>Nombre</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Laboratorio</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Estado</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map(({ id, nombre, laboratorio, estado }) => (
              <tr key={id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{nombre}</td>
                <td style={{ padding: "12px" }}>{laboratorio}</td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    color:
                      estado === "aprobado"
                        ? "green"
                        : estado === "rechazado"
                        ? "red"
                        : "#333",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {estado}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button
                    onClick={() => handleAprobar(id)}
                    disabled={estado !== "pendiente"}
                    style={{
                      marginRight: 8,
                      padding: "8px 16px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: estado === "pendiente" ? "pointer" : "not-allowed",
                      opacity: estado === "pendiente" ? 1 : 0.6,
                      transition: "background-color 0.3s ease",
                    }}
                    aria-label={`Aprobar medicamento ${nombre}`}
                    onMouseEnter={e => e.target.style.backgroundColor = "#388e3c"}
                    onMouseLeave={e => e.target.style.backgroundColor = "#4caf50"}
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleRechazar(id)}
                    disabled={estado !== "pendiente"}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: estado === "pendiente" ? "pointer" : "not-allowed",
                      opacity: estado === "pendiente" ? 1 : 0.6,
                      transition: "background-color 0.3s ease",
                    }}
                    aria-label={`Rechazar medicamento ${nombre}`}
                    onMouseEnter={e => e.target.style.backgroundColor = "#d32f2f"}
                    onMouseLeave={e => e.target.style.backgroundColor = "#f44336"}
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default RevisarMedicamentosPage;
