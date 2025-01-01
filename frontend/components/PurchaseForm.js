// frontend/components/PurchaseForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importación de Bootstrap
import PurchaseFormView from './PurchaseFormView'; // Vista importada

export default function PurchaseForm() {
  const [formData, setFormData] = useState({
    supplierId: '',
    businessName: '',
    address: '',
    invoiceNumber: '',
    paymentMethod: '',
    currencyId: '',
    issueDate: '',
    detail: [],
    beforeTax: 0,
    IGV: 0,
    total: 0,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetail = [...formData.detail];
    updatedDetail[index][field] = value;
    setFormData({ ...formData, detail: updatedDetail });
    calculateTotals(updatedDetail);
  };

  const addDetailRow = () => {
    setFormData({
      ...formData,
      detail: [
        ...formData.detail,
        { quantity: 0, code: '', description: '', unitPrice: 0, subtotal: 0 },
      ],
    });
  };

  const removeDetailRow = (index) => {
    const updatedDetail = formData.detail.filter((_, i) => i !== index);
    setFormData({ ...formData, detail: updatedDetail });
    calculateTotals(updatedDetail);
  };

  const calculateTotals = (details) => {
    const beforeTax = details.reduce(
      (sum, item) => sum + (item.quantity * item.unitPrice || 0),
      0
    );
    const IGV = beforeTax * 0.18; // 18% de IGV
    const total = beforeTax + IGV;
    setFormData({ ...formData, beforeTax, IGV, total });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    try {
      const response = await fetch('http://localhost:3001/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Compra registrada con éxito');
      } else {
        console.error('Error al registrar la compra:', await response.text());
      }
    } catch (err) {
      console.error('Error en la conexión:', err);
    }
  };

  return (
    <PurchaseFormView
      formData={formData}
      handleChange={handleChange}
      handleDetailChange={handleDetailChange}
      addDetailRow={addDetailRow}
      removeDetailRow={removeDetailRow}
      handleSubmit={handleSubmit}
    />
  );
}
