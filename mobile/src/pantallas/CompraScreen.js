import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';

import {
    useEffect,
    useState
} from 'react';

import AsyncStorage from
'@react-native-async-storage/async-storage';

import * as Location from 'expo-location';

import API_URL from
'../servicios/api';

export default function CompraScreen({
    navigation
}) {

    const [usuario, setUsuario] =
    useState(null);

    const [nombre, setNombre] =
    useState('');

    const [correo, setCorreo] =
    useState('');

    const [telefono, setTelefono] =
    useState('');

    const [direccion, setDireccion] =
    useState('');

    const [referencia, setReferencia] =
    useState('');

    const [metodoPago, setMetodoPago] =
    useState('Yape');

    const [latitud, setLatitud] =
    useState('');

    const [longitud, setLongitud] =
    useState('');

    useEffect(() => {

        cargarUsuario();

    }, []);

    const cargarUsuario = async () => {

        const datos =
        JSON.parse(
            await AsyncStorage.getItem(
                'usuario'
            )
        );

        if (datos) {

            setUsuario(datos);

            setNombre(datos.nombre);

            setCorreo(datos.correo);

        }

    };

    const obtenerUbicacion =
    async () => {

        try {

            const { status } =
            await Location
            .requestForegroundPermissionsAsync();

            if (status !== 'granted') {

                Alert.alert(
                    'Permiso denegado'
                );

                return;

            }

            const ubicacion =
            await Location
            .getCurrentPositionAsync({});

            const lat =
            ubicacion.coords.latitude;

            const lng =
            ubicacion.coords.longitude;

            setLatitud(
                lat.toString()
            );

            setLongitud(
                lng.toString()
            );

            const direccionGeo =
            await Location.reverseGeocodeAsync({

                latitude: lat,
                longitude: lng

            });

            if (direccionGeo.length > 0) {

                const lugar =
                direccionGeo[0];

                const direccionCompleta =
                    `${lugar.street || ''} ` +
                    `${lugar.streetNumber || ''}, ` +
                    `${lugar.district || ''}, ` +
                    `${lugar.city || ''}`;

                setDireccion(
                    direccionCompleta
                );

            }

            Alert.alert(
                'Correcto',
                'Ubicación obtenida'
            );

        } catch (error) {

            console.log(error);

        }

    };

    const confirmarCompra =
    async () => {

        if (
            telefono === '' ||
            direccion === ''
        ) {

            Alert.alert(
                'Completa los campos'
            );

            return;

        }

        try {

            const respuesta =
            await fetch(
                `${API_URL}/compras`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                        'application/json'
                    },

                    body: JSON.stringify({

                        usuario_id:
                        usuario.id,

                        telefono,

                        direccion,

                        referencia,

                        metodo_pago:
                        metodoPago,

                        latitud,

                        longitud

                    })

                }
            );

            const data =
            await respuesta.json();

            Alert.alert(
                'Compra realizada',
                data.mensaje
            );

           navigation.reset({
        index: 0,
         routes: [
         {
            name: 'Home'
            }
            ]
        });

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <ScrollView
            style={styles.container}
        >

            <Text style={styles.titulo}>
                Finalizar compra
            </Text>

            <TextInput
                style={styles.input}
                value={nombre}
                editable={false}
            />

            <TextInput
                style={styles.input}
                value={correo}
                editable={false}
            />

            <TextInput
                style={styles.input}
                value={telefono}
                placeholderTextColor="#888"
                onChangeText={setTelefono}
                placeholder="Teléfono"
            />

            <TextInput
                style={styles.input}
                value={direccion}
                placeholderTextColor="#888"
                onChangeText={setDireccion}
                placeholder="Dirección"
            />

            <TextInput
                style={styles.input}
                value={referencia}
                placeholderTextColor="#888"
                onChangeText={setReferencia}
                placeholder="Referencia"
            />

            <Text style={styles.label}>
                Método de pago
            </Text>

            <View style={styles.metodos}>

                <TouchableOpacity
                    style={styles.botonMetodo}
                    onPress={() =>
                        setMetodoPago('Yape')
                    }
                >
                    <Text>Yape</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botonMetodo}
                    onPress={() =>
                        setMetodoPago('Plin')
                    }
                >
                    <Text>Plin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botonMetodo}
                    onPress={() =>
                        setMetodoPago(
                            'Contra entrega'
                        )
                    }
                >
                    <Text>
                        Contra entrega
                    </Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.metodoSeleccionado}>
                Método:
                {' '}
                {metodoPago}
            </Text>

            <TouchableOpacity
                style={styles.botonUbicacion}
                onPress={obtenerUbicacion}
            >

                <Text style={styles.textoBoton}>
                    Usar mi ubicación
                </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botonComprar}
                onPress={confirmarCompra}
            >

                <Text style={styles.textoBoton}>
                    Confirmar compra
                </Text>

            </TouchableOpacity>

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        color:'#000',
        padding: 15,
        marginBottom: 15
    },

    label: {
        fontWeight: 'bold',
        marginBottom: 10
    },

    metodos: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    botonMetodo: {
        backgroundColor: '#eee',
        padding: 12,
        borderRadius: 10
    },

    metodoSeleccionado: {
        marginTop: 15,
        fontWeight: 'bold'
    },

    botonUbicacion: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        marginTop: 25
    },

    botonComprar: {
        backgroundColor: 'green',
        padding: 18,
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 50
    },

    textoBoton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }

});