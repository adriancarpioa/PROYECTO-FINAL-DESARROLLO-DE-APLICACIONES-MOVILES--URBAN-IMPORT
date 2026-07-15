import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

import {
    useEffect,
    useState
} from 'react';

import {
    Ionicons
} from '@expo/vector-icons';

import API_URL from '../../servicios/api';

export default function UsuariosAdminScreen() {

    const [usuarios, setUsuarios] =
        useState([]);

    useEffect(() => {

        obtenerUsuarios();

    }, []);

    const obtenerUsuarios = async () => {

        try {

            const respuesta = await fetch(
                `${API_URL}/usuarios`
            );

            const data = await respuesta.json();

            setUsuarios(data);

        } catch (error) {

            console.log(error);

        }

    };

    const eliminarUsuario = async (id) => {

        Alert.alert(
            'Eliminar',
            '¿Eliminar usuario?',
            [
                {
                    text: 'Cancelar'
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {

                        try {

                            await fetch(
                                `${API_URL}/usuarios/${id}`,
                                {
                                    method: 'DELETE'
                                }
                            );

                            obtenerUsuarios();

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

            <View style={styles.icono}>

                <Ionicons
                    name="person"
                    size={28}
                    color="white"
                />

            </View>

            <View style={styles.info}>

                <Text style={styles.nombre}>
                    {item.nombre}
                </Text>

                <Text style={styles.correo}>
                    {item.correo}
                </Text>

                <Text style={styles.rol}>
                    {item.rol}
                </Text>

            </View>

            <TouchableOpacity
                onPress={() =>
                    eliminarUsuario(item.id)
                }
            >

                <Ionicons
                    name="trash"
                    size={24}
                    color="red"
                />

            </TouchableOpacity>

        </View>

    );

    return (

        <View style={styles.container}>

          

            <FlatList
                data={usuarios}
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
        backgroundColor: '#f5f5f5',
        padding: 15,
        paddingTop: 50
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },

    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },

    icono: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },

    info: {
        flex: 1,
        marginLeft: 15
    },

    nombre: {
        fontWeight: 'bold',
        fontSize: 16
    },

    correo: {
        color: 'gray',
        marginTop: 5
    },

    rol: {
        marginTop: 5,
        color: 'green'
    }

});