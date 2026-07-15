import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../servicios/api';

export default function PerfilScreen({ navigation }) {
    const [usuario, setUsuario] = useState(null);
    const [resumen, setResumen] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        verificarUsuario();
    }, []);

    const verificarUsuario = async () => {
        const usuarioGuardado = JSON.parse(
            await AsyncStorage.getItem('usuario')
        );

        if (!usuarioGuardado) {
            setLoading(false);
            return;
        }

        cargarPerfil();
    };

    const cargarPerfil = async () => {
        try {
            const usuarioGuardado = JSON.parse(
                await AsyncStorage.getItem('usuario')
            );
            const respuesta = await fetch(
                `${API_URL}/usuarios/perfil/${usuarioGuardado.id}`
            );
            const data = await respuesta.json();
            
            setUsuario(data.usuario);
            setResumen(data.resumen);
            setPedidos(data.pedidos);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const cerrarSesion = async () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Deseas cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Sí',
                    onPress: async () => {
                        await AsyncStorage.removeItem('usuario');

    navigation.reset({
    index: 0,
    routes: [
        {
            name: 'Home'
        }
        ]
    });
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    if (!loading && !usuario) {
        return (
            <View style={[styles.loading, { padding: 20 }]}>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        marginBottom: 15
                    }}
                >
                    Mi perfil
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        marginBottom: 30,
                        color: '#666'
                    }}
                >
                    Inicia sesión para ver tus pedidos,
                    carrito y datos personales.
                </Text>

                <TouchableOpacity
                    style={styles.botonLogin}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.textoCerrar}>
                        Iniciar sesión
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botonRegistro}
                    onPress={() => navigation.navigate('Registro')}
                >
                    <Text style={styles.textoCerrar}>
                        Crear cuenta
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>Mi perfil</Text>

            {/* USUARIO */}
            <View style={styles.card}>
                <Text style={styles.nombre}>{usuario?.nombre}</Text>
                <Text style={styles.correo}>{usuario?.correo}</Text>
                <Text style={styles.fecha}>
                    Miembro desde: {' '}
                    {new Date(usuario?.fecha_creacion).toLocaleDateString()}
                </Text>
            </View>

            {/* RESUMEN */}
            <Text style={styles.subtitulo}>Resumen</Text>
            <View style={styles.resumenContainer}>
                <View style={styles.resumenCard}>
                    <Text style={styles.numero}>{resumen?.pedidos}</Text>
                    <Text style={styles.label}>Pedidos</Text>
                </View>

                <View style={styles.resumenCard}>
                    <Text style={styles.numero}>S/ {resumen?.totalGastado}</Text>
                    <Text style={styles.label}>Total gastado</Text>
                </View>
            </View>

            {/* PEDIDOS */}
            <Text style={styles.subtitulo}>Mis pedidos</Text>
            {pedidos.length === 0 ? (
                <Text style={styles.vacio}>No tienes pedidos</Text>
            ) : (
                pedidos.map((item) => (
                    <View key={item.id} style={styles.pedido}>
                        <View style={styles.row}>
                            <Text style={styles.id}>Pedido #{item.id}</Text>
                            <Text
                                style={[
                                    styles.estado,
                                    item.estado === 'Pendiente' && styles.pendiente,
                                    item.estado === 'Preparando' && styles.preparando,
                                    item.estado === 'Enviado' && styles.enviado,
                                    item.estado === 'Entregado' && styles.entregado
                                ]}
                            >
                                {item.estado}
                            </Text>
                        </View>
                        <Text style={styles.total}>Total: S/ {item.total}</Text>
                        <Text style={styles.fechaPedido}>
                            {new Date(item.fecha_compra).toLocaleDateString()}
                        </Text>
                    </View>
                ))
            )}

            {/* BOTON */}
            <TouchableOpacity style={styles.botonCerrar} onPress={cerrarSesion}>
                <Text style={styles.textoCerrar}>Cerrar sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        paddingTop: 50
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        elevation: 4
    },
    nombre: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    correo: {
        marginTop: 8,
        fontSize: 16,
        color: 'gray'
    },
    fecha: {
        marginTop: 10,
        color: '#666'
    },
    subtitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15
    },
    resumenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    resumenCard: {
        backgroundColor: 'white',
        width: '48%',
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        elevation: 4
    },
    numero: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    label: {
        marginTop: 8,
        color: 'gray'
    },
    pedido: {
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 18,
        marginBottom: 15,
        elevation: 3
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    id: {
        fontWeight: 'bold',
        fontSize: 17
    },
    estado: {
        fontWeight: 'bold'
    },
    pendiente: {
        color: 'orange'
    },
    preparando: {
        color: 'blue'
    },
    enviado: {
        color: 'purple'
    },
    entregado: {
        color: 'green'
    },
    total: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    fechaPedido: {
        marginTop: 8,
        color: 'gray'
    },
    vacio: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        textAlign: 'center'
    },
    botonCerrar: {
        backgroundColor: 'red',
        padding: 18,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 50
    },
    textoCerrar: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    botonLogin: {
        backgroundColor: 'black',
        padding: 18,
        borderRadius: 15,
        width: '100%',
        marginBottom: 15
    },
    botonRegistro: {
        backgroundColor: '#444',
        padding: 18,
        borderRadius: 15,
        width: '100%'
    }
});