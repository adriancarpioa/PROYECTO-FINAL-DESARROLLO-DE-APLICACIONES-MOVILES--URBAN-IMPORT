import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native';

import {
    useState,
    useCallback
} from 'react';

import {
    useFocusEffect
} from '@react-navigation/native';

import API_URL from
'../../servicios/api';

export default function PedidosAdminScreen() {

    const [pedidos, setPedidos] =
    useState([]);

    const [loading, setLoading] =
    useState(true);

    useFocusEffect(

        useCallback(() => {

            obtenerPedidos();

        }, [])

    );

    const obtenerPedidos =
    async () => {

        try {

            setLoading(true);

            const respuesta =
            await fetch(
                `${API_URL}/compras`
            );

            const data =
            await respuesta.json();

            setPedidos(data);

            setLoading(false);

        } catch (error) {

            console.log(error);

            setLoading(false);

        }

    };

    const cambiarEstado =
    async (id, estadoActual) => {

        let nuevoEstado = '';

        if (estadoActual === 'Pendiente') {

            nuevoEstado = 'Preparando';

        } else if (
            estadoActual === 'Preparando'
        ) {

            nuevoEstado = 'Enviado';

        } else if (
            estadoActual === 'Enviado'
        ) {

            nuevoEstado = 'Entregado';

        } else {

            Alert.alert(
                'El pedido ya fue entregado'
            );

            return;

        }

        try {

            await fetch(
                `${API_URL}/compras/${id}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                        'application/json'
                    },

                    body: JSON.stringify({
                        estado: nuevoEstado
                    })

                }
            );

            obtenerPedidos();

            Alert.alert(
                'Correcto',
                `Estado cambiado a ${nuevoEstado}`
            );

        } catch (error) {

            console.log(error);

        }

    };

    const renderItem =
    ({ item }) => (

        <View style={styles.card}>

            <View style={styles.header}>

                <Text style={styles.id}>
                    Pedido #{item.id}
                </Text>

                <Text
                    style={[

                        styles.estado,

                        item.estado ===
                        'Pendiente'
                        && styles.pendiente,

                        item.estado ===
                        'Preparando'
                        && styles.preparando,

                        item.estado ===
                        'Enviado'
                        && styles.enviado,

                        item.estado ===
                        'Entregado'
                        && styles.entregado

                    ]}
                >
                    {item.estado}
                </Text>

            </View>

            <Text style={styles.texto}>
                Cliente:
                {' '}
                {item.nombre}
            </Text>

            <Text style={styles.texto}>
                Correo:
                {' '}
                {item.correo}
            </Text>

            <Text style={styles.texto}>
                Teléfono:
                {' '}
                {item.telefono}
            </Text>

            <Text style={styles.texto}>
                Dirección:
                {' '}
                {item.direccion}
            </Text>

            <Text style={styles.texto}>
                Referencia:
                {' '}
                {item.referencia}
            </Text>

            <Text style={styles.texto}>
                Método de pago:
                {' '}
                {item.metodo_pago}
            </Text>

            <Text style={styles.total}>
                Total:
                {' '}
                S/ {item.total}
            </Text>

            <TouchableOpacity
                style={styles.boton}
                onPress={() =>
                    cambiarEstado(
                        item.id,
                        item.estado
                    )
                }
            >

                <Text style={styles.textoBoton}>
                    Cambiar estado
                </Text>

            </TouchableOpacity>

        </View>

    );

    if (loading) {

        return (

            <View style={styles.loading}>

                <ActivityIndicator
                    size="large"
                    color="black"
                />

            </View>

        );

    }

    return (

        <View style={styles.container}>

            <FlatList
                data={pedidos}
                renderItem={renderItem}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={

                    <Text style={styles.vacio}>
                        No hay pedidos
                    </Text>

                }
            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 15
    },

    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        elevation: 3
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },

    id: {
        fontSize: 18,
        fontWeight: 'bold'
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

    texto: {
        marginBottom: 6
    },

    total: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

    boton: {
        backgroundColor: 'black',
        padding: 14,
        borderRadius: 10,
        marginTop: 15
    },

    textoBoton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    vacio: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18
    }

});