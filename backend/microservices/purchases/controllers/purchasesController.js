// backend/microservices/purchases/controllers/purchasesController.js
const Purchase = require('../models/purchasesModel'); // Importa el modelo Purchase

// Controlador para crear una nueva compra
exports.createPurchase = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const {
      supplierId, // ID del proveedor (opcional)
      invoiceNumber, // Número de la factura (requerido)
      paymentMethod, // Método de pago (requerido)
      currencyId, // ID de la moneda (opcional)
      issueDate, // Fecha de emisión (requerido)
      businessName, // Nombre del negocio (requerido)
      address, // Dirección del negocio (requerido)
      detail, // Detalle de los productos comprados (requerido)
      beforeTax, // Monto total antes de impuestos (requerido)
      IGV, // Impuesto IGV (requerido)
    } = req.body;

    // Validar campos requeridos, excluyendo supplierId y currencyId
    if (
      !invoiceNumber || 
      !paymentMethod || 
      !issueDate || 
      !businessName || 
      !address || 
      !detail || 
      !beforeTax || 
      !IGV
    ) {
      console.error('Validación fallida: Faltan campos requeridos');
      return res.status(400).json({ error: 'Faltan campos requeridos' }); // Responder con error 400 si faltan campos
    }

    // Log de los datos recibidos para depuración
    console.log('Datos recibidos para la nueva compra:', {
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

    // Crear un nuevo documento de compra
    const newPurchase = new Purchase({
      supplierId: supplierId || null, // Si no se proporciona, se guarda como null
      invoiceNumber, 
      paymentMethod, 
      currencyId: currencyId || null, // Si no se proporciona, se guarda como null
      issueDate, 
      businessName, 
      address, 
      detail, 
      beforeTax, 
      IGV,
    });

    // Guardar el documento de compra en la base de datos
    await newPurchase.save();

    // Log para confirmar que la compra se registró correctamente
    console.log('Nueva compra registrada exitosamente:', newPurchase);

    // Enviar la respuesta con el nuevo documento de compra
    res.status(201).json(newPurchase); // Código 201 para creación exitosa

  } catch (err) {
    // Log de errores para depuración
    console.error('Error al registrar la compra:', err);

    // Enviar una respuesta de error si falla la creación
    res.status(500).json({ error: 'Error al registrar la compra' });
  }
};
