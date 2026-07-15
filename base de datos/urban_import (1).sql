-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2026 a las 06:33:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `urban_import`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id`, `usuario_id`, `fecha_creacion`, `producto_id`, `cantidad`) VALUES
(25, 1, '2026-05-30 03:57:02', 27, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `fecha_compra` timestamp NOT NULL DEFAULT current_timestamp(),
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `referencia` text DEFAULT NULL,
  `metodo_pago` varchar(50) DEFAULT NULL,
  `latitud` varchar(50) DEFAULT NULL,
  `longitud` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `usuario_id`, `total`, `estado`, `fecha_compra`, `telefono`, `direccion`, `referencia`, `metodo_pago`, `latitud`, `longitud`) VALUES
(1, 1, 139.00, 'Entregado', '2026-05-23 20:52:53', '941278396', 'Avenida Mariano Pastor Sevilla Mz.F - Lt.13, Villa El Salvador Sector VII Grupo 1, Villa EL Salvador', 'Ovalo mariategui ', 'Contra entrega', '-12.2284212', '-76.9398481'),
(2, 1, 139.00, 'Entregado', '2026-05-23 20:54:04', '941278396', 'Avenida Mariano Pastor Sevilla Mz.F - Lt.13, Villa El Salvador Sector VII Grupo 1, Villa EL Salvador', 'Óvalo Mariategui ', 'Plin', '-12.2284212', '-76.9398481'),
(3, 1, 139.00, 'Entregado', '2026-05-23 20:57:08', '941278396', 'Avenida Mariano Pastor Sevilla Mz.F - Lt.13, Villa El Salvador Sector VII Grupo 1, Villa EL Salvador', 'Óvalo Mariategui ', 'Contra entrega', '-12.2284212', '-76.9398481'),
(4, 1, 350.00, 'Entregado', '2026-05-23 22:02:50', '941278396', 'Villa el salvador', 'Mercado', 'Plin', '', ''),
(5, 7, 278.00, 'Enviado', '2026-05-23 22:12:39', '999888777', 'Calle A Mz.G - Lt.17, Villa El Salvador Sector VII Grupo 1, Villa EL Salvador', 'Mercado', 'Contra entrega', '-12.2286062', '-76.9405715'),
(6, 8, 458.00, 'Preparando', '2026-05-29 17:08:25', '913543123', 'Avenida Mariano Pastor Sevilla Mz.F - Lt.13, Villa El Salvador Sector VII Grupo 1, Villa EL Salvador', 'Mercado', 'Contra entrega', '-12.2283884', '-76.9398679'),
(7, 7, 398.40, 'Pendiente', '2026-05-29 17:13:38', '934234345', 'Avenida Mariano Pastor Sevilla Mz.F - Lt.13, Villa El Salvador Sector VII Grupo 1, Villa EL Salvador', 'Plaza', 'Contra entrega', '-12.2283884', '-76.9398679'),
(8, 9, 278.60, 'Enviado', '2026-05-29 17:19:13', '999999999', 'Avenida Mariano Pastor Sevilla Mz.F - Lt.13, Villa El Salvador Sector VII Grupo 1, Villa EL Salvador', '.', 'Contra entrega', '-12.2283291', '-76.939873'),
(9, 10, 160.30, 'Pendiente', '2026-05-29 18:33:08', '912367845', 'Avenida Mariano Pastor Sevilla Mz.F - Lt.13, Villa El Salvador Sector VII Grupo 1, Villa EL Salvador', 'Mercado', 'Contra entrega', '-12.2284403', '-76.939879');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_carrito`
--

