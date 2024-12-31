// backend/microservices/purchases/server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const purchasesRoutes = require('./routes/purchasesRoutes');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/purchases', purchasesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Purchases microservice running at http://localhost:${PORT}`);
});
