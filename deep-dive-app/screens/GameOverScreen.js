import { Text, Image, View, StyleSheet, Alert } from "react-native";
import Title from "../components/ui/Title";
import Colors from '../constants/colors';
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ guessRounds, userNumber, onRestart }) {

    Alert.alert(
        'Whoop whoop!',
        'Number has been guessed finally.'
        ,[{
            text: 'Okay',
            style: 'default'
        }]
    );

    return (
        <View style={ styles.screenContainer }>
                <Title title='Game Over!' />
                <View style={ styles.imageContainer }>
                    <Image style={ styles.image } source={require('../assets/images/success.png')} />
                </View>
                <Text style={ styles.summaryText }>
                    Your phone needed <Text style={ styles.highlight }>{guessRounds}</Text> rounds to
                    guess the number <Text style={ styles.highlight }>{userNumber}</Text>.
                </Text>
                <PrimaryButton myOnPress={ onRestart }>Start New Game</PrimaryButton>
        </View>
    );
}

export default GameOverScreen;

const styles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderCurve: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 147,
    },
    summaryText: {
        fontFamily: 'open-sans-regular',
        fontSize: 23,
        textAlign: 'center',
        marginBottom: 40
    },
    highlight:{
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
});