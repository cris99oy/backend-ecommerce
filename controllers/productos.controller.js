const { readJSONFile, writeJSONFile } = require('../utils/fileManager');
const path = require('path');
const filePath = path.join(__dirname, '../data/productos.json');

// Listar productos
const obtenerProductos = (req, res) => {
  const productos = readJSONFile(filePath);
  res.json(productos);
};

// Obtener producto por ID
const obtenerProductoPorId = (req, res) => {
  const productos = readJSONFile(filePath);
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(producto);
};

// Crear producto
const crearProducto = (req, res) => {
  const productos = readJSONFile(filePath);
  const nuevoProducto = {
    id: Date.now(),
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock: req.body.stock
  };
  productos.push(nuevoProducto);
  writeJSONFile(filePath, productos);
  res.status(201).json(nuevoProducto);
};

// Actualizar producto
const actualizarProducto = (req, res) => {
  let productos = readJSONFile(filePath);
  const index = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Producto no encontrado' });

  productos[index] = { ...productos[index], ...req.body };
  writeJSONFile(filePath, productos);
  res.json(productos[index]);
};

// Eliminar producto
const eliminarProducto = (req, res) => {
  let productos = readJSONFile(filePath);
  const nuevoListado = productos.filter(p => p.id !== parseInt(req.params.id));
  if (productos.length === nuevoListado.length) return res.status(404).json({ mensaje: 'Producto no encontrado' });

  writeJSONFile(filePath, nuevoListado);
  res.json({ mensaje: 'Producto eliminado correctamente' });
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
