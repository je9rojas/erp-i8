// backend/microservices/purchases/controllers/purchasesController.js
const Purchase = require('../models/purchasesModel');

exports.createPurchase = async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    await newPurchase.save();
    console.log('New purchase registered:', newPurchase);
    res.status(201).json(newPurchase);
  } catch (err) {
    console.error('Error registering purchase:', err);
    res.status(500).json({ error: 'Failed to register purchase' });
  }
};
