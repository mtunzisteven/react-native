import { Text, StyleSheet } from "react-native";
import Colors from '../../constants/colors';

function InstructionText({ children }) {

    return <Text style={styles.instructionText}>{children}</Text>
}

export default InstructionText;


const styles = StyleSheet.create({

    instructionText: {
        fontFamily: 'open-sans-regular',
        color: Colors.accent500,
        fontSize: 20,
        marginVertical: 15
    }
});