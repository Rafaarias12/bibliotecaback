const bcrypt = require("bcrypt");
const conexion = require("../conexion/conexion");
const jwt = require('jsonwebtoken')
const config = require('../../config')

const createUsuario = async (req, res) => {
  try {
    const conn = await conexion;
    const { nombre, user, password, activo, perfil } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await conn.execute(
      `INSERT INTO usuario (nombre, user, password, activo, perfil) values (?, ?, ?, ?, ?)`,
      [nombre, user, hash, activo, perfil]
    );
    res.json({ message: "Usuario Agregado" });
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const conn = await conexion;
    const { user, password } = req.body;
    const rows = await conn.query(
      `CALL spLogin(?)`,
      [user]
    );
    const usuario = rows[0][0][0];

    const isMatch = await bcrypt.compare(password, usuario.password);

    if(!isMatch){
        return res.status(401).json({error: "Credenciales Invalidas"})
    }
    else{
        const token = jwt.sign({user: user, perfil: usuario.perfil},
            config.jwt.secret,
            {
                expiresIn:"8h"
            }
        )
        res.json({ok: true, perfil: usuario.perfil, msg: token})
    }
    }
    catch (err) {
        res.status(500);
        return res.send(err.message);
    }
};

const perfiles = async (req, res) =>{
  try{
    const conn = await conexion
    const rows = await conn.query("SELECT * FROM perfil")
    const result = rows[0]
    return res.json(result)
  }
  catch(err){
    res.status(500)
    return res.send(err.message)
  }
}

const getUsuario = async (req, res)=>{
  try{
    console.log("prueba")
    const conn = await conexion
    const rows = await conn.query("SELECT u.nombre, u.user, u.activo, p.descripcion as perfil FROM usuario u, perfil p where p.id = u.perfil")
    const result = rows[0]
    return res.json(result)
  }
  catch(err){
    res.status(500)
    return res.send(err.message)
  }
}

module.exports = {
  createUsuario,
  login, 
  perfiles,
  getUsuario
};
