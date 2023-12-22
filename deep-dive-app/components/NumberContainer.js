import { Text, View, StyleSheet } from "react-native";
import Colors from '../constants/colors';

function NumberContainer({ children }) {

    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
}

export default NumberContainer;

const styles = StyleSheet.create({
    textContainer: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 24,
        margin: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'open-sans-bold',
        color: Colors.accent500,
        fontSize: 36
    }
});