CREATE TABLE `detalle_carrito` (
  `id` int(11) NOT NULL,
  `carrito_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compras`
--

CREATE TABLE `detalle_compras` (
  `id` int(11) NOT NULL,
  `compra_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_compras`
--

INSERT INTO `detalle_compras` (`id`, `compra_id`, `producto_id`, `cantidad`, `precio`) VALUES
(1, 1, 27, 1, 139.00),
(2, 2, 27, 1, 139.00),
(3, 3, 27, 1, 139.00),
(4, 4, 2, 1, 350.00),
(5, 5, 27, 2, 139.00),
(6, 6, 18, 2, 229.00),
(7, 7, 26, 2, 199.20),
(8, 8, 20, 2, 139.30),
(9, 9, 29, 1, 160.30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `talla` varchar(20) DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `categoria` varchar(50) DEFAULT NULL,
  `destacado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `talla`, `imagen`, `fecha_creacion`, `categoria`, `destacado`) VALUES
(2, 'Nike Air Force', 'Zapatilla urbana color blanco', 350.00, 9, '42', 'https://www.nike.com.pe/on/demandware.static/-/Sites-catalog-equinox/default/dw1a57b0c2/images/hi-res/194500874831_1_20240126120000-mrtPeru.jpg', '2026-05-13 02:30:28', 'Urbana', 1),
(11, 'Zapatillas lona URB mujer', 'Color blanco', 39.99, 7, '20', 'https://catalogosmetro.metro.pe/coleccion/catalogo-urb-otonio-2024/productos/slider-zapatillas-2-nuevo.png', '2026-05-15 00:02:29', 'Urbana', 0),
(18, 'Carven III', 'Siente energía PUMA con las Caven III, la fusión perfecta de un estilo retro inspirado en el basketball y una onda urbana moderna', 229.00, 3, '20', 'http://192.168.1.65:3000/uploads/1778813454322-producto.jpg', '2026-05-15 02:50:55', 'Urbana', 1),
(19, 'Flexfocus Lite Moder unisex', 'Las FlexFocus Lite Modern son el modelo más rápido de nuestra serie PUMA Lite', 189.00, 20, '40', 'http://192.168.1.65:3000/uploads/1778813687580-producto.jpg', '2026-05-15 02:54:47', 'Running', 0),
(20, 'Zapatillas Running Unisex Adidas Runfalcon 5 J', 'Las zapatillas Adidas Runfalcon 5 J ofrecen un diseño deportivo y cómodo para el uso diario. Su estructura ligera y transpirable brinda mayor confort al caminar o entrenar, mientras que su suela resistente proporciona buena estabilidad y agarre. Ideales para quienes buscan estilo y rendimiento en un solo calzado.', 139.30, 13, '39', 'http://192.168.1.65:3000/uploads/1779581173407-producto.jpg', '2026-05-15 02:58:10', 'Running', 1),
(26, 'Zapatillas de training Disperse XT 4 Knit', 'Da un paso hacia el futuro con estas dinámicas zapatillas de entrenamiento PUMA. Con una capellada tejida y respirable, plantilla SOFTFOAM+', 199.20, 28, '40', 'http://192.168.1.65:3000/uploads/1778899752242-producto.jpg', '2026-05-16 02:49:12', 'Training', 0),
(27, 'Zapatilla New Ahletic Basketball Durand3 018-3751 Hombre', 'La Zapatilla New Athletic Basketball Durand3 018-3751 para hombre combina comodidad, estabilidad y buen agarre. Su diseño deportivo y suela antideslizante la hacen ideal para jugar básquet o para un uso casual diario.', 139.00, 20, '42', 'http://192.168.1.65:3000/uploads/1778899828550-producto.jpg', '2026-05-16 02:50:28', 'Basketball', 1),
(29, 'Zapatillas Urbanas Hombre Puma Cc Vulc', 'Las zapatillas Puma CC Vulc para hombre destacan por su diseño urbano y moderno, ideales para el uso diario. Ofrecen comodidad, estilo casual y una suela resistente que brinda buen agarre en diferentes superficies. Perfectas para combinar con outfits streetwear o casuales.', 160.30, 9, '42', 'http://192.168.1.65:3000/uploads/1779580648368-producto.jpg', '2026-05-23 23:57:28', 'Urbana ', 0),
(31, 'Zapatillas adidas Running Runfalcon 5 Mujer Blanco Jr3089', 'Las zapatillas adidas Runfalcon 5 para mujer combinan comodidad, ligereza y un diseño deportivo moderno. Su color blanco brinda un estilo versátil y elegante, ideal para entrenamientos, caminatas o uso diario. Cuentan con una suela resistente y una amortiguación suave para mayor confort en cada paso.', 139.00, 10, '35', 'http://192.168.1.65:3000/uploads/1779580966592-producto.jpg', '2026-05-24 00:02:46', 'Running', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` enum('cliente','admin') DEFAULT 'cliente',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contraseña`, `rol`, `fecha_creacion`) VALUES
(1, 'Adrian Carpio', 'adrian@gmail.com', '$2b$10$CM0O3ZCF6fERwTM.wLsobuoePXnjHJgxA0L8yQPs5C/v/a8xyV0AC', 'cliente', '2026-05-14 03:51:09'),
(3, 'ADMINISTRADOR ', 'admin@gmail.com', '$2b$10$9/kcbAO0jCicokIXPcN9req9x4LozxQIxZTXAaNK4KICRySBbdPdq', 'admin', '2026-05-14 05:05:23'),
(7, 'Lucero', 'lucero@gmail.com', '$2b$10$5EDr8UcYnCRh54MqMxrQ3OO19DrmkfgdLs2VsIsyJkRkG.dsbY2.G', 'cliente', '2026-05-15 18:40:37'),
(8, 'prueba', 'prueba@gmail.com', '$2b$10$y.d3723qa9SytfEz.5sdaejZ.IgtDToNsba/RQN7YUGMaVK/ixQYm', 'cliente', '2026-05-16 00:26:12'),
(9, 'María', 'maria@gmail.com', '$2b$10$lyPXs5lu3NpRM43WygehwuV9sg2gC2g5Qm7Ld.wGECTMnqjtpl56a', 'cliente', '2026-05-29 17:15:35'),
(10, 'Rodrigo', 'rodrigo@gmail.com', '$2b$10$NX6OI9RX669C8eL0.82.I.ULJ5.9HPJPV3gM8gQEZ4ymhy95sULwq', 'cliente', '2026-05-29 18:32:06');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carrito_id` (`carrito_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compra_id` (`compra_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `detalle_carrito`
--
ALTER TABLE `detalle_carrito`
  ADD CONSTRAINT `detalle_carrito_ibfk_1` FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`id`),
  ADD CONSTRAINT `detalle_carrito_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `detalle_compras`
--
ALTER TABLE `detalle_compras`
  ADD CONSTRAINT `detalle_compras_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`),
  ADD CONSTRAINT `detalle_compras_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
