const conexion =
require('../configuracion/database');

const obtenerUsuarios =
(req, res) => {

    const sql = `
        SELECT
        id,
        nombre,
        correo,
        rol,
        fecha_creacion
        FROM usuarios
    `;

    conexion.query(
        sql,
        (error, resultados) => {

            if (error) {

                return res
                .status(500)
                .json(error);

            }

            res.json(resultados);

        }
    );

};

const eliminarUsuario =
(req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM usuarios
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [id],
        (error) => {

            if (error) {

                return res
                .status(500)
                .json(error);

            }

            res.json({
                mensaje:
                'Usuario eliminado'
            });

        }
    );

};

const obtenerPerfil =
(req, res) => {

    const { id } = req.params;

    const sqlUsuario = `
        SELECT
        id,
        nombre,
        correo,
        fecha_creacion
        FROM usuarios
        WHERE id = ?
    `;

    conexion.query(
        sqlUsuario,
        [id],
        (error, usuario) => {

            if (error) {

                return res
                .status(500)
                .json(error);

            }

            const sqlResumen = `
                SELECT
                COUNT(*) AS pedidos,
                IFNULL(
                    SUM(total),
                    0
                ) AS totalGastado
                FROM compras
                WHERE usuario_id = ?
            `;

            conexion.query(
                sqlResumen,
                [id],
                (error2, resumen) => {

                    if (error2) {

                        return res
                        .status(500)
                        .json(error2);

                    }

                    const sqlPedidos = `
                        SELECT
                        id,
                        total,
                        estado,
                        fecha_compra
                        FROM compras
                        WHERE usuario_id = ?
                        ORDER BY id DESC
                    `;

                    conexion.query(
                        sqlPedidos,
                        [id],
                        (error3, pedidos) => {

                            if (error3) {

                                return res
                                .status(500)
                                .json(error3);

                            }

                            res.json({

                                usuario:
                                usuario[0],

                                resumen:
                                resumen[0],

                                pedidos

                            });

                        }
                    );

                }
            );

        }
    );

};

module.exports = {

    obtenerUsuarios,
    eliminarUsuario,
    obtenerPerfil

};