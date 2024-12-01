const Customer = require('../models/Customer');
const User = require('../models/User');

// Obtener todos los clientes
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [User], // Incluye información del usuario asociado
    });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener clientes', error: err.message });
  }
};

// Crear un cliente
exports.createCustomer = async (req, res) => {
  const { user_id, address, city, state, postal_code, phone } = req.body;
  try {
    // Verificar que el usuario exista
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Crear cliente
    const customer = await Customer.create({ user_id, address, city, state, postal_code, phone });
    res.status(201).json({ message: 'Cliente creado exitosamente', customer });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear cliente', error: err.message });
  }
};

// Actualizar un cliente
exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { address, city, state, postal_code, phone } = req.body;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) return res.status(404).json({ message: 'Cliente no encontrado' });

    // Actualizar cliente
    await customer.update({ address, city, state, postal_code, phone });
    res.status(200).json({ message: 'Cliente actualizado exitosamente', customer });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar cliente', error: err.message });
  }
};

// Eliminar un cliente
exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) return res.status(404).json({ message: 'Cliente no encontrado' });

    await customer.destroy();
    res.status(200).json({ message: 'Cliente eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar cliente', error: err.message });
  }
};
