import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {
    useEffect,
    useState
} from 'react';

import API_URL from '../servicios/api';

export default function CatalogoScreen({
    navigation
}) {

    const [productos, setProductos] =
    useState([]);

    useEffect(() => {

        obtenerProductos();

    }, []);

    const obtenerProductos =
    async () => {

        try {

            const respuesta =
            await fetch(
                `${API_URL}/productos`
            );

            const data =
            await respuesta.json();

            setProductos(data);

        } catch (error) {

            console.log(error);

        }

    };

    const renderItem = ({ item }) => (

        <TouchableOpacity

            style={styles.card}

            onPress={() =>

                navigation.navigate(
                    'DetalleProducto',
                    {
                        producto: item
                    }
                )

            }
        >

            <Image
                source={{
                    uri: item.imagen
                }}
                style={styles.imagen}
            />

            <Text style={styles.nombre}>
                {item.nombre}
            </Text>

            <Text style={styles.categoria}>
                {item.categoria}
            </Text>

            <Text style={styles.precio}>
                S/ {item.precio}
            </Text>

        </TouchableOpacity>

    );

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Catálogo
            </Text>

            <FlatList
                data={productos}
                renderItem={renderItem}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
        paddingTop: 50
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },

    card: {
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 15,
        padding: 10,
        elevation: 5
    },

    imagen: {
        width: '100%',
        height: 150,
        borderRadius: 10
    },

    nombre: {
        fontWeight: 'bold',
        marginTop: 10
    },

    categoria: {
        color: 'gray',
        marginTop: 5
    },

    precio: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 16
    }

});