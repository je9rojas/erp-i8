// backend/microservices/purchases/server.js

// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Importing the purchases routes
const purchasesRoutes = require('./routes/purchasesRoutes');

// Initializing the Express app
const app = express();

// Configuring the port for the microservice
const PORT = 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route handler for purchases
app.use('/purchases', (req, res, next) => {
  console.log(`Incoming request on route /purchases with method: ${req.method}`);
  next(); // Pass the request to the purchases routes
}, purchasesRoutes);

// Connecting to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the application if the database connection fails
  });

// Starting the server
app.listen(PORT, () => {
  console.log(`Purchases microservice running at http://localhost:${PORT}`);
});
