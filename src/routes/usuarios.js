const {Router} = require('express')
const usuarios = require('../controllers/usuarios')
const {verifiToken} = require('../auth/verifyToken')

const router = Router()

router.post('/login', usuarios.login)
router.post('/register', verifiToken, usuarios.createUsuario)
router.get('/perfil', verifiToken, usuarios.perfiles)
router.get('/', usuarios.getUsuario)

module.exports = router