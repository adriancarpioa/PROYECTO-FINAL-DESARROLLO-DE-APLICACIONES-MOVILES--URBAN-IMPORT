import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../servicios/api';

export default function LoginScreen({ navigation, route }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  // Parámetros recibidos de otras pantallas
  const destino = route?.params?.destino;
  const producto = route?.params?.producto;
  const cantidad = route?.params?.cantidad;

  const iniciarSesion = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo,
          contraseña
        })
      });

      const data = await respuesta.json();

      if (data.token) {
        await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));

        if (data.usuario.rol === 'admin') {
          navigation.replace('AdminTabs');
        } else {
          // Lógica de redirección dinámica corregida para TabNavigator
          if (destino === 'carrito' && producto) {
            await fetch(`${API_URL}/carrito`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                usuario_id: data.usuario.id,
                producto_id: producto.id,
                cantidad
              })
            });

            navigation.replace('Home', {
              screen: 'Carrito'
            });

          } else if (destino === 'carrito') {
            navigation.replace('Home', {
              screen: 'Carrito'
            });
            
          } else {
            navigation.replace('Home');
          }
        }
      } else {
        Alert.alert('Error', data.mensaje);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Urban Import</Text>
      <Text style={styles.subtitulo}>Iniciar sesión</Text>

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

      <TouchableOpacity style={styles.boton} onPress={iniciarSesion}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registro}>¿No tienes cuenta? Registrarte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: 'white'
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitulo: {
    fontSize: 22,
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 10
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
    borderRadius: 10,
    marginTop: 10
  },
  textoBoton: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  registro: {
    marginTop: 20,
    textAlign: 'center'
  }
});