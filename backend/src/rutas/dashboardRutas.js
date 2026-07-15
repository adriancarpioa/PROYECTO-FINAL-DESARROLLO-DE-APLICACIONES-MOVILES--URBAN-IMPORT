const express = require('express');

const router = express.Router();

const {
    obtenerResumen
} = require('../controladores/dashboardControlador');

router.get('/resumen', obtenerResumen);

module.exports = router;