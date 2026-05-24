import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        const userStorage = await AsyncStorage.getItem('user');

        if(userStorage) {

            setUser(
                JSON.parse(userStorage)
            );
        }
    };

    const logout = async () => {

        await AsyncStorage.removeItem('token');

        await AsyncStorage.removeItem('user');

        Alert.alert(
            'Correcto',
            'Sesión cerrada'
        );

        navigation.replace('Login' as never);
    };

    return (

        <ScrollView
            style={{
                flex: 1,
                backgroundColor: '#fff',
            }}
            contentContainerStyle={{
                padding: 20,
            }}
        >

            <Text
                style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginBottom: 5,
                }}
            >
                SIC
            </Text>

            <Text
                style={{
                    fontSize: 18,
                    marginBottom: 20,
                }}
            >
                Bienvenido {
                    user?.user_name
                }
            </Text>

            {/* Acciones rápidas */}

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate(
                        'Clients' as never
                    )
                }
                style={{
                    backgroundColor: '#000',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Clientes
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: '#000',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Registrar deuda
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: '#000',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Registrar pago
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={logout}
                style={{
                    backgroundColor: 'red',
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 30,
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Cerrar sesión
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}