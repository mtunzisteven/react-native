import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import Colors from './constants/colors';

SplashScreen.preventAutoHideAsync();

export default function App() {
  
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if(!fontsLoaded){
    return null;
  }

  function gameOverHandler(guesses){
    setGameIsOver(true);
    setGuessRounds(guesses);
  }

  function guessRoundsHandler(rounds){

    setGuessRounds(rounds);

  }

  function gameResetHandler(){
    setGameIsOver(true);
    setUserNumber(null);
    setGuessRounds(0);

  }

  function pickedNumberHandler(pickedNumber){

    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />

  if(userNumber){
    screen = <GameScreen
            userNumber={userNumber}
            onGameOver={gameOverHandler}
          />
  }

  if(gameIsOver && userNumber){
    screen = <GameOverScreen
              userNumber={userNumber}
              guessRounds={guessRounds}
              onRestart={gameResetHandler}
            />
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView >
          { screen }
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.2
  }
});
