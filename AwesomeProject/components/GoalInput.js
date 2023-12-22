import { 
    StyleSheet,
    TextInput,
    View,
    Button,
    Modal,
    Image
  } from 'react-native';

  import { useState } from 'react';

function GoalInput({ onAddGoal, visible, onCloseModal }) {

    const [enteredGoalText, setEnteredGoalText] = useState('');
  
    function goalInputHandler(enteredTExt) {
        setEnteredGoalText(enteredTExt);
    };

    function addGoalHandler() {
        onAddGoal(enteredGoalText)
        setEnteredGoalText('')
    }



    return  (
        <Modal visible={visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <Image
                    source={require('../assets/images/goal.png')}
                    style={styles.image}
                />
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Your course goal!' 
                    onChangeText={goalInputHandler}
                    value={ enteredGoalText }
                />
                <View style={styles.buttonContainer}>

                    <View style={styles.button}>
                        <Button
                            onPress={onCloseModal}
                            title="Cancel"
                            color="#f31282"
                        />
                    </View>

                    <View style={styles.button}>
                        <Button
                            onPress={addGoalHandler}
                            title="Add Goal"
                            color="#b180f0"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    inputContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 24,
        borderBottomWidth: 1,
        padding: 16,
        borderBottomColor: '#cccccc',
        backgroundColor: '#311b6b'
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        borderRadius: 6,
        color: '#120438',
        width: '100%',
        padding: 16,
        backgroundColor: '#e4d0ff'
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
      },
      button:{
        width: '40%',
        marginHorizontal: 8,
      },
      image:{
        width: 100,
        height: 100,
        margin: 20
      }

});

export default GoalInput;