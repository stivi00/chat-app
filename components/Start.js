import { useState } from 'react';
import Chat from './Chat';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
} from 'react-native';

const Start = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [background, setBackground] = useState('#fff');
    const colors = ['#FF5733', '#4287f5', '#75C7A7', '#FAC032'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ChatterBox </Text>
            <View style={styles.startModal}>
                <TextInput
                    style={styles.textInput}
                    value={username}
                    onChangeText={(val) => setUsername(val)}
                    placeholder='Your Name'
                />
                <Text> Choose Background Color:</Text>
                <View style={styles.buttonsArea}>
                    {colors.map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.chooseColorButton,
                                { backgroundColor: color },
                                styles.selected,
                                background === color && styles.selected,
                            ]}
                            onPress={() => setBackground(color)}
                        />
                    ))}
                </View>
                <Button
                    title='Start Chatting'
                    // onPress={() => navigation.navigate('Chat')}
                    onPress={() =>
                        navigation.navigate('Chat', {
                            name: username,
                            color: background,
                        })
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    startModal: {
        width: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
    },
    buttonsArea: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 10,
        padding: 10,
    },

    chooseColorButton: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
});

export default Start;
