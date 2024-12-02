const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  const { customer_id, items } = req.body; // items: [{ product_id, quantity }]
  try {
    const totalAmount = await calculateTotalAmount(items);

    const order = await Order.create({
      customer_id,
      total_amount: totalAmount,
      status: 'pendiente',
    });

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      subtotal: item.quantity * item.price, // Precio por cantidad
    }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ message: 'Pedido creado exitosamente', order });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear pedido', error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Estado: 'pendiente', 'pagado', 'anulado'

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    await order.update({ status });
    res.status(200).json({ message: 'Estado del pedido actualizado', order });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: err.message });
  }
};

// Calcula el monto total del pedido
const calculateTotalAmount = async (items) => {
  let total = 0;
  for (const item of items) {
    const product = await Product.findByPk(item.product_id);
    if (!product) throw new Error(`Producto con ID ${item.product_id} no encontrado`);
    total += product.price * item.quantity;
  }
  return total;
};
