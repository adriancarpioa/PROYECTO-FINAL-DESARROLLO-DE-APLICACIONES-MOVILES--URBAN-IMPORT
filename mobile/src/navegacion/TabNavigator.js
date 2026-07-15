import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../pantallas/HomeScreen';
import CatalogoScreen from '../pantallas/CatalogoScreen';
import CarritoScreen from '../pantallas/CarritoScreen';
import PerfilScreen from '../pantallas/PerfilScreen';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <Tab.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Catalogo"
                component={CatalogoScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="search"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Carrito"
                component={CarritoScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="cart"
                            size={size}
                            color={color}
                        />
                    )
                }}
                listeners={({ navigation }) => ({
                    tabPress: async (e) => {

                        const usuario = JSON.parse(
                            await AsyncStorage.getItem('usuario')
                        );

                        if (!usuario) {

                            e.preventDefault();

                            navigation.navigate('Login', {
                                destino: 'carrito'
                            });

                        }

                    }
                })}
            />

            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

        </Tab.Navigator>

    );

}