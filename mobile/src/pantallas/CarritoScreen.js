import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../servicios/api';

export default function CarritoScreen({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      obtenerCarrito();
    }, [])
  );

  const obtenerCarrito = async () => {
    try {
      const usuario = JSON.parse(await AsyncStorage.getItem('usuario'));
      
  

      const respuesta = await fetch(`${API_URL}/carrito/${usuario.id}`);
      const data = await respuesta.json();
      
      setProductos(data);
      
      let suma = 0;
      data.forEach((item) => {
        suma += item.precio * item.cantidad;
      });
      setTotal(suma);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await fetch(`${API_URL}/carrito/${id}`, { 
        method: 'DELETE' 
      });
      obtenerCarrito();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>S/ {item.precio}</Text>
        <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.subtotal}>Subtotal: S/ {item.precio * item.cantidad}</Text>
      </View>
      <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarProducto(item.id)}>
        <Text style={styles.textoEliminar}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi carrito</Text>
      <FlatList 
        data={productos} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id.toString()} 
        showsVerticalScrollIndicator={false} 
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: S/ {total}</Text>
        <TouchableOpacity style={styles.botonComprar} onPress={() => navigation.navigate('Compra')}>
          <Text style={styles.textoComprar}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15, paddingTop: 50 },
  titulo: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: 'white', borderRadius: 15, padding: 10, marginBottom: 15, flexDirection: 'row', elevation: 3 },
  imagen: { width: 100, height: 100, borderRadius: 10 },
  info: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  nombre: { fontWeight: 'bold', fontSize: 16 },
  precio: { marginTop: 5, fontWeight: 'bold' },
  cantidad: { marginTop: 5 },
  subtotal: { marginTop: 5, color: 'green', fontWeight: 'bold' },
  botonEliminar: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 },
  textoEliminar: { color: 'red', fontSize: 22, fontWeight: 'bold' },
  footer: { backgroundColor: 'white', padding: 20, borderRadius: 15, marginTop: 10 },
  total: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  botonComprar: { backgroundColor: 'black', padding: 15, borderRadius: 12 },
  textoComprar: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
});