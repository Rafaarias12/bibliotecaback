const config = require('../../config')
const mysql = require('mysql2')

const dbconfig = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
  }

let conexion = mysql.createPool(dbconfig);


module.exports = conexion.promise();