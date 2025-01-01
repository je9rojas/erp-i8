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
      businessName, // New field: Business Name
      address, // New field: Address
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
      !businessName || // Validate new field
      !address || // Validate new field
      !detail ||
      !beforeTax ||
      !IGV
    ) {
      console.error('Validation failed: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Logging received data for debugging
    console.log('Received data for new purchase:', {
      supplierId,
      invoiceNumber,
      paymentMethod,
      currencyId,
      issueDate,
      businessName,
      address,
      detail,
      beforeTax,
      IGV,
    });

    // Creating a new purchase document
    const newPurchase = new Purchase({
      supplierId,
      invoiceNumber,
      paymentMethod,
      currencyId,
      issueDate,
      businessName, // Include new field
      address, // Include new field
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
