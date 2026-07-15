const express = require('express');

const router = express.Router();

const {

    agregarAlCarrito,
    obtenerCarrito,
    eliminarDelCarrito,
    contarCarrito

} = require(
    '../controladores/carritoControlador'
);

router.post(
    '/',
    agregarAlCarrito
);

router.get(
    '/:usuario_id',
    obtenerCarrito
);

router.get(
    '/contador/:usuario_id',
    contarCarrito
);

router.delete(
    '/:id',
    eliminarDelCarrito
);

module.exports = router;