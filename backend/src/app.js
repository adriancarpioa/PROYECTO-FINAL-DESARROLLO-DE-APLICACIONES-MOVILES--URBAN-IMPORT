require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./configuracion/database');

const authRutas = require('./rutas/authRutas');
const productoRutas = require('./rutas/productoRutas');
const usuarioRutas = require('./rutas/usuarioRutas');
const app = express();

const dashboardRutas =
require('./rutas/dashboardRutas');

const carritoRutas =
require('./rutas/carritoRutas');

const compraRutas =
require('./rutas/compraRutas');

app.use(cors());
app.use(express.json());



app.use(
    '/api/carrito',
    carritoRutas
);

app.use('/api/auth', authRutas);
app.use('/api/productos', productoRutas);
app.use('/api/usuarios', usuarioRutas);
app.use('/api/dashboard', dashboardRutas);

app.use(
    '/api/compras',
    compraRutas
);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Urban Import funcionando'
    });
});

module.exports = app;

