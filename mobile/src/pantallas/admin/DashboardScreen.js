import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';

import {
    useEffect,
    useState
} from 'react';

import {
    useIsFocused
} from '@react-navigation/native';

import API_URL from '../../servicios/api';

export default function DashboardScreen() {

    const [resumen, setResumen] =
        useState({

            productos: 0,
            pedidos: 0,
            usuarios: 0,
            ventas: 0

        });

    const isFocused = useIsFocused();

    useEffect(() => {

        if (isFocused) {

            obtenerResumen();

        }

    }, [isFocused]);

    const obtenerResumen = async () => {

        try {

            const respuesta = await fetch(
                `${API_URL}/dashboard/resumen`
            );

            const data = await respuesta.json();

            setResumen(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.titulo}>
                Dashboard
            </Text>

            <View style={styles.tarjetas}>

                <View style={styles.card}>

                    <Text style={styles.numero}>
                        {resumen.productos}
                    </Text>

                    <Text>
                        Productos
                    </Text>

                </View>

                <View style={styles.card}>

                    <Text style={styles.numero}>
                        {resumen.pedidos}
                    </Text>

                    <Text>
                        Pedidos
                    </Text>

                </View>

                <View style={styles.card}>

                    <Text style={styles.numero}>
                        {resumen.usuarios}
                    </Text>

                    <Text>
                        Usuarios
                    </Text>

                </View>

                <View style={styles.card}>

                    <Text style={styles.numero}>
                        S/ {resumen.ventas}
                    </Text>

                    <Text>
                        Ventas
                    </Text>

                </View>

            </View>

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 15,
        paddingTop: 50,
        backgroundColor: '#f5f5f5'
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },

    tarjetas: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },

    card: {
        width: '48%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 3
    },

    numero: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5
    }

});