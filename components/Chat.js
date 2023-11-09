import CustomActions from './CustomActions';

import { useState, useEffect } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import {
    collection,
    getDocs,
    addDoc,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected }) => {
    // Extracting parameters from navigation route.
    const { name, color, userID } = route.params;
    const [messages, setMessages] = useState([]);

    const loadCachedMessages = async () => {
        const cachedMessages = (await AsyncStorage.getItem('messages')) || '[]';
        setMessages(JSON.parse(cachedMessages));
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000',
                    },
                    left: {
                        backgroundColor: '#FFF',
                    },
                }}
            />
        );
    };

    let unsubMessages;

    useEffect(() => {
        navigation.setOptions({
            title: name,
            headerStyle: {
                backgroundColor: color,
            },
            headerTitleStyle: {
                color: color === '' ? '#000' : '#fff',
            },
        });

        if (isConnected === true) {
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(
                collection(db, 'messages'),
                orderBy('createdAt', 'desc')
            );
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach((doc) => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()), // convert createdAt to Date object })
                    });
                });
                cachedMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        // Clean up function
        return () => {
            if (unsubMessages) {
                unsubMessages();
            }
        };
    }, [isConnected]);

    const cachedMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem(
                'messages',
                JSON.stringify(messagesToCache)
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    // Handler to send new messages to Firestore.
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0]);
    };

    const renderInputToolbar = (props) => {
        // rendering InputToolbar function
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    const renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3,
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    };

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            {/* <View style={styles.container}> */}
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={(messages) => onSend(messages)}
                user={{
                    name,
                }}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                accessible={true}
                accessibilityLabel='Chat text box'
                accessibilityHint='Displays messages.'
                accessibilityRole='text'
            />
            {Platform.OS === 'android' ? (
                <KeyboardAvoidingView behavior='height' />
            ) : null}
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView behavior='height' />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;
