import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import ClientsScreen from '../screens/ClientsScreen';
import ClientDetailScreen from '../screens/ClientDetailScreen';
import CreateClientScreen from '../screens/CreateClientScreen';
// import DebtsScreen from '../screens/DebtsScreen';
// import PaymentsScreen from '../screens/PaymentsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    const [loading, setLoading] = useState(true);

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {

        checkLogin();

    }, []);

    const checkLogin = async () => {

        const token = await AsyncStorage.getItem('token');

        setIsLogged(!!token);

        setLoading(false);
    };

    if(loading) {
        return <SplashScreen />;
    }

    return (

        <NavigationContainer>

            <Stack.Navigator
                initialRouteName={
                    isLogged
                        ? 'Home'
                        : 'Login'
                }
            >

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />

                <Stack.Screen
                    name="Clients"
                    component={ClientsScreen}
                />

                <Stack.Screen
                    name="ClientDetail"
                    component={ClientDetailScreen}
                    options={{
                        title: 'Estado de cuenta',
                    }}
                />

                <Stack.Screen
                    name="CreateClient"
                    component={CreateClientScreen}
                    options={{
                        title: 'Nuevo cliente',
                    }}
                />

                {/* <Stack.Screen
                    name="Debts"
                    component={DebtsScreen}
                /> */}

                {/* <Stack.Screen
                    name="Payments"
                    component={PaymentsScreen}
                /> */}

            </Stack.Navigator>

        </NavigationContainer>
    );
}