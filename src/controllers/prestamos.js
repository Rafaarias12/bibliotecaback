const conexion = require('../conexion/conexion')

const prestamoEstado = async (req, res) =>{
    try{
        const conn = await conexion
        const data = await conn.query("SELECT * FROM estado")
        const result = data[0][0]
        return res.json(result)
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
}

const newPrestamo = async (req, res) =>{
    try{
        const conn = await conexion
        const {
            usuario,
            libro
        }  = req.body

        await conn.query(`CALL spSolicitaLibro(?,?)`,[
            usuario,
            libro
        ])

        res.json({ message: "Prestamo Completo" });
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
}

const devolverPrestamo = async (req, res) =>{
    try{
        const conn = await conexion
        const id = req.params.id;
        await conn.query(`CALL spPrestamoDevuelto(?)`,[
            id
        ])
        res.json({ message: "Prestamo Finalizado" });
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
    
}

const getPrestamos = async (req, res) =>{
    const conn = await conexion
    const data = await conn.query("CALL spGetPrestamos")
    const result = data[0][0]
    return res.json(result)
}

module.exports = {
    getPrestamos,
    devolverPrestamo,
    newPrestamo,
    prestamoEstado
}