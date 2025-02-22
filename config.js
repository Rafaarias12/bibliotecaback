require('dotenv').config();

module.exports = {
    app:{
        port: process.env.PORT
    },
    
    mysql: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },

    jwt:{
        secret: process.env.JWT_SECRET
    }

}