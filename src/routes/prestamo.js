const {Router} = require('express')
const prestamos = require('../controllers/prestamos')
const {verifiToken} = require('../auth/verifyToken')

const router = Router()

router.get('/', verifiToken, prestamos.getPrestamos)
router.post('/add', verifiToken, prestamos.newPrestamo)
router.put('/:id', verifiToken, prestamos.devolverPrestamo)
router.get('/estado', verifiToken, prestamos.prestamoEstado)


module.exports = router