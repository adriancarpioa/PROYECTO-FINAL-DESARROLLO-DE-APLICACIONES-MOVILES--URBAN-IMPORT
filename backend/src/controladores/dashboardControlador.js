const conexion = require('../configuracion/database');

const obtenerResumen = (req, res) => {

    const sqlProductos = `
        SELECT COUNT(*) AS total
        FROM productos
    `;

    const sqlUsuarios = `
        SELECT COUNT(*) AS total
        FROM usuarios
        WHERE rol = 'cliente'
    `;

    const sqlPedidos = `
        SELECT COUNT(*) AS total
        FROM compras
    `;

    const sqlVentas = `
        SELECT IFNULL(SUM(total),0) AS total
        FROM compras
    `;

    conexion.query(
        sqlProductos,
        (errorProductos, productos) => {

            if (errorProductos) {
                return res.status(500).json(errorProductos);
            }

            conexion.query(
                sqlUsuarios,
                (errorUsuarios, usuarios) => {

                    if (errorUsuarios) {
                        return res.status(500).json(errorUsuarios);
                    }

                    conexion.query(
                        sqlPedidos,
                        (errorPedidos, pedidos) => {

                            if (errorPedidos) {
                                return res.status(500).json(errorPedidos);
                            }

                            conexion.query(
                                sqlVentas,
                                (errorVentas, ventas) => {

                                    if (errorVentas) {
                                        return res.status(500).json(errorVentas);
                                    }

                                    res.json({

                                        productos:
                                            productos[0].total,

                                        usuarios:
                                            usuarios[0].total,

                                        pedidos:
                                            pedidos[0].total,

                                        ventas:
                                            ventas[0].total

                                    });

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};

module.exports = {
    obtenerResumen
};