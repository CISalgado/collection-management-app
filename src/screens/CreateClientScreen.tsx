import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import api from '../api/api';

export default function CreateClientScreen() {

    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName1, setLastName1] = useState('');
    const [lastName2, setLastName2] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [collectionMethod, setCollectionMethod] = useState(0);
    const [collectionDay, setCollectionDay] = useState(0);

    const saveClient = async () => {

        try {

            const user = await AsyncStorage.getItem(
                'user'
            );

            if(!user) {

                Alert.alert(
                    'Error',
                    'Sesión inválida'
                );

                return;
            }

            const parsedUser = JSON.parse(user);

            await api.post('/clients', {
                client_firstname: firstName,
                client_lastname1: lastName1,
                client_lastname2: lastName2,
                client_phonenumber: phone,
                client_address: address,
                client_collectionmethod: collectionMethod,
                client_collectionday: collectionDay,
                create_iduser: parsedUser.id_user,
            });

            Alert.alert(
                'Correcto',
                'Cliente creado'
            );

            navigation.goBack();

        } catch(error: any) {

            console.log(
                error.response?.data
            );

            Alert.alert(
                'Error',
                'No se pudo crear el cliente'
            );
        }
    };

    const getCollectionDays = () => {

        if(collectionMethod === 1) {

            return [
                { label: 'Lunes', value: 1 },
                { label: 'Martes', value: 2 },
                { label: 'Miércoles', value: 3 },
                { label: 'Jueves', value: 4 },
                { label: 'Viernes', value: 5 },
                { label: 'Sábado', value: 6 },
                { label: 'Domingo', value: 7 },
            ];
        }

        if(collectionMethod === 2) {

            return Array.from(
                { length: 15 },
                (_, index) => ({
                    label: `${index + 1}`,
                    value: index + 1,
                })
            );
        }

        if(collectionMethod === 3) {

            return Array.from(
                { length: 31 },
                (_, index) => ({
                    label: `${index + 1}`,
                    value: index + 1,
                })
            );
        }

        return [
            { label: 'Seleccione el metodo de cobro*', value: 0 },
        ];
    };

    return (

        <ScrollView
            style={{
                flex: 1,
                backgroundColor: '#fff',
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
                Nuevo Cliente
            </Text>

            <Text
                style={{
                    fontSize: 10,
                    fontWeight: 'light',
                }}
            >
                Los campos con * son obligatorios
            </Text>

            <TextInput
                placeholder="Nombre*"
                value={firstName}
                onChangeText={setFirstName}
                style={inputStyle}
            />

            <TextInput
                placeholder="Apellido paterno*"
                value={lastName1}
                onChangeText={setLastName1}
                style={inputStyle}
            />

            <TextInput
                placeholder="Apellido materno*"
                value={lastName2}
                onChangeText={setLastName2}
                style={inputStyle}
            />

            <TextInput
                placeholder="Teléfono"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={inputStyle}
            />

            <TextInput
                placeholder="Dirección"
                value={address}
                onChangeText={setAddress}
                style={inputStyle}
            />
            
            <Text
                style={{
                    marginBottom: 5,
                    fontWeight: 'bold',
                }}
            >
                Método de cobro
            </Text>
            <View
                style={pickerContainer}
            >
                <Picker
                    selectedValue={collectionMethod}
                    onValueChange={(value) => {
                        setCollectionMethod(value);
                        setCollectionDay(1);
                    }}
                    style={inputStyle}
                >
                    <Picker.Item label="Seleccione un método*" value={0} />
                    <Picker.Item label="Semanal" value={1} />
                    <Picker.Item label="Quincenal" value={2} />
                    <Picker.Item label="Mensual" value={3} />
                </Picker>
            </View>
            
            <Text
                style={{
                    marginBottom: 5,
                    fontWeight: 'bold',
                }}
            >
                Día de cobro
            </Text>
            
            <View
                style={pickerContainer}
            >
                <Picker
                    selectedValue={collectionDay}
                    onValueChange={(value) =>
                        setCollectionDay(value)
                    }
                >
                    {
                        getCollectionDays().map((day) => (
                        
                            <Picker.Item
                                key={day.value}
                                label={day.label}
                                value={day.value}
                            />
                        ))
                    }
                </Picker>
            </View>

            <TouchableOpacity
                onPress={saveClient}
                style={{
                    backgroundColor: '#000',
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 10,
                }}
            >

                <Text
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Guardar cliente
                </Text>

            </TouchableOpacity>

        </ScrollView>
    );
}

const inputStyle = {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
};

const pickerContainer = {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden' as const,
};