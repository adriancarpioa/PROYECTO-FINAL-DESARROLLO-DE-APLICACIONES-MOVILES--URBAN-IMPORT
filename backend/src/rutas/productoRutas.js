const express = require('express');

const router = express.Router();

const upload =
require('../configuracion/multer');

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerDestacados,
    obtenerPorCategoria,
    buscarProductos,
    obtenerCategorias
} = require('../controladores/productoControlador');

router.get('/', obtenerProductos);

router.get(
    '/destacados',
    obtenerDestacados
);

router.get(
    '/categorias',
    obtenerCategorias
);

router.get(
    '/categoria/:categoria',
    obtenerPorCategoria
);

router.get(
    '/buscar/:nombre',
    buscarProductos
);

router.get('/:id', obtenerProducto);

router.post(
    '/',
    upload.single('imagen'),
    crearProducto
);

router.put(
    '/:id',
    upload.single('imagen'),
    actualizarProducto
);

router.delete(
    '/:id',
    eliminarProducto
);

module.exports = router;