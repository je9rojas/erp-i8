// backend/microservices/purchases/models/purchasesModel.js
const mongoose = require('mongoose');

// Schema for the details of purchase items
const purchaseDetailSchema = new mongoose.Schema({
  quantity: { type: Number, required: true }, // Quantity of the product
  code: { type: String, required: true },    // Product code
  description: { type: String, required: true }, // Product description
  unitPrice: { type: Number, required: true }, // Unit price of the product
});

// Main schema for purchases
const purchaseSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Types.ObjectId, required: true, ref: 'Supplier' }, // Supplier ID
  invoiceNumber: { type: String, required: true }, // Invoice number
  paymentMethod: { type: String, required: true }, // Payment method
  currencyId: { type: mongoose.Types.ObjectId, required: true, ref: 'Currency' }, // Currency ID
  issueDate: { type: Date, required: true }, // Date of issuance
  detail: { type: [purchaseDetailSchema], required: true }, // Details of the purchase items
  beforeTax: { type: Number, required: true }, // Total amount before tax
  IGV: { type: Number, required: true }, // Tax (IGV)
  creationDate: { type: Date, default: Date.now }, // Date of record creation
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

console.log('Purchase model updated and loaded successfully');

module.exports = Purchase;
