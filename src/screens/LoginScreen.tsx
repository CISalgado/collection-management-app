import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api/api';

export default function LoginScreen() {

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigation = useNavigation<any>();

    const login = async () => {

        try {

            const response = await api.post('/auth', {
                user_name: userName,
                user_password: userPassword,
            });

            console.log(response.data);

            Alert.alert(
                'Correcto',
                'Login exitoso'
            );
            await AsyncStorage.setItem(
                'token',
                response.data.data.token
            );
            await AsyncStorage.setItem(
              'user',
              JSON.stringify(response.data.data.user)
            );
            navigation.replace('Home' as never);
        } catch(error: any) {

            console.log(error.response?.data);

            Alert.alert(
                'Error',
                'Credenciales incorrectas'
            );
        }
    };

    return (

        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                padding: 20,
            }}
        >

            <Text
                style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginBottom: 20,
                }}
            >
                SIC
            </Text>

            <TextInput
                placeholder="Usuario"
                value={userName}
                onChangeText={setUserName}
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 10,
                    borderRadius: 8,
                }}
            />

            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                value={userPassword}
                onChangeText={setUserPassword}
                style={{
                    borderWidth: 1,
                    marginBottom: 20,
                    padding: 10,
                    borderRadius: 8,
                }}
            />

            <TouchableOpacity
                onPress={login}
                style={{
                    backgroundColor: '#000',
                    padding: 15,
                    borderRadius: 8,
                }}
            >

                <Text
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                    }}
                >
                    Iniciar sesión
                </Text>

            </TouchableOpacity>

        </View>
    );
}