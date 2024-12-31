// backend/microservices/purchases/routes/purchasesRoutes.js
const express = require('express');
const { createPurchase } = require('../controllers/purchasesController');

// Creating an Express router
const router = express.Router();

// Route to handle POST requests for creating a new purchase
router.post('/', (req, res, next) => {
  console.log('Incoming request to create a new purchase with data:', req.body);
  next(); // Pass the request to the next middleware (controller)
}, createPurchase);

// Exporting the router to be used in the main server file
module.exports = router;
