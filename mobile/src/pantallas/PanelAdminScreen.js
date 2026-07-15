import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert
} from 'react-native';

import {
    useEffect,
    useState
} from 'react';

import API_URL from '../servicios/api';

export default function PanelAdminScreen() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {

        obtenerProductos();

    }, []);

    const obtenerProductos = async () => {

        const respuesta = await fetch(
            `${API_URL}/productos`
        );

        const data = await respuesta.json();

        setProductos(data);

    };

    const eliminarProducto = async (id) => {

        try {

            await fetch(
                `${API_URL}/productos/${id}`,
                {
                    method: 'DELETE'
                }
            );

            Alert.alert(
                'Producto eliminado'
            );

            obtenerProductos();

        } catch (error) {

            console.log(error);

        }

    };

    const renderItem = ({ item }) => (

        <View style={styles.card}>

            <Image
                source={{ uri: item.imagen }}
                style={styles.imagen}
            />

            <Text style={styles.nombre}>
                {item.nombre}
            </Text>

            <Text>
                Stock: {item.stock}
            </Text>

            <TouchableOpacity
                style={styles.botonEliminar}
                onPress={() =>
                    eliminarProducto(item.id)
                }
            >

                <Text style={styles.textoBoton}>
                    Eliminar
                </Text>

            </TouchableOpacity>

        </View>

    );

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Panel Admin
            </Text>

            <FlatList
                data={productos}
                renderItem={renderItem}
                keyExtractor={(item) =>
                    item.id.toString()
                }
            />

        </View>

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

    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginBottom: 15
    },

    imagen: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },

    nombre: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
    },

    botonEliminar: {
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 10,
        marginTop: 10
    },

    textoBoton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }

});
