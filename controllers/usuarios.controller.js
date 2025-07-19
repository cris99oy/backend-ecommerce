const { leerJSON, escribirJSON } = require('../utils/fileManager');
const ruta = './data/usuarios.json';

const obtenerUsuarios = (req, res) => {
  const usuarios = leerJSON(ruta);
  res.json(usuarios);
};

const crearUsuario = (req, res) => {
  const usuarios = leerJSON(ruta);
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ mensaje: 'Nombre y correo son obligatorios.' });
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre,
    correo
  };

  usuarios.push(nuevoUsuario);
  escribirJSON(ruta, usuarios);
  res.status(201).json({ mensaje: 'Usuario creado correctamente.', usuario: nuevoUsuario });
};

const actualizarUsuario = (req, res) => {
  const usuarios = leerJSON(ruta);
  const { id } = req.params;
  const { nombre, correo } = req.body;
  const index = usuarios.findIndex(u => u.id == id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  if (nombre) usuarios[index].nombre = nombre;
  if (correo) usuarios[index].correo = correo;

  escribirJSON(ruta, usuarios);
  res.json({ mensaje: 'Usuario actualizado', usuario: usuarios[index] });
};

const eliminarUsuario = (req, res) => {
  const usuarios = leerJSON(ruta);
  const { id } = req.params;
  const nuevosUsuarios = usuarios.filter(u => u.id != id);

  if (usuarios.length === nuevosUsuarios.length) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  escribirJSON(ruta, nuevosUsuarios);
  res.json({ mensaje: 'Usuario eliminado' });
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};