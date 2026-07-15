const conexion =
require('../configuracion/database');

const obtenerProductos = (req, res) => {

    const sql = `
        SELECT * FROM productos
        ORDER BY id DESC
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {

            console.log(error);

            return res.status(500).json(error);

        }

        res.json(resultados);

    });

};

const obtenerProducto = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT * FROM productos
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [id],
        (error, resultados) => {

            if (error) {

                console.log(error);

                return res.status(500).json(error);

            }

            res.json(resultados[0]);

        }
    );

};

const crearProducto = (req, res) => {

    const {
        nombre,
        descripcion,
        precio,
        stock,
        talla,
        categoria,
        destacado
    } = req.body;

    let imagen = '';

    if (req.file) {

        imagen = req.file.path;

    }

    const sql = `
        INSERT INTO productos
        (
            nombre,
            descripcion,
            precio,
            stock,
            talla,
            imagen,
            categoria,
            destacado
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [
            nombre,
            descripcion,
            precio,
            stock,
            talla,
            imagen,
            categoria,
            destacado == 'true' || destacado == 1
            ? 1
            : 0
        ],
        (error, resultado) => {

            if (error) {

                console.log(error);

                return res.status(500).json(error);

            }

            res.json({
                mensaje:
                'Producto creado correctamente'
            });

        }
    );

};

const actualizarProducto = (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        descripcion,
        precio,
        stock,
        talla,
        categoria,
        destacado
    } = req.body;

    let imagen = req.body.imagen;

    if (req.file) {

       imagen = req.file.path;

    }

    const sql = `
        UPDATE productos
        SET
        nombre = ?,
        descripcion = ?,
        precio = ?,
        stock = ?,
        talla = ?,
        imagen = ?,
        categoria = ?,
        destacado = ?
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [
            nombre,
            descripcion,
            precio,
            stock,
            talla,
            imagen,
            categoria,
            destacado == 'true' || destacado == 1
            ? 1
            : 0,
            id
        ],
        (error, resultado) => {

            if (error) {

                console.log(error);

                return res.status(500).json(error);

            }

            res.json({
                mensaje:
                'Producto actualizado correctamente'
            });

        }
    );

};

const eliminarProducto = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM productos
        WHERE id = ?
    `;

    conexion.query(
        sql,
        [id],
        (error) => {

            if (error) {

                console.log(error);

                return res.status(500).json(error);

            }

            res.json({
                mensaje:
                'Producto eliminado correctamente'
            });

        }
    );

};

const obtenerDestacados = (req, res) => {

    const sql = `
        SELECT * FROM productos
        WHERE destacado = 1
        ORDER BY id DESC
    `;

    conexion.query(
        sql,
        (error, resultados) => {

            if (error) {

                console.log(error);

                return res.status(500).json(error);

            }

            res.json(resultados);

        }
    );

};

const obtenerPorCategoria = (req, res) => {

    const { categoria } = req.params;

    const sql = `
        SELECT * FROM productos
        WHERE categoria = ?
        ORDER BY id DESC
    `;

    conexion.query(
        sql,
        [categoria],
        (error, resultados) => {

            if (error) {

                console.log(error);

                return res.status(500).json(error);

            }

            res.json(resultados);

        }
    );

};

const buscarProductos = (req, res) => {

    const { nombre } = req.params;

    const sql = `
        SELECT * FROM productos
        WHERE nombre LIKE ?
        ORDER BY id DESC
    `;

    conexion.query(
        sql,
        [`%${nombre}%`],
        (error, resultados) => {

            if (error) {

                console.log(error);

                return res.status(500).json(error);

            }

            res.json(resultados);

        }
    );

};

const obtenerCategorias = (req, res) => {

    const sql = `
        SELECT DISTINCT categoria
        FROM productos
        WHERE categoria IS NOT NULL
        AND categoria != ''
        ORDER BY categoria ASC
    `;

    conexion.query(
        sql,
        (error, resultados) => {

            if (error) {

                console.log(error);

                return res.status(500).json(error);

            }

            res.json(resultados);

        }
    );

};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerDestacados,
    obtenerPorCategoria,
    buscarProductos,
    obtenerCategorias
};