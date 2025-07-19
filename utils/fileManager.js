const fs = require('fs');

function readJSONFile(path) {
  if (!fs.existsSync(path)) return [];
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data || '[]');
}

function writeJSONFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  readJSONFile,
  writeJSONFile
};