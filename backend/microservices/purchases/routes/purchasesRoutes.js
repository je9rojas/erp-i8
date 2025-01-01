// backend/microservices/purchases/routes/purchasesRoutes.js
const express = require('express');
const { createPurchase } = require('../controllers/purchasesController');

// Creating an Express router
const router = express.Router();

// Middleware to log incoming requests for debugging
router.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  console.log('Request Method:', req.method);
  console.log('Request Body:', req.body);
  next(); // Pass the request to the next middleware or route handler
});

// Route to handle POST requests for creating a new purchase
router.post('/', (req, res, next) => {
  console.log('Processing request to create a new purchase...');
  next(); // Pass the request to the controller
}, createPurchase);

// Exporting the router to be used in the main server file
module.exports = router;
