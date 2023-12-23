import {
  Text,
  StyleSheet,
  Platform
} from "react-native";
import Colors from '../../constants/colors';

function Title({ title }) {

    return <Text style={styles.title}>{title}</Text>;
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        // borderColor: Platform.OS === 'ios' ? 'yellow' : 'white',
        // borderColor: Platform.select({ios: 'lime',android: 'white'}),
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',
        width: 300
    }
});