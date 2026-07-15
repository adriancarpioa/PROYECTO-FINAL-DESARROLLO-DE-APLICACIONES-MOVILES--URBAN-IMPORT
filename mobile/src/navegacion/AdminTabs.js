import { createBottomTabNavigator }
from '@react-navigation/bottom-tabs';

import DashboardScreen
from '../pantallas/admin/DashboardScreen';

import ProductosAdminScreen
from '../pantallas/admin/ProductosAdminScreen';

import PedidosAdminScreen
from '../pantallas/admin/PedidosAdminScreen';

import UsuariosAdminScreen
from '../pantallas/admin/UsuariosAdminScreen';

import {
    Ionicons
} from '@expo/vector-icons';

import {
    TouchableOpacity,
    Alert
} from 'react-native';

import AsyncStorage from
'@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function AdminTabs({
    navigation
}) {

    const cerrarSesion =
    async () => {

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

                        await AsyncStorage.removeItem(
                            'usuario'
                        );

                        navigation.reset({

                            index: 0,

                            routes: [
                                {
                                    name: 'Login'
                                }
                            ]

                        });

                    }

                }

            ]

        );

    };

    return (

        <Tab.Navigator

            screenOptions={{

                headerShown: true,

                headerRight: () => (

                    <TouchableOpacity
                        onPress={cerrarSesion}
                        style={{
                            marginRight: 15
                        }}
                    >

                        <Ionicons
                            name="log-out-outline"
                            size={28}
                            color="red"
                        />

                    </TouchableOpacity>

                )

            }}

        >

            <Tab.Screen

                name="Dashboard"

                component={DashboardScreen}

                options={{

                    tabBarIcon:
                    ({ color, size }) => (

                        <Ionicons
                            name="grid"
                            size={size}
                            color={color}
                        />

                    )

                }}

            />

            <Tab.Screen

                name="Productos"

                component={ProductosAdminScreen}

                options={{

                    tabBarIcon:
                    ({ color, size }) => (

                        <Ionicons
                            name="cube"
                            size={size}
                            color={color}
                        />

                    )

                }}

            />

            <Tab.Screen

                name="Pedidos"

                component={PedidosAdminScreen}

                options={{

                    tabBarIcon:
                    ({ color, size }) => (

                        <Ionicons
                            name="receipt"
                            size={size}
                            color={color}
                        />

                    )

                }}

            />

            <Tab.Screen

                name="Usuarios"

                component={UsuariosAdminScreen}

                options={{

                    tabBarIcon:
                    ({ color, size }) => (

                        <Ionicons
                            name="people"
                            size={size}
                            color={color}
                        />

                    )

                }}

            />

        </Tab.Navigator>

    );

}