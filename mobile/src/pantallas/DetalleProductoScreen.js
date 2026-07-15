import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../servicios/api';

export default function DetalleProductoScreen({ route, navigation }) {
  const { producto } = route.params;
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = async () => {
    try {
      const usuario = JSON.parse(await AsyncStorage.getItem('usuario'));

      if (!usuario) {
        Alert.alert(
          'Inicia sesión',
          'Debes iniciar sesión para agregar productos al carrito.',
          [
            {
              text: 'Cancelar',
              style: 'cancel'
            },
            {
              text: 'Iniciar sesión',
              onPress: () => navigation.navigate('Login', { 
                destino: 'carrito', 
                producto, 
                cantidad 
              })
            }
          ]
        );
        return;
      }

      const respuesta = await fetch(`${API_URL}/carrito`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          usuario_id: usuario.id, 
          producto_id: producto.id, 
          cantidad 
        })
      });
      const data = await respuesta.json();
      Alert.alert('Correcto', data.mensaje);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>S/ {producto.precio}</Text>
        <Text style={styles.categoria}>Categoría: {producto.categoria}</Text>
        <Text style={styles.talla}>Talla: {producto.talla}</Text>
        <Text style={styles.stock}>Stock: {producto.stock}</Text>
        
        <Text style={styles.titulo}>Descripción</Text>
        <Text style={styles.descripcion}>{producto.descripcion}</Text>
        
        <Text style={styles.label}>Cantidad</Text>
        <View style={styles.cantidadContainer}>
          <TouchableOpacity 
            style={styles.botonCantidad} 
            onPress={() => { 
              if (cantidad > 1) { 
                setCantidad(cantidad - 1); 
              } 
            }}
          >
            <Text style={styles.textoCantidad}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.numeroCantidad}>{cantidad}</Text>
          
          <TouchableOpacity 
            style={styles.botonCantidad} 
            onPress={() => { 
              if (cantidad < producto.stock) { 
                setCantidad(cantidad + 1); 
              } 
            }}
          >
            <Text style={styles.textoCantidad}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.boton} onPress={agregarAlCarrito}>
          <Text style={styles.textoBoton}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imagen: { width: '100%', height: 350 },
  info: { padding: 20 },
  nombre: { fontSize: 28, fontWeight: 'bold' },
  precio: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  categoria: { fontSize: 16, color: 'gray', marginTop: 15 },
  talla: { fontSize: 16, marginTop: 10 },
  stock: { fontSize: 16, marginTop: 10, color: 'green' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginTop: 25, marginBottom: 10 },
  descripcion: { fontSize: 16, lineHeight: 24, color: '#444' },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  cantidadContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  botonCantidad: { backgroundColor: 'black', width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  textoCantidad: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  numeroCantidad: { fontSize: 22, fontWeight: 'bold', marginHorizontal: 20 },
  boton: { backgroundColor: 'black', padding: 18, borderRadius: 15, marginTop: 30 },
  textoBoton: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }
});