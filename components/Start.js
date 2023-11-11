import { useState } from 'react';
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
    const colors = ['#FFCC70', '#8ECDDD', '#22668D', '#6A9C89'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ChatterBox </Text>
            <View style={styles.gap}></View>
            <View style={styles.startModal}>
                <TextInput
                    placeholderTextColor={'#213555'}
                    style={styles.textInput}
                    value={username}
                    onChangeText={(val) => setUsername(val)}
                    placeholder='Your Name'
                    accessible={true}
                    accessibilityLabel='Name input field'
                    accessibilityHint='Enter your name here'
                    accessibilityRole='text'
                />
                <Text> Choose Background Color:</Text>
                <View
                    style={styles.buttonsArea}
                    accessible={true}
                    accessibilityLabel='Background color selection'
                    accessibilityRole='menu'
                >
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
                            accessible={true}
                            accessibilityLabel='Different colors to select'
                            accessibilityRole='menuitem'
                        />
                    ))}
                </View>
                <Button
                    color='#219C90'
                    title='Start Chatting'
                    onPress={() =>
                        navigation.navigate('Chat', {
                            name: username,
                            color: background,
                        })
                    }
                    accessible={true}
                    accessibilityLabel='Start chatting Button'
                    accessibilityHint='Enters chat conversation'
                    accessibilityRole='button'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#213555',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#F5E8C7',
    },

    gap: {
        height: 100,
    },
    startModal: {
        width: '90%',
        backgroundColor: '#4F709C',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 5,
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#F5E8C7',
        color: '#fff',
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
