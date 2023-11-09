import { TouchableOpacity } from 'react-native';

const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
    const onActionPress = () => {};

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onActionPress}
        ></TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;
