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

import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

import API_URL from '../../servicios/api';

export default function CrearProductoScreen({ navigation }) {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState('');
    const [talla, setTalla] = useState('');
    const [imagen, setImagen] = useState(null);
    const [destacado, setDestacado] = useState(false);

    const abrirGaleria = async () => {

        const permiso =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permiso.granted) {

            Alert.alert(
                'Permiso requerido',
                'Debes permitir acceso a la galería'
            );

            return;

        }

        const resultado =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes:
                    ImagePicker.MediaTypeOptions.Images,
                quality: 1
            });

        if (!resultado.canceled) {

            setImagen(resultado.assets[0]);

        }

    };

    const abrirCamara = async () => {

        const permiso =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permiso.granted) {

            Alert.alert(
                'Permiso requerido',
                'Debes permitir acceso a la cámara'
            );

            return;

        }

        const resultado =
            await ImagePicker.launchCameraAsync({
                quality: 1
            });

        if (!resultado.canceled) {

            setImagen(resultado.assets[0]);

        }

    };

    const crearProducto = async () => {

        try {

            const formData = new FormData();

            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            formData.append('stock', stock);
            formData.append('categoria', categoria);
            formData.append('talla', talla);
            formData.append(
                'destacado',
                destacado ? 1 : 0
            );

            if (imagen) {

                formData.append('imagen', {
                    uri: imagen.uri,
                    type: 'image/jpeg',
                    name: 'producto.jpg'
                });

            }

            const respuesta = await fetch(
                `${API_URL}/productos`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (respuesta.ok) {

                Alert.alert(
                    'Correcto',
                    'Producto creado'
                );

                navigation.goBack();

            } else {

                Alert.alert(
                    'Error',
                    'No se pudo crear'
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <Text style={styles.titulo}>
                Crear Producto
            </Text>

            <TextInput
                placeholder="Nombre"
                placeholderTextColor="#888"
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                placeholder="Descripción"
                placeholderTextColor="#888"
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <TextInput
                placeholder="Precio"
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="numeric"
                value={precio}
                onChangeText={setPrecio}
            />

            <TextInput
                placeholder="Stock"
                style={styles.input}
                keyboardType="numeric"
                value={stock}
                onChangeText={setStock}
            />

            <TextInput
                placeholder="Categoría"
                style={styles.input}
                value={categoria}
                onChangeText={setCategoria}
            />

            <TextInput
                placeholder="Talla"
                style={styles.input}
                value={talla}
                onChangeText={setTalla}
            />

            <TouchableOpacity
                style={styles.botonImagen}
                onPress={abrirGaleria}
            >

                <Text style={styles.textoBoton}>
                    Seleccionar Imagen
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botonCamara}
                onPress={abrirCamara}
            >

                <Text style={styles.textoBoton}>
                    Tomar Foto
                </Text>

            </TouchableOpacity>

            {imagen && (

                <Image
                    source={{ uri: imagen.uri }}
                    style={styles.preview}
                />

            )}

            <TouchableOpacity
                style={
                    destacado
                        ? styles.botonActivo
                        : styles.botonDestacado
                }
                onPress={() =>
                    setDestacado(!destacado)
                }
            >

                <Text style={styles.textoBoton}>
                    {destacado
                        ? 'Producto Destacado'
                        : 'Marcar como Destacado'}
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.boton}
                onPress={crearProducto}
            >

                <Text style={styles.textoBoton}>
                    Guardar Producto
                </Text>

            </TouchableOpacity>

            <View style={{ height: 40 }} />

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#f5f5f5'
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },

    input: {
        backgroundColor: 'white',
        color:'#000',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15
    },

    boton: {
        backgroundColor: 'black',
        padding: 18,
        borderRadius: 10,
        marginTop: 20
    },

    botonImagen: {
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15
    },

    botonCamara: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15
    },

    botonDestacado: {
        backgroundColor: '#999',
        padding: 15,
        borderRadius: 10,
        marginTop: 10
    },

    botonActivo: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
        marginTop: 10
    },

    textoBoton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    preview: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginTop: 10
    }

});