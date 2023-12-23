import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from '..//constants/colors';
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickedNumber }) {

    const [enteredNumber, setEnteredNumber] = useState('');

    const {width, height} = useWindowDimensions()

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText)
    }

    function resetInputHandler(){
        setEnteredNumber('')
    }

    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >99){
            
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99'
                ,[{
                    text: 'Okay',
                    style: 'default',
                    onPress: resetInputHandler
                }]
            );

            return;
        }
        
        onPickedNumber(chosenNumber);
    }

    const dynamicMarginTop = height < 400 ? 10: 100;

    return (
      <KeyboardAvoidingView
        style={[
          styles.rootContainer,
          {marginTop: dynamicMarginTop}
          ]}
          behavior="position"
        >
            <Title title='Guess My Number' />
            <Card>
                <InstructionText>Enter a Number</InstructionText>
                <TextInput
                    style={styles.textInput}
                    maxLength={2}
                    keyboardType="number-pad"
                    autoCapitalize="none" // not really needed for the number input
                    autoCorrect={false} // not really needed for the number input
                    value={enteredNumber}
                    onChangeText={numberInputHandler}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton myOnPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton myOnPress={confirmInputHandler} >Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
      </KeyboardAvoidingView>


    );
}

export default StartGameScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    KBACointainer: {
      flex: 1
    },
    rootContainer:{
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        marginHorizontal: 'auto',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    buttonContainer: {
        flex:1
    }
});