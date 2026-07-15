import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    Image
} from 'react-native';

import {
    useEffect,
    useState
} from 'react';

import * as ImagePicker
from 'expo-image-picker';

import API_URL
from '../../servicios/api';

export default function EditarProductoScreen({
    route,
    navigation
}) {

    const { producto } = route.params;

    const [nombre, setNombre] =
    useState('');

    const [descripcion,
    setDescripcion] =
    useState('');

    const [precio, setPrecio] =
    useState('');

    const [stock, setStock] =
    useState('');

    const [categoria,
    setCategoria] =
    useState('');

    const [talla, setTalla] =
    useState('');

    const [imagen, setImagen] =
    useState(null);

    const [destacado,
    setDestacado] =
    useState(false);

    useEffect(() => {

        setNombre(producto.nombre);
        setDescripcion(
            producto.descripcion
        );

        setPrecio(
            producto.precio.toString()
        );

        setStock(
            producto.stock.toString()
        );

        setCategoria(
            producto.categoria
        );

        setTalla(producto.talla);

        setImagen(producto.imagen);

        setDestacado(
            producto.destacado === 1
        );

    }, []);

    const seleccionarImagen =
    async () => {

        const permiso =
        await ImagePicker
        .requestMediaLibraryPermissionsAsync();

        if (!permiso.granted) {

            Alert.alert(
                'Permiso denegado'
            );

            return;

        }

        const resultado =
        await ImagePicker
        .launchImageLibraryAsync({
            mediaTypes:
            ImagePicker
            .MediaTypeOptions.Images,
            quality: 1
        });

        if (!resultado.canceled) {

            setImagen(
                resultado.assets[0].uri
            );

        }

    };

    const tomarFoto =
    async () => {

        const permiso =
        await ImagePicker
        .requestCameraPermissionsAsync();

        if (!permiso.granted) {

            Alert.alert(
                'Permiso denegado'
            );

            return;

        }

        const resultado =
        await ImagePicker
        .launchCameraAsync({
            quality: 1
        });

        if (!resultado.canceled) {

            setImagen(
                resultado.assets[0].uri
            );

        }

    };

    const editarProducto =
    async () => {

        try {

            const formData =
            new FormData();

            formData.append(
                'nombre',
                nombre
            );

            formData.append(
                'descripcion',
                descripcion
            );

            formData.append(
                'precio',
                precio
            );

            formData.append(
                'stock',
                stock
            );

            formData.append(
                'categoria',
                categoria
            );

            formData.append(
                'talla',
                talla
            );

            formData.append(
            'destacado',
             destacado ? 1 : 0
            );

            if (
                imagen &&
                !imagen.startsWith('http')
            ) {

                formData.append(
                    'imagen',
                    {
                        uri: imagen,
                        name:
                        'producto.jpg',
                        type:
                        'image/jpeg'
                    }
                );

            } else {

                formData.append(
                    'imagen',
                    imagen
                );

            }

            const respuesta =
            await fetch(
                `${API_URL}/productos/${producto.id}`,
                {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Content-Type':
                        'multipart/form-data'
                    }
                }
            );

            if (respuesta.ok) {

                Alert.alert(
                    'Correcto',
                    'Producto actualizado'
                );

                navigation.goBack();

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <ScrollView
            style={styles.container}
        >

            <Text style={styles.titulo}>
                Editar Producto
            </Text>

            <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                placeholder="Descripción"
                style={styles.input}
                value={descripcion}
                onChangeText={
                    setDescripcion
                }
            />

            <TextInput
                placeholder="Precio"
                style={styles.input}
                value={precio}
                onChangeText={setPrecio}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="Stock"
                style={styles.input}
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
            />

            <TextInput
                placeholder="Categoría"
                style={styles.input}
                value={categoria}
                onChangeText={
                    setCategoria
                }
            />

            <TextInput
                placeholder="Talla"
                style={styles.input}
                value={talla}
                onChangeText={setTalla}
            />

            {imagen && (

                <Image
                    source={{
                        uri: imagen
                    }}
                    style={styles.imagen}
                />

            )}

            <TouchableOpacity
                style={styles.botonImagen}
                onPress={
                    seleccionarImagen
                }
            >

                <Text
                    style={
                        styles.textoBoton
                    }
                >
                    Seleccionar Imagen
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botonImagen}
                onPress={tomarFoto}
            >

                <Text
                    style={
                        styles.textoBoton
                    }
                >
                    Tomar Foto
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.destacado,
                    destacado &&
                    styles.destacadoActivo
                ]}
                onPress={() =>
                    setDestacado(
                        !destacado
                    )
                }
            >

                <Text
                    style={
                        styles.textoDestacado
                    }
                >

                    {destacado
                    ? 'Producto Destacado'
                    : 'Marcar como Destacado'}

                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botonGuardar}
                onPress={
                    editarProducto
                }
            >

                <Text
                    style={
                        styles.textoBoton
                    }
                >
                    Guardar Cambios
                </Text>

            </TouchableOpacity>

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        paddingTop: 50
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },

    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15
    },

    imagen: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginBottom: 15
    },

    botonImagen: {
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15
    },

    botonGuardar: {
        backgroundColor: 'black',
        padding: 18,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 50
    },

    textoBoton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    destacado: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 10
    },

    destacadoActivo: {
        backgroundColor: 'green'
    },

    textoDestacado: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }

});