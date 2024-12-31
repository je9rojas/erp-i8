// backend/microservices/purchases/models/purchasesModel.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  supplier_id: mongoose.Types.ObjectId,
  purchase_date: { type: Date, default: Date.now },
  products: [
    {
      product_id: mongoose.Types.ObjectId,
      quantity: Number,
      unit_price: Number,
    },
  ],
  total_amount: Number,
  status: { type: String, enum: ['completed', 'pending'] },
  payment_method: String,
});

module.exports = mongoose.model('Purchase', purchaseSchema);
