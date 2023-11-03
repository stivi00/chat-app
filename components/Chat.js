import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
    const color = route.params.color;
    const username = route.params.name;

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text>Welcome {username} ! </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Chat;
