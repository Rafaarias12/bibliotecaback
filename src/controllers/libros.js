const conexion = require('../conexion/conexion')

const getLibroCategoria = async (req, res) =>{
    try{
        const categoria = req.params;
        const conn = await conexion
        
        const row = await conn.query("CALL spGetLibrosCat(" + categoria.categoria + ")")
        const result = row[0][0]
        return res.json(result)
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
}

const getLibro = async (req, res) =>{
    try{
        const conn = await conexion
        const data = await conn.query("CALL spGetLibros(1)")
        const result = data[0][0]
        return res.json(result)
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
}

const addLibro = async (req, res) =>{
    try{
        const {
            autor,
            titulo,
            descripcion,
            nombre,
            apellido,
            fechafinal,
            fechanac,
            categoria

         } = req.body

        

        const conn = await conexion
        await conn.query(`CALL spPostLibros(?,?,?,?,?,?,?,?)`, [
            autor,
            titulo,
            descripcion,
            nombre,
            apellido,
            fechafinal,
            fechanac,
            categoria
        ])
        res.json({ message: "Libro Agregado" });
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
}

const editLibro = async (req, res)=>{
    const id = req.params.id;
    const {titulo, categoria, autor} = req.body

    let conn = await conexion

    try{
        const result = await conn.query(`CALL spEditLibro (?,?,?,?)`, [id, titulo, categoria, autor])
        res.json({message: 'Libro actualizado exitosamente'})
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
    
}

const deleteLibro = async (req,res)=>{
    const id = req.params.id
    let conn = await conexion

    try{
        await conn.query(`CALL spDeleteLibro (?)`, [id])
        res.json({message: 'Libro Eliminado'});
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
}

const getAutor = async (req,res)=>{
    
    let conn = await conexion

    try{
        
        const data = await conn.query("SELECT * FROM autor")
        const result = data[0]
        return res.json(result)
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
}

const getCategoria = async (req,res)=>{
    
    let conn = await conexion

    try{
        
        const data = await conn.query("SELECT * FROM categoria")
        const result = data[0]
        return res.json(result)
    }
    catch(err){
        res.status(500);
        return res.send(err.message)
    }
}


module.exports = {
    getLibroCategoria,
    getLibro,
    addLibro,
    editLibro,
    deleteLibro,
    getAutor,
    getCategoria
}