const express =
require('express');

const router =
express.Router();

const {

    obtenerUsuarios,
    eliminarUsuario,
    obtenerPerfil

} = require(
    '../controladores/usuarioControlador'
);

router.get(
    '/',
    obtenerUsuarios
);

router.get(
    '/perfil/:id',
    obtenerPerfil
);

router.delete(
    '/:id',
    eliminarUsuario
);

module.exports = router;