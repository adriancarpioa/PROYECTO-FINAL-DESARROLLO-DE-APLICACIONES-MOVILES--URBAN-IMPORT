import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert
} from 'react-native';

import {
    useState,
    useCallback
} from 'react';

import {
    useFocusEffect
} from '@react-navigation/native';

import {
    Ionicons
} from '@expo/vector-icons';

import API_URL from '../../servicios/api';

export default function ProductosAdminScreen({
    navigation
}) {

    const [productos, setProductos] =
    useState([]);

    useFocusEffect(
        useCallback(() => {

            obtenerProductos();

        }, [])
    );

    const obtenerProductos = async () => {

        try {

            const respuesta = await fetch(
                `${API_URL}/productos`
            );

            const data =
            await respuesta.json();

            setProductos(data);

        } catch (error) {

            console.log(error);

        }

    };

    const eliminarProducto = async (id) => {

        Alert.alert(
            'Eliminar',
            '¿Deseas eliminar este producto?',
            [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {

                        try {

                            await fetch(
                                `${API_URL}/productos/${id}`,
                                {
                                    method: 'DELETE'
                                }
                            );

                            obtenerProductos();

                        } catch (error) {

                            console.log(error);

                        }

                    }
                }
            ]
        );

    };

    const renderItem = ({ item }) => (

        <View style={styles.card}>

            <Image
                source={{
                    uri: item.imagen
                }}
                style={styles.imagen}
            />

            <View style={styles.info}>

                <Text style={styles.nombre}>
                    {item.nombre}
                </Text>

                <Text style={styles.categoria}>
                    {item.categoria}
                </Text>

                <Text style={styles.precio}>
                    S/ {item.precio}
                </Text>

                <Text style={styles.stock}>
                    Stock: {item.stock}
                </Text>

                {
                    item.destacado == 1 &&
                    (
                        <View
                            style={
                                styles.badge
                            }
                        >

                            <Text
                                style={
                                    styles.textoBadge
                                }
                            >
                                DESTACADO
                            </Text>

                        </View>
                    )
                }

            </View>

            <View style={styles.botones}>

                <TouchableOpacity
                    style={
                        styles.botonEditar
                    }
                    onPress={() =>
                        navigation.navigate(
                            'EditarProducto',
                            {
                                producto: item
                            }
                        )
                    }
                >

                    <Ionicons
                        name="create-outline"
                        size={22}
                        color="black"
                    />

                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        styles.botonEliminar
                    }
                    onPress={() =>
                        eliminarProducto(
                            item.id
                        )
                    }
                >

                    <Ionicons
                        name="trash-outline"
                        size={22}
                        color="red"
                    />

                </TouchableOpacity>

            </View>

        </View>

    );

    return (

        <View style={styles.container}>

            <View style={styles.header}>

            
                <TouchableOpacity
                    style={
                        styles.botonAgregar
                    }
                    onPress={() =>
                        navigation.navigate(
                            'CrearProducto'
                        )
                    }
                >

                    <Ionicons
                        name="add"
                        size={28}
                        color="white"
                    />

                </TouchableOpacity>

            </View>

            <FlatList
                data={productos}
                renderItem={renderItem}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                showsVerticalScrollIndicator={
                    false
                }
            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 15,
        paddingTop: 50
    },

    header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%'
},

    titulo: {
        fontSize: 30,
        fontWeight: 'bold'
    },

    botonAgregar: {
        backgroundColor: 'black',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        elevation: 3
    },

    imagen: {
        width: 90,
        height: 90,
        borderRadius: 10
    },

    info: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },

    nombre: {
        fontWeight: 'bold',
        fontSize: 16
    },

    categoria: {
        color: 'gray',
        marginTop: 5
    },

    precio: {
        fontWeight: 'bold',
        marginTop: 5
    },

    stock: {
        color: 'green',
        marginTop: 5
    },

    botones: {
        justifyContent:
        'space-between'
    },

    botonEditar: {
        padding: 5
    },

    botonEliminar: {
        padding: 5
    },

    badge: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 8
    },

    textoBadge: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    }

});