// import the screens
import Start from './components/Start.js';
import Chat from './components/Chat.js';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Start'>
                <Stack.Screen name='Start' component={Start} />
                <Stack.Screen name='Chat' component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
