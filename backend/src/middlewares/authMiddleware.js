const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            mensaje: 'Token requerido'
        });
    }

    try {

        const tokenLimpio = token.replace('Bearer ', '');

        const decoded = jwt.verify(
            tokenLimpio,
            'secretkey'
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            mensaje: 'Token inválido'
        });
    }
};

module.exports = verificarToken;