// frontend/components/PurchaseFormView.js

import React from 'react';

// Componente de vista para mostrar el formulario
export default function PurchaseFormView({
  formData,
  handleChange,
  handleDetailChange,
  addDetailRow,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Supplier ID:
        <input
          type="text"
          value={formData.supplierId}
          onChange={(e) => handleChange('supplierId', e.target.value)}
        />
      </label>
      <label>
        Invoice Number:
        <input
          type="text"
          value={formData.invoiceNumber}
          onChange={(e) => handleChange('invoiceNumber', e.target.value)}
        />
      </label>
      <label>
        Payment Method:
        <input
          type="text"
          value={formData.paymentMethod}
          onChange={(e) => handleChange('paymentMethod', e.target.value)}
        />
      </label>
      <label>
        Currency ID:
        <input
          type="text"
          value={formData.currencyId}
          onChange={(e) => handleChange('currencyId', e.target.value)}
        />
      </label>
      <label>
        Issue Date:
        <input
          type="date"
          value={formData.issueDate}
          onChange={(e) => handleChange('issueDate', e.target.value)}
        />
      </label>
      <label>Product Details:</label>
      {formData.detail.map((item, index) => (
        <div key={index}>
          <label>
            Quantity:
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)}
            />
          </label>
          <label>
            Code:
            <input
              type="text"
              value={item.code}
              onChange={(e) => handleDetailChange(index, 'code', e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
            />
          </label>
          <label>
            Unit Price:
            <input
              type="number"
              value={item.unitPrice}
              onChange={(e) => handleDetailChange(index, 'unitPrice', e.target.value)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={addDetailRow}>
        Add Product
      </button>
      <label>
        Before Tax:
        <input
          type="number"
          value={formData.beforeTax}
          onChange={(e) => handleChange('beforeTax', e.target.value)}
        />
      </label>
      <label>
        IGV:
        <input
          type="number"
          value={formData.IGV}
          onChange={(e) => handleChange('IGV', e.target.value)}
        />
      </label>
      <button type="submit">Register Purchase</button>
    </form>
  );
}
