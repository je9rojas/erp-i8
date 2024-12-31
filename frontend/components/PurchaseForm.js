// frontend/components/PurchaseForm.js
import React, { useState } from 'react';
import PurchaseFormView from './PurchaseFormView'; // Importamos la vista

// Componente lógico para manejar el estado y eventos del formulario
export default function PurchaseForm() {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    supplierId: '',
    invoiceNumber: '',
    paymentMethod: '',
    currencyId: '',
    issueDate: '',
    detail: [
      {
        quantity: 0,
        code: '',
        description: '',
        unitPrice: 0,
      },
    ],
    beforeTax: 0,
    IGV: 0,
  });

  // Manejar cambios en los campos individuales
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Manejar cambios en el array de detalles
  const handleDetailChange = (index, field, value) => {
    const updatedDetail = [...formData.detail];
    updatedDetail[index][field] = value;
    setFormData({ ...formData, detail: updatedDetail });
  };

  // Agregar una nueva fila al detalle de productos
  const addDetailRow = () => {
    setFormData({
      ...formData,
      detail: [...formData.detail, { quantity: 0, code: '', description: '', unitPrice: 0 }],
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      const response = await fetch('http://localhost:3001/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Compra registrada con éxito');
        console.log('Purchase registered successfully');
      } else {
        console.error('Error al registrar la compra:', await response.text());
        alert('Error al registrar la compra');
      }
    } catch (err) {
      console.error('Error en la conexión:', err);
      alert('Error en la conexión al servidor');
    }
  };

  // Renderizar la vista del formulario con las funciones y el estado
  return (
    <PurchaseFormView
      formData={formData}
      handleChange={handleChange}
      handleDetailChange={handleDetailChange}
      addDetailRow={addDetailRow}
      handleSubmit={handleSubmit}
    />
  );
}
