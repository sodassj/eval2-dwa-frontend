import { useEffect, useState } from "react";
import styles from "./Forms.module.css";

const MedicamentoForm = ({ medicamento, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    descripcionMed: "",
    precioVentaUni: "",
    stock: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (medicamento) {
      setFormData({
        descripcionMed: medicamento.descripcionMed,
        precioVentaUni: medicamento.precioVentaUni.toString(),
        stock: medicamento.stock.toString(),
      });
    }
  }, [medicamento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error al editar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.descripcionMed.trim()) {
      newErrors.descripcionMed = "La descripción es requerida";
    }

    if (!formData.precioVentaUni) {
      newErrors.precioVentaUni = "El precio es requerido";
    } else if (
      isNaN(formData.precioVentaUni) ||
      Number.parseFloat(formData.precioVentaUni) <= 0
    ) {
      newErrors.precioVentaUni = "El precio debe ser un número positivo";
    }

    if (!formData.stock) {
      newErrors.stock = "El stock es requerido";
    } else if (isNaN(formData.stock) || Number.parseInt(formData.stock) < 0) {
      newErrors.stock = "El stock debe ser un número no negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convertir a números los campos numéricos
    const dataToSubmit = {
      ...formData,
      precioVentaUni: Number.parseFloat(formData.precioVentaUni),
      stock: Number.parseInt(formData.stock),
    };

    onSubmit(dataToSubmit);
  };

  return (
    <div className={styles.formContainer}>
      <h2>{medicamento ? "Editar Medicamento" : "Nuevo Medicamento"}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="descripcionMed">Descripción</label>
          <input
            type="text"
            id="descripcionMed"
            name="descripcionMed"
            value={formData.descripcionMed}
            onChange={handleChange}
            className={errors.descripcionMed ? styles.inputError : ""}
          />
          {errors.descripcionMed && (
            <span className={styles.errorText}>{errors.descripcionMed}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="precioVentaUni">Precio de Venta</label>
          <input
            type="number"
            step="0.01"
            id="precioVentaUni"
            name="precioVentaUni"
            value={formData.precioVentaUni}
            onChange={handleChange}
            className={errors.precioVentaUni ? styles.inputError : ""}
          />
          {errors.precioVentaUni && (
            <span className={styles.errorText}>{errors.precioVentaUni}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className={errors.stock ? styles.inputError : ""}
          />
          {errors.stock && (
            <span className={styles.errorText}>{errors.stock}</span>
          )}
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton}>
            {medicamento ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicamentoForm;
