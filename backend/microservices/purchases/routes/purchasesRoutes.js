// backend/microservices/purchases/routes/purchasesRoutes.js
const express = require('express');
const { createPurchase } = require('../controllers/purchasesController');

const router = express.Router();

router.post('/', createPurchase);

module.exports = router;
