import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions
} from "react-native";
import Title from "../components/ui/Title";
import Colors from '../constants/colors';
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ guessRounds, userNumber, onRestart }) {

  const {width, height} = useWindowDimensions();

  let imageSize = width < 380 ? 150: 300;
  imageSize = height < 400 ? 80: imageSize;

  const imageContainerStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    borderCurve: imageSize / 2,

  };

  const imageStyle = {
    borderRadius: (imageSize / 2) - 3
  };

  return (
    <ScrollView>
      <View style={ styles.screenContainer }>
              <Title title='Game Over!' />
              <View style={[styles.imageContainer, imageContainerStyle ]} >
                  <Image 
                    style={[
                      styles.image,
                      imageStyle
                    ]}
                    source={require('../assets/images/success.png')}
                  />
              </View>
              <Text style={ styles.summaryText }>
                  Your phone needed <Text style={ styles.highlight }>{guessRounds}</Text> rounds to
                  guess the number <Text style={ styles.highlight }>{userNumber}</Text>.
              </Text>
              <PrimaryButton myOnPress={ onRestart }>Start New Game</PrimaryButton>
      </View>
    </ScrollView>

  );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    screenContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36
    },
    imageContainer: {
        // width: deviceWidth< 380? 150: 300,
        // height: deviceWidth< 380? 150: 300,
        // borderRadius: deviceWidth< 380? 75: 150,
        // borderCurve:  deviceWidth< 380? 75: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%',
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