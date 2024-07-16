const jwt = require('jsonwebtoken')
const config = require('../../config')

const verifiToken = (req, res, next) =>{
    let token = req.headers.authorization
    
    if(!token){
        return res.status(401).json({error: "Token not provided"});
    }

    token = token.split(" ")[1]

    try{
        const { user, perfil } = jwt.verify(token, config.jwt.secret)
        req.user = user
        req.perfil = perfil

        next()
    }
    catch (error){
        console.log(error)
        return res.status(400).json({error: "Token invalido"})
    }
}

module.exports = {
    verifiToken
}