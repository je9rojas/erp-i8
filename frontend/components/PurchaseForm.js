// frontend/components/PurchaseForm.js
import { useState } from 'react';

export default function PurchaseForm() {
  const [formData, setFormData] = useState({
    supplier_id: '',
    purchase_date: '',
    products: [{ product_id: '', quantity: 0, unit_price: 0 }],
    total_amount: 0,
    status: '',
    payment_method: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Compra registrada con éxito');
      } else {
        console.error('Error al registrar la compra');
      }
    } catch (err) {
      console.error('Error en la conexión:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID del proveedor:
        <input
          type="text"
          value={formData.supplier_id}
          onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
        />
      </label>
      {/* Add fields for products, total_amount, status, etc. */}
      <button type="submit">Registrar</button>
    </form>
  );
}
