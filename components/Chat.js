import { useState, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
    const color = route.params.color;
    const name = route.params.name;
    const [messages, setMessages] = useState([]);

    const onSend = (newMessages) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
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

    // Set the navigation title to the user's name.
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            {/* <View style={styles.container}> */}
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
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
