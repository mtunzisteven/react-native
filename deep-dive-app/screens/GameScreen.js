import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Title from "../components/ui/Title";
import NumberContainer from '../components/NumberContainer';
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GameLog from "../components/GameLog";


function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    
    const [guessedNumber, setGuessedNumber] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    function nextGuessHandler(direction){

        // Bad hint: wrong direction hinted
        if (
            (direction == 'lower' && guessedNumber < userNumber) ||
            (direction == 'greater' && guessedNumber > userNumber)
        ) {
            Alert.alert(
                "Don't lie!",
                'Your hint is wrong...',
                [
                    {
                        text: 'Sorry!',
                        style: 'destructive'
                    }
                ]
            );
            return;
        }

        // handle correctly hinted input
        if (direction == 'lower'){
            maxBoundary = guessedNumber;
        } else {
            minBoundary = guessedNumber + 1;
        }

        const newGuessedNumber = generateRandomBetween(minBoundary, maxBoundary, guessedNumber);

        setGuessedNumber(newGuessedNumber);
        setGuessRounds(prev => [newGuessedNumber, ...prev]);
    }

    useEffect(() => {

        // Reset boundaries on rerenders
        minBoundary = 1;
        maxBoundary = 100;

    }, []);

    useEffect(() => {

        // Correct Guess!
        if ( guessedNumber === userNumber) {
            onGameOver(guessRounds.length);
        }

    }, [guessedNumber, userNumber, onGameOver]);

    const guessRoundsListLength = guessRounds.length;

    return (
        <View style={styles.container}>
            <Title title={"Opponent's Guess"} />
            <NumberContainer>{guessedNumber}</NumberContainer>
            <Card>
                <InstructionText>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton myOnPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton myOnPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => 
                        <GameLog
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item} 
                        />
                    }
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        padding: 24
    } ,
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    buttonContainer: {
        flex:1
    },
    listContainer:{
        fontSize: 16,
        overflow: 'scroll',
        marginTop: 10,
        height: 260
    }
});