const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, availability } = req.body;
  try {
    const product = await Product.create({ name, description, price, availability });
    res.status(201).json({ message: 'Producto creado exitosamente', product });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, availability, image } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    await product.update({ name, description, price, availability, image });
    res.status(200).json({ message: 'Producto actualizado exitosamente', product });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar producto', error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    await product.destroy();
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto', error: err.message });
  }
};
