const {Router} = require('express')
const libros = require('../controllers/libros')
const {verifiToken} = require('../auth/verifyToken')

const router = Router()

router.get('/', verifiToken, libros.getLibro)
router.get('/categoria', verifiToken, libros.getCategoria)
router.post('/', verifiToken, libros.addLibro)
router.put('/:id', verifiToken, libros.editLibro)
router.delete('/:id', verifiToken, libros.deleteLibro)
router.get('/autor', verifiToken, libros.getAutor)

module.exports = router;
