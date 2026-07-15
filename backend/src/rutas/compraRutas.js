const express = require('express');

const router = express.Router();

const {

    registrarCompra,
    obtenerCompras,
    actualizarEstado

} = require(
    '../controladores/compraControlador'
);

router.post(
    '/',
    registrarCompra
);

router.get(
    '/',
    obtenerCompras
);

router.put(
    '/:id',
    actualizarEstado
);

module.exports = router;