import React, { useState, useEffect } from 'react';
import './Admin.css';

export const Admin = () => {
  // Estados para productos
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', availability: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [error, setError] = useState('');

  // Función para obtener productos
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Productos obtenidos:', data);
      setProducts(data);
      setError(''); // Limpiar errores si la solicitud es exitosa
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError('No se pudieron cargar los productos. Intenta de nuevo más tarde.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejo de cambios en el formulario
  const handleProductChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // Crear o actualizar producto
  const handleProductSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
  
    if (!token) {
      alert('Por favor, inicia sesión para realizar esta acción.');
      return;
    }
  
    const url = isEditing
      ? `http://localhost:3000/api/products/${editProductId}`
      : 'http://localhost:3000/api/products';
    const method = isEditing ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado
        },
        body: JSON.stringify(productForm),
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log(isEditing ? 'Producto actualizado:' : 'Producto creado:', result);
      alert(isEditing ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
      fetchProducts();
      setProductForm({ name: '', description: '', price: '', availability: '' });
      setIsEditing(false);
      setEditProductId(null);
    } catch (err) {
      console.error('Error al guardar producto:', err);
      setError('No se pudo guardar el producto. Intenta de nuevo.');
    }
  };

  // Editar producto
  const handleProductEdit = (product) => {
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      availability: product.availability.toString(),
    });
    setIsEditing(true);
    setEditProductId(product.id);
  };

  const handleProductDelete = async (id) => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Por favor, inicia sesión para realizar esta acción.');
      return;
    }
  
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token al encabezado
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
  
        alert('Producto eliminado exitosamente');
        fetchProducts();
      } catch (err) {
        console.error('Error al eliminar producto:', err);
        setError('No se pudo eliminar el producto. Intenta de nuevo.');
      }
    }
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>

      {/* Gestión de Productos */}
      <section>
        <h2>Gestión de Productos</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleProductSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre del producto"
            value={productForm.name}
            onChange={handleProductChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={productForm.description}
            onChange={handleProductChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={productForm.price}
            onChange={handleProductChange}
            required
          />
          <select
            name="availability"
            value={productForm.availability}
            onChange={handleProductChange}
            required
          >
            <option value="">Seleccione disponibilidad</option>
            <option value="1">Disponible</option>
            <option value="0">No disponible</option>
          </select>
          <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Disponibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.availability ? 'Disponible' : 'No disponible'}</td>
                  <td>
                    <button onClick={() => handleProductEdit(product)}>Editar</button>
                    <button onClick={() => handleProductDelete(product.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay productos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
