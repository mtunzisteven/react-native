import { Text, View, StyleSheet } from "react-native";
import Colors from '../constants/colors';

function GameLog({ roundNumber, guess }) {

    return (
        <View style={styles.logContainer}>
            <Text style={styles.logText}>#{roundNumber}</Text>
            <Text style={styles.logText}>Opponent's Guess: {guess}</Text>
        </View>
    );
}

export default GameLog;

const styles = StyleSheet.create({
    logContainer: {
        borderWidth: 1,
        borderColor: Colors.primary800,
        backgroundColor: Colors.accent500,
        paddingHorizontal: 12,
        paddingVertical: 14,
        marginVertical: 8,
        borderRadius: 40,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        elevation: 4, // android box-shadow
        shadowColor: 'black', // ios box-shadow
        shadowOffset: {width: 0, height: 2}, // ios box-shadow
        shadowRadius: 3, // ios box-shadow
        shadowOpacity: 0.4 // ios box-shadow
    },
    logText: {
        fontFamily: 'open-sans-regular',
    }
});