const express = require('express');
const app = express();
app.use(express.json());
// Datos
const clientes = [
  { id: 1, nombre: 'Cliente 1', edad: 20 },
  { id: 2, nombre: 'Cliente 2', edad: 22 },
  { id: 3, nombre: 'Cliente 3', edad: 24 }
];
const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10 },
  { id: 2, nombre: 'Producto 2', precio: 20 },
  { id: 3, nombre: 'Producto 3', precio: 30 }
];
// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la aplicación Express!');
});
// Peticiones para clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});
app.post('/clientes', (req, res) => {
  const nuevoCliente = { id: clientes.length + 1, ...req.body };
  clientes.push(nuevoCliente);
  res.status(201).json(nuevoCliente);
});
app.put('/clientes/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) return res.status(404).json({ message: 'Cliente no enconctrado' });
  cliente.nombre = req.body.nombre;
  cliente.edad = req.body.edad;
  res.json(cliente);
});
app.delete('/clientes/:id', (req, res) => {
  const clienteIndex = clientes.findIndex(c => c.id === parseInt(req.params.id));
  if (clienteIndex === -1) return res.status(404).json({ message: 'Cliente no encontrado' });
  clientes.splice(clienteIndex, 1);
  res.status(204).send();
});
// Peticiones para productos
app.get('/productos', (req, res) => {
  res.json(productos);
});
app.post('/productos', (req, res) => {
  const nuevoProducto = { id: productos.length + 1, ...req.body };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});
app.put('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
  producto.nombre = req.body.nombre;
  producto.precio = req.body.precio;
  res.json(producto);
});
app.delete('/productos/:id', (req, res) => {
  const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (productoIndex === -1) return res.status(404).json({ message: 'Producto no encontrado' });
  productos.splice(productoIndex, 1);
  res.status(204).send();
});
// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
