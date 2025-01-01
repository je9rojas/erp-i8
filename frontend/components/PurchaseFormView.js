import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importación de Bootstrap

export default function PurchaseFormView({
  formData,
  handleChange,
  handleDetailChange,
  addDetailRow,
  removeDetailRow,
  handleSubmit,
}) {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h2>Factura de Compra</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Encabezado */}
            <div className="d-flex justify-content-between mb-4">
              <div>
                <label htmlFor="invoiceNumber" className="form-label">Número de Factura</label>
                <input
                  type="text"
                  className="form-control"
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="issueDate" className="form-label">Fecha de Emisión</label>
                <input
                  type="date"
                  className="form-control"
                  id="issueDate"
                  value={formData.issueDate}
                  onChange={(e) => handleChange('issueDate', e.target.value)}
                />
              </div>
            </div>

            {/* Información del proveedor */}
            <div className="mb-4">
              <label htmlFor="supplierId" className="form-label">ID del Proveedor</label>
              <input
                type="text"
                className="form-control"
                id="supplierId"
                value={formData.supplierId}
                onChange={(e) => handleChange('supplierId', e.target.value)}
              />
              <label htmlFor="businessName" className="form-label mt-3">Nombre del Negocio</label>
              <input
                type="text"
                className="form-control"
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
              />
              <label htmlFor="address" className="form-label mt-3">Dirección</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
              <label htmlFor="currencyId" className="form-label mt-3">ID de Moneda</label>
              <input
                type="text"
                className="form-control"
                id="currencyId"
                value={formData.currencyId}
                onChange={(e) => handleChange('currencyId', e.target.value)}
              />
              <label htmlFor="paymentMethod" className="form-label mt-3">Método de Pago</label>
              <input
                type="text"
                className="form-control"
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={(e) => handleChange('paymentMethod', e.target.value)}
              />
            </div>

            {/* Detalles de la compra */}
            <div className="mb-4">
              <h4>Detalles de Compra</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.detail.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={item.quantity}
                          onChange={(e) => handleDetailChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={item.code}
                          onChange={(e) => handleDetailChange(index, 'code', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={item.description}
                          onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={item.unitPrice}
                          onChange={(e) => handleDetailChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        />
                      </td>
                      <td>{(item.quantity * item.unitPrice || 0).toFixed(2)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeDetailRow(index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" className="btn btn-primary" onClick={addDetailRow}>
                Agregar Detalle
              </button>
            </div>

            {/* Totales */}
            <div className="mb-4">
              <h4>Totales</h4>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="beforeTax" className="form-label">Subtotal (antes de IGV)</label>
                  <input type="number" className="form-control" id="beforeTax" value={formData.beforeTax} readOnly />
                </div>
                <div className="col-md-4">
                  <label htmlFor="IGV" className="form-label">IGV</label>
                  <input type="number" className="form-control" id="IGV" value={formData.IGV} readOnly />
                </div>
                <div className="col-md-4">
                  <label htmlFor="total" className="form-label">Total</label>
                  <input type="number" className="form-control" id="total" value={formData.total} readOnly />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-success">Guardar Compra</button>
          </form>
        </div>
      </div>
    </div>
  );
}
