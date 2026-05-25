import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,} from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../api/api';

export default function ClientDetailScreen() {

    const route = useRoute<any>();
    const {
        id_client,
        client_name,
    } = route.params;
    const [loading, setLoading] = useState(true);
    const [movements, setMovements] = useState<any[]>([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        getAccountStatement();
    }, []);

    const getAccountStatement = async () => {
        try {
            const response = await api.get(
                `/clients/${id_client}/account-statement`
            );
            console.log(response.data);
            setMovements(
                response.data.data.movements
            );
            setBalance(
                response.data.data.balance
            );
        } catch(error: any) {
            console.log(
                error.response?.data
            );
        } finally {
            setLoading(false);
        }
    };

    if(loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                padding: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                }}
            >
                {client_name}
            </Text>

            <Text
                style={{
                    fontSize: 20,
                    marginTop: 10,
                    marginBottom: 20,
                }}
            >
                Saldo actual:
                {' '}
                ${balance}
            </Text>

            <FlatList
                data={movements}
                keyExtractor={(_, index) =>
                    index.toString()
                }
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: '#f2f2f2',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            {item.tipo}
                        </Text>

                        <Text>
                            ${item.monto}
                        </Text>

                        <Text>
                            {item.descripcion}
                        </Text>

                        <Text>
                            {item.fecha}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}