import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../api/api';

export default function ClientsScreen() {

    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {

        getClients();

    }, []);

    const getClients = async () => {

        try {

            const token = await AsyncStorage.getItem(
                'token'
            );

            console.log('TOKEN:', token);

            const response = await api.get(
                '/clients'
            );
        
            setClients(
                response.data.data
            );

        } catch(error: any) {

            console.log(
                error.response?.data
            );

        } finally {

            setLoading(false);

            setRefreshing(false);
        }
    };

    const onRefresh = () => {

        setRefreshing(true);

        getClients();
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
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginBottom: 20,
                }}
            >
                Clientes
            </Text>

            <FlatList
                data={clients}
                keyExtractor={(item) =>
                    item.id_client.toString()
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={() => (

                    <Text>
                        No hay clientes
                    </Text>
                )}
                renderItem={({ item }) => (

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#f2f2f2',
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                        onPress={() =>
                            navigation.navigate(
                                'ClientDetail' as never,
                                {
                                    id_client: item.id_client,
                                    client_name:
                                        `${item.client_firstname} ${item.client_lastname1}`,
                                } as never
                            )
                        }
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}
                        >
                            {
                                item.client_firstname
                            } {
                                item.client_lastname1
                            }
                        </Text>

                        <Text>
                            Método cobro:
                            {' '}
                            {
                                item.client_collectionmethod
                            }
                        </Text>

                        <Text>
                            Día:
                            {' '}
                            {
                                item.client_collectionday
                            }
                        </Text>

                    </TouchableOpacity>
                )}
            />

        </View>
    );
}