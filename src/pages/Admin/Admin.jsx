import React, { useState, useEffect } from 'react';
import './Admin.css';

export const Admin = () => {
  // Estados para productos
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', availability: '', image: '' });
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
    const url = isEditing
      ? `http://localhost:3000/api/products/${editProductId}`
      : 'http://localhost:3000/api/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log(isEditing ? 'Producto actualizado:' : 'Producto creado:', result);
      alert(isEditing ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
      fetchProducts();
      setProductForm({ name: '', description: '', price: '', availability: '', image: '' });
      setIsEditing(false);
      setEditProductId(null);
    } catch (err) {
      console.error('Error al guardar producto:', err);
      setError('No se pudo guardar el producto. Intenta de nuevo.');
    }
  };

  // **Editar producto**
  const handleProductEdit = (product) => {
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      availability: product.availability.toString(),
      image: product.image || '',
    });
    setIsEditing(true);
    setEditProductId(product.id);
  };

  // **Eliminar producto**
  const handleProductDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: 'DELETE',
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

  // Validar si la URL es válida
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
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
          <input
            type="text"
            name="image"
            placeholder="URL de la imagen"
            value={productForm.image}
            onChange={handleProductChange}
          />

          {/* Previsualización de imagen */}
          {productForm.image && isValidUrl(productForm.image) ? (
            <div style={{ marginTop: '10px' }}>
              <h4>Previsualización de la imagen:</h4>
              <img
                src={productForm.image}
                alt="Previsualización"
                style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
          ) : productForm.image ? (
            <p style={{ color: 'red' }}>URL de imagen no válida</p>
          ) : null}

          <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Disponibilidad</th>
              <th>Imagen</th>
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
                    {product.image ? (
                      <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
                    ) : (
                      'Sin imagen'
                    )}
                  </td>
                  <td>
                    <button className='btn-prd' onClick={() => handleProductEdit(product)}>Editar</button>
                    <button className='btn-prd-e' onClick={() => handleProductDelete(product.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay productos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
