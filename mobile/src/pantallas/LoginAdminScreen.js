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

export default function LoginAdminScreen({ navigation }) {

    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    const loginAdmin = async () => {

        try {

            const respuesta = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        correo,
                        contraseña
                    })
                }
            );

            const data = await respuesta.json();

            if (data.usuario?.rol === 'admin') {

                navigation.navigate('PanelAdminScreen');

            } else {

                Alert.alert(
                    'No eres administrador'
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Panel Admin
            </Text>

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
                onPress={loginAdmin}
            >

                <Text style={styles.textoBoton}>
                    Ingresar
                </Text>

            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
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