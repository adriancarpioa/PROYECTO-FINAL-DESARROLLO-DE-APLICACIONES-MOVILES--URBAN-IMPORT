import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList
} from 'react-native';

import {
    useEffect,
    useState
} from 'react';

import API_URL from '../servicios/api';

export default function HomeScreen({
    navigation
}) {

    const [destacados, setDestacados] =
        useState([]);

    const [categorias, setCategorias] =
        useState([]);

    const [productosCategoria,
        setProductosCategoria] =
        useState([]);

    const [tituloCategoria,
        setTituloCategoria] =
        useState('');

    const [busqueda, setBusqueda] =
        useState('');

    const [modoBusqueda, setModoBusqueda] =
        useState(false);

    useEffect(() => {

        obtenerDestacados();
        obtenerCategorias();

    }, []);

    const obtenerDestacados = async () => {

        try {

            const respuesta = await fetch(
                `${API_URL}/productos/destacados`
            );

            const data = await respuesta.json();

            setDestacados(data);

        } catch (error) {

            console.log(error);

        }

    };

    const obtenerCategorias = async () => {

        try {

            const respuesta = await fetch(
                `${API_URL}/productos/categorias`
            );

            const data = await respuesta.json();

            setCategorias(data);

        } catch (error) {

            console.log(error);

        }

    };

    const filtrarCategoria = async (
        categoria
    ) => {

        try {

            setTituloCategoria(categoria);

            const respuesta = await fetch(
                `${API_URL}/productos/categoria/${categoria}`
            );

            const data = await respuesta.json();

            setProductosCategoria(data);

        } catch (error) {

            console.log(error);

        }

    };

    const buscarProductos = async (
        texto
    ) => {

        setBusqueda(texto);

        if (texto.trim() === '') {

            setModoBusqueda(false);
            setProductosCategoria([]);
            setTituloCategoria('');
            return;

        }

        setModoBusqueda(true);

        try {

            const respuesta = await fetch(
                `${API_URL}/productos/buscar/${texto}`
            );

            const data = await respuesta.json();

            setTituloCategoria(
                'Resultados'
            );

            setProductosCategoria(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.logo}>
                URBAN IMPORT
            </Text>

            <TextInput
                placeholder="Buscar zapatillas..."
                style={styles.buscador}
                value={busqueda}
                onChangeText={buscarProductos}
            />

            {!modoBusqueda && (

                <>

                    {/* DESTACADOS */}

                    <Text style={styles.titulo}>
                        DESTACADOS
                    </Text>

                    <FlatList
                        horizontal
                        data={destacados}
                        keyExtractor={(item) =>
                            item.id.toString()
                        }
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (

                            <TouchableOpacity
                                style={styles.cardDestacado}
                                onPress={() =>
                                    navigation.navigate(
                                        'DetalleProducto',
                                        {
                                            producto: item
                                        }
                                    )
                                }
                            >

                                <Image
                                    source={{
                                        uri: item.imagen
                                    }}
                                    style={styles.imagen}
                                />

                                <View style={styles.info}>

                                    <Text style={styles.nombre}>
                                        {item.nombre}
                                    </Text>

                                    <Text style={styles.precio}>
                                        S/ {item.precio}
                                    </Text>

                                </View>

                            </TouchableOpacity>

                        )}
                    />

                    {/* CATEGORIAS */}

                    <Text style={styles.titulo}>
                        CATEGORÍAS
                    </Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollCategorias}
                    >

                        {categorias.map((item, index) => (

                            <TouchableOpacity
                                key={index}
                                style={styles.categoria}
                                onPress={() =>
                                    filtrarCategoria(
                                        item.categoria
                                    )
                                }
                            >

                                <Text
                                    style={
                                        styles.textoCategoria
                                    }
                                >
                                    {item.categoria}
                                </Text>

                            </TouchableOpacity>

                        ))}

                    </ScrollView>

                </>

            )}

            {/* PRODUCTOS */}

            {productosCategoria.length > 0 && (

                <>

                    <Text style={styles.titulo}>
                        {tituloCategoria}
                    </Text>

                    <View
                        style={styles.listaProductos}
                    >

                        {productosCategoria.map(
                            (item) => (

                            <TouchableOpacity
                                key={item.id}
                                style={styles.cardProducto}
                                onPress={() =>
                                    navigation.navigate(
                                        'DetalleProducto',
                                        {
                                            producto: item
                                        }
                                    )
                                }
                            >

                                <Image
                                    source={{
                                        uri:
                                        item.imagen
                                    }}
                                    style={
                                        styles.imagenProducto
                                    }
                                />

                                <View
                                    style={styles.info}
                                >

                                    <Text
                                        style={
                                            styles.nombre
                                        }
                                    >
                                        {item.nombre}
                                    </Text>

                                    <Text
                                        style={
                                            styles.precio
                                        }
                                    >
                                        S/ {item.precio}
                                    </Text>

                                </View>

                            </TouchableOpacity>

                        ))}

                    </View>

                </>

            )}

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50
    },

    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 20
    },

    buscador: {
        backgroundColor: '#f2f2f2',
        marginHorizontal: 20,
        padding: 15,
        borderRadius: 12,
        marginBottom: 25
    },

    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 15,
        marginTop: 10
    },

    cardDestacado: {
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginLeft: 20,
        marginBottom: 20,
        elevation: 5,
        overflow: 'hidden'
    },

    imagen: {
        width: '100%',
        height: 220
    },

    info: {
        padding: 15
    },

    nombre: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    precio: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: 'bold'
    },

    scrollCategorias: {
        paddingLeft: 20,
        marginBottom: 20
    },

    categoria: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        marginRight: 10
    },

    textoCategoria: {
        color: '#fff',
        fontWeight: 'bold'
    },

    listaProductos: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },

    cardProducto: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 5
    },

    imagenProducto: {
        width: '100%',
        height: 220
    }

});