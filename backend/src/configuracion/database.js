const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'urban_import'
});

conexion.connect((error) => {
    if (error) {
        console.log('Error de conexión:', error);
    } else {
        console.log('MySQL conectado');
    }
});
 
module.exports = conexion;