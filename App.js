// import the screens
import Start from './components/Start.js';
import Chat from './components/Chat.js';

import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
    getFirestore,
    disableNetwork,
    enableNetwork,
} from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: 'AIzaSyAWqOtR-19ZYiJqAuiU30aYSr3PZU1EfRs',
        authDomain: 'chatapp-9cf6d.firebaseapp.com',
        projectId: 'chatapp-9cf6d',
        storageBucket: 'chatapp-9cf6d.appspot.com',
        messagingSenderId: '740947276148',
        appId: '1:740947276148:web:1831a743a7e632475d3c21',
    };

    const connectionStatus = useNetInfo();

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    // Initialize Firestore Storage
    const storage = getStorage(app);

    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert('Connection lost!');
            disableNetwork(db);
        } else if (connectionStatus.isConnected === true) {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Start'>
                <Stack.Screen name='Start' component={Start} />
                <Stack.Screen name='Chat'>
                    {(props) => (
                        <Chat
                            isConnected={connectionStatus.isConnected}
                            db={db}
                            storage={storage}
                            {...props}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
