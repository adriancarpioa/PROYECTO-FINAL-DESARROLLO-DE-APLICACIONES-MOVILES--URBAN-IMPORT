const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

require('dotenv').config();


console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const configuracion = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

// Si existe el certificado CA, usar SSL
const rutaCertificado = path.join(__dirname, '../../certificados/ca.pem');

if (fs.existsSync(rutaCertificado)) {
    configuracion.ssl = {
        ca: fs.readFileSync(rutaCertificado)
    };
}

const conexion = mysql.createConnection(configuracion);

conexion.connect((error) => {
    if (error) {
        console.error('Error de conexión:', error);
    } else {
        console.log('MySQL conectado correctamente');
    }
});

module.exports = conexion;