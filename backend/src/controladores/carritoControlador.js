const conexion =
require('../configuracion/database');

const agregarAlCarrito = (req, res) => {

    const {
        usuario_id,
        producto_id,
        cantidad
    } = req.body;

    const verificarSql = `
        SELECT *
        FROM carrito
        WHERE usuario_id = ?
        AND producto_id = ?
    `;

    conexion.query(
        verificarSql,
        [usuario_id, producto_id],
        (error, resultados) => {

            if (error) {
                return res.status(500).json(error);
            }

            // SI YA EXISTE
            if (resultados.length > 0) {

                const nuevaCantidad =
                    resultados[0].cantidad
                    + cantidad;

                const updateSql = `
                    UPDATE carrito
                    SET cantidad = ?
                    WHERE id = ?
                `;

                conexion.query(
                    updateSql,
                    [
                        nuevaCantidad,
                        resultados[0].id
                    ],
                    (errorUpdate) => {

                        if (errorUpdate) {
                            return res
                            .status(500)
                            .json(errorUpdate);
                        }

                        res.json({
                            mensaje:
                            'Cantidad actualizada'
                        });

                    }
                );

            } else {

                // INSERTAR NUEVO
                const insertSql = `
                    INSERT INTO carrito
                    (
                        usuario_id,
                        producto_id,
                        cantidad
                    )
                    VALUES (?, ?, ?)
                `;

                conexion.query(
                    insertSql,
                    [
                        usuario_id,
                        producto_id,
                        cantidad
                    ],
                    (errorInsert) => {

                        if (errorInsert) {
                            return res
                            .status(500)
                            .json(errorInsert);
                        }

                        res.json({
                            mensaje:
                            'Producto agregado'
                        });

                    }
                );

            }

        }
    );

};

const obtenerCarrito = (req, res) => {

    const { usuario_id } = req.params;

    const sql = `
        SELECT
        carrito.id,
        carrito.cantidad,

        productos.nombre,
        productos.precio,
        productos.imagen,
        productos.stock

        FROM carrito

        INNER JOIN productos
        ON carrito.producto_id =
        productos.id

        WHERE carrito.usuario_id = ?
    `;

    conexion.query(
        sql,
        [usuario_id],
        (error, resultados) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json(resultados);

        }
    );

};

const eliminarDelCarrito = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM carrito
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [id],
        (error) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje:
                'Producto eliminado'
            });

        }
    );

};

const contarCarrito = (req, res) => {

    const { usuario_id } = req.params;

    const sql = `
        SELECT COUNT(*) AS total
        FROM carrito
        WHERE usuario_id = ?
    `;

    conexion.query(
        sql,
        [usuario_id],
        (error, resultados) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json(resultados[0]);

        }
    );

};

module.exports = {

    agregarAlCarrito,
    obtenerCarrito,
    eliminarDelCarrito,
    contarCarrito

};