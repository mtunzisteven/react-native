import { View, StyleSheet } from "react-native";
import Colors from '../../constants/colors';

function Card({ children }) {

    return <View style={styles.card}>{children}</View>
}

export default Card;


const styles = StyleSheet.create({

    card: {
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4, // Android specific box-shadow
        shadowColor: 'black', // IOS specific box-shadow group
        shadowOffset: {width: 0, height: 2}, // IOS specific box-shadow group
        shadowRadius: 6, // IOS specific box-shadow group
        shadowOpacity: 0.5, // IOS specific box-shadow group
        alignItems: 'center', // horizontal alignment
        justifyContent: 'center' // vertical alignment
    }
});