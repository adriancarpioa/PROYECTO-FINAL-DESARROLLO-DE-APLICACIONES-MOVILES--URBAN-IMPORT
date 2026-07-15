const conexion = require('../configuracion/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registro = async (req, res) => {

    const { nombre, correo, contraseña } = req.body;

    try {

        const passwordHash = await bcrypt.hash(contraseña, 10);

        const sql = `
            INSERT INTO usuarios(nombre, correo, contraseña)
            VALUES (?, ?, ?)
        `;

        conexion.query(
            sql,
            [nombre, correo, passwordHash],
            (error, resultado) => {

                if (error) {
                    return res.status(500).json(error);
                }

                res.json({
                    mensaje: 'Usuario registrado correctamente'
                });

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

};

const login = (req, res) => {

    const { correo, contraseña } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE correo = ?
    `;

    conexion.query(sql, [correo], async (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {
            return res.status(401).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        const usuario = resultados[0];

        const passwordCorrecto = await bcrypt.compare(
            contraseña,
            usuario.contraseña
        );

        if (!passwordCorrecto) {
            return res.status(401).json({
                mensaje: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol
            },
            'secretkey',
            {
                expiresIn: '1d'
            }
        );

        res.json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    });

};

module.exports = {
    registro,
    login
};