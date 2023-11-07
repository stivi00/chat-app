import { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
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

const Chat = ({ route, navigation, db }) => {
    // Extracting parameters from navigation route.
    const { name, color, userID } = route.params;

    const [messages, setMessages] = useState([]);

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

    useEffect(() => {
        // Set the navigation title to the user's name.
        navigation.setOptions({ title: name });
        const q = query(
            collection(db, 'messages'),
            orderBy('createdAt', 'desc')
        );
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach((doc) => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                });
            });
            setMessages(newMessages);
        });
        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, []);

    // Handler to send new messages to Firestore.
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0]);
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
                accessible={true}
                accessibilityLabel='Chat text box'
                accessibilityHint='Displays messages.'
                accessibilityRole='text'
            />
            {Platform.OS === 'android' ? (
                <KeyboardAvoidingView behavior='height' />
            ) : null}
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView behavior='padding' />
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
