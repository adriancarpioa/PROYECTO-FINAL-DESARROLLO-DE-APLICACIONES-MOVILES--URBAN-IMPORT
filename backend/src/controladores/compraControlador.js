const conexion =
require('../configuracion/database');

const registrarCompra = (req, res) => {

    const {
        usuario_id,
        telefono,
        direccion,
        referencia,
        metodo_pago,
        latitud,
        longitud
    } = req.body;

    const obtenerCarritoSql = `
        SELECT
        carrito.producto_id,
        carrito.cantidad,
        productos.precio,
        productos.stock

        FROM carrito

        INNER JOIN productos
        ON carrito.producto_id =
        productos.id

        WHERE carrito.usuario_id = ?
    `;

    conexion.query(
        obtenerCarritoSql,
        [usuario_id],
        (error, productos) => {

            if (error) {
                return res.status(500).json(error);
            }

            if (productos.length === 0) {

                return res.json({
                    mensaje:
                    'El carrito está vacío'
                });

            }

            for (let producto of productos) {

                if (
                    producto.cantidad >
                    producto.stock
                ) {

                    return res.json({
                        mensaje:
                        'Stock insuficiente'
                    });

                }

            }

            let total = 0;

            productos.forEach((item) => {

                total +=
                item.precio *
                item.cantidad;

            });

            const compraSql = `
                INSERT INTO compras
                (
                    usuario_id,
                    total,
                    estado,
                    telefono,
                    direccion,
                    referencia,
                    metodo_pago,
                    latitud,
                    longitud
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            conexion.query(
                compraSql,
                [
                    usuario_id,
                    total,
                    'Pendiente',
                    telefono,
                    direccion,
                    referencia,
                    metodo_pago,
                    latitud,
                    longitud
                ],
                (errorCompra, resultadoCompra) => {

                    if (errorCompra) {

                        return res
                        .status(500)
                        .json(errorCompra);

                    }

                    const compra_id =
                    resultadoCompra.insertId;

                    productos.forEach((item) => {

                        const detalleSql = `
                            INSERT INTO detalle_compras
                            (
                                compra_id,
                                producto_id,
                                cantidad,
                                precio
                            )
                            VALUES (?, ?, ?, ?)
                        `;

                        conexion.query(
                            detalleSql,
                            [
                                compra_id,
                                item.producto_id,
                                item.cantidad,
                                item.precio
                            ]
                        );

                        const stockSql = `
                            UPDATE productos
                            SET stock =
                            stock - ?
                            WHERE id = ?
                        `;

                        conexion.query(
                            stockSql,
                            [
                                item.cantidad,
                                item.producto_id
                            ]
                        );

                    });

                    const vaciarSql = `
                        DELETE FROM carrito
                        WHERE usuario_id = ?
                    `;

                    conexion.query(
                        vaciarSql,
                        [usuario_id]
                    );

                    res.json({
                        mensaje:
                        'Compra registrada'
                    });

                }
            );

        }
    );

};

const obtenerCompras = (req, res) => {

    const sql = `
        SELECT
        compras.*,
        usuarios.nombre,
        usuarios.correo

        FROM compras

        INNER JOIN usuarios
        ON compras.usuario_id =
        usuarios.id

        ORDER BY compras.id DESC
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

const actualizarEstado =
(req, res) => {

    const { id } = req.params;

    const { estado } = req.body;

    const sql = `
        UPDATE compras
        SET estado = ?
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [estado, id],
        (error) => {

            if (error) {

                return res
                .status(500)
                .json(error);

            }

            res.json({
                mensaje:
                'Estado actualizado'
            });

        }
    );

};

module.exports = {

    registrarCompra,
    obtenerCompras,
    actualizarEstado

};