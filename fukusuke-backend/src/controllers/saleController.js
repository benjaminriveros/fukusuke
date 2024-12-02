const Sale = require('../models/Sale');
const Order = require('../models/Order');

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [Order],
    });
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener ventas', error: err.message });
  }
};

exports.createSale = async (req, res) => {
  const { order_id, receipt } = req.body;

  try {
    const order = await Order.findByPk(order_id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    if (order.status !== 'pendiente') {
      return res.status(400).json({ message: 'El pedido no está en estado pendiente' });
    }

    const sale = await Sale.create({ order_id, receipt });
    await order.update({ status: 'pagado' });

    res.status(201).json({ message: 'Venta registrada exitosamente', sale });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar venta', error: err.message });
  }
};
