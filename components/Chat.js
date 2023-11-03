import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
    const color = route.params.color;
    // const name = route.params.name;

    // useEffect(() => {
    //     navigation.setOptions({ title: name });
    // }, []);

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text>Chat component</Text>
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
