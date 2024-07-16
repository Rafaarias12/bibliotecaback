const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')
const usuarios = require('./src/routes/usuarios')
const prestamos = require('./src/routes/prestamo')
const libros = require('./src/routes/libros')

const app = express()

exports.app = app
let port = config.app.port


app.get('/', (req, res) => {
  res.end('Hello Word')
})

app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

app.use('/api/usuario', usuarios)
app.use('/api/libros', libros)
app.use('/api/prestamos', prestamos)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})