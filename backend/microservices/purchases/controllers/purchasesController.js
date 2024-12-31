// backend/microservices/purchases/controllers/purchasesController.js
const Purchase = require('../models/purchasesModel');

// Controller for creating a new purchase
exports.createPurchase = async (req, res) => {
  try {
    // Extracting data from the request body
    const {
      supplierId,
      invoiceNumber,
      paymentMethod,
      currencyId,
      issueDate,
      detail,
      beforeTax,
      IGV,
    } = req.body;

    // Validating required fields
    if (
      !supplierId ||
      !invoiceNumber ||
      !paymentMethod ||
      !currencyId ||
      !issueDate ||
      !detail ||
      !beforeTax ||
      !IGV
    ) {
      console.error('Validation failed: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Creating a new purchase document
    const newPurchase = new Purchase({
      supplierId,
      invoiceNumber,
      paymentMethod,
      currencyId,
      issueDate,
      detail,
      beforeTax,
      IGV,
    });

    // Saving the purchase document to the database
    await newPurchase.save();

    console.log('New purchase successfully registered:', newPurchase);

    // Sending the created purchase as a response
    res.status(201).json(newPurchase);
  } catch (err) {
    // Logging errors for debugging
    console.error('Error registering purchase:', err);

    // Sending an error response to the client
    res.status(500).json({ error: 'Failed to register purchase' });
  }
};
