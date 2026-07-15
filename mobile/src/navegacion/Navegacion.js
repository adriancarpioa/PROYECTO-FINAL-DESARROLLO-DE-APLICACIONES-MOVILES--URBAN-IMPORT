import { NavigationContainer }
from '@react-navigation/native';

import {
    createNativeStackNavigator
} from '@react-navigation/native-stack';

import AdminTabs from './AdminTabs';

import RegistroScreen
from '../pantallas/RegistroScreen';

import PanelAdminScreen
from '../pantallas/PanelAdminScreen';

import TabNavigator
from './TabNavigator';

import CrearProductoScreen
from '../pantallas/admin/CrearProductoScreen';

import UsuariosAdminScreen
from '../pantallas/admin/UsuariosAdminScreen';

import EditarProductoScreen
from '../pantallas/admin/EditarProductoScreen';

import LoginScreen
from '../pantallas/LoginScreen';

import HomeScreen
from '../pantallas/HomeScreen';

import DetalleProductoScreen
from '../pantallas/DetalleProductoScreen';

import CompraScreen
from '../pantallas/CompraScreen';

const Stack =
createNativeStackNavigator();

export default function Navegacion() {

    return (

        <NavigationContainer>

            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen
                    name="Home"
                    component={TabNavigator}
                    options={{
                      headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Login"
                  component={LoginScreen}
                    />

                <Stack.Screen
                    name="Registro"
                    component={RegistroScreen}
                />

                <Stack.Screen
                    name="PanelAdmin"
                    component={PanelAdminScreen}
                />

                <Stack.Screen
                    name="AdminTabs"
                    component={AdminTabs}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="CrearProducto"
                    component={
                        CrearProductoScreen
                    }
                />

                <Stack.Screen
                    name="EditarProducto"
                    component={
                        EditarProductoScreen
                    }
                />

                <Stack.Screen
                    name="UsuariosAdmin"
                    component={
                        UsuariosAdminScreen
                    }
                />

                <Stack.Screen
                    name="DetalleProducto"
                    component={
                        DetalleProductoScreen
                    }
                    options={{
                        title:
                        'Detalle del producto'
                    }}
                />

                <Stack.Screen
                    name="Compra"
                    component={CompraScreen}
                />

            </Stack.Navigator>

        </NavigationContainer>

    );

}