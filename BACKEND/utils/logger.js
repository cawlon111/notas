const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

// ✅ Exportar con nombre para mejor referencia en VS Code
const logger = {
  info,
  error
}

module.exports = logger