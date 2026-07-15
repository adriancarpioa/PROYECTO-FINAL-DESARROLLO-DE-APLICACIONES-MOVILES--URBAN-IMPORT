import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

import { useState } from 'react';

import API_URL from '../servicios/api';

export default function RegistroScreen({ navigation }) {

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    const registrarse = async () => {

        try {

            const respuesta = await fetch(
                `${API_URL}/auth/registro`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre,
                        correo,
                        contraseña
                    })
                }
            );

            const data = await respuesta.json();

            Alert.alert(data.mensaje);

            navigation.navigate('Login');

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Crear cuenta
            </Text>

            <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                placeholder="Correo"
                style={styles.input}
                value={correo}
                onChangeText={setCorreo}
            />

            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                style={styles.input}
                value={contraseña}
                onChangeText={setContraseña}
            />

            <TouchableOpacity
                style={styles.boton}
                onPress={registrarse}
            >

                <Text style={styles.textoBoton}>
                    Registrarse
                </Text>

            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white'
    },

    titulo: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center'
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15
    },

    boton: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10
    },

    textoBoton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }

});