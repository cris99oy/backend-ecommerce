const fs = require('fs');

function leerJSON(ruta) {
  if (!fs.existsSync(ruta)) return [];
  const data = fs.readFileSync(ruta, 'utf-8');
  return JSON.parse(data || '[]');
}

function escribirJSON(ruta, data) {
  fs.writeFileSync(ruta, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { leerJSON, escribirJSON };