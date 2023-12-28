import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Input from './Input';
import Button from '../UI/Button';

import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';


function ExpenseForm({ onCancel, onSubmit, isEditing, expenseToEdit }) {

    const [inputs, setInputs] = useState({
        amount: {
            value: expenseToEdit ? expenseToEdit.amount.toString():'',
            isValid: true
        },
        date: {
            value: expenseToEdit ? getFormattedDate(expenseToEdit.date):'',
            isValid: true
        },
        description: {
            value: expenseToEdit ? expenseToEdit.description:'',
            isValid: true
        }
    });

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs(prevInputValues => {
            return {
                ...prevInputValues,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            };
        });
    };

    const confirmHandler = () => {

        const expenseData = {
            amount: +inputs.amount.value.replace(',', '.'),
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            // Alert.alert('Invalid input!', 'Please check your input PrivateValueStore.');
            setInputs(prevStates => {
                return {
                    amount: {
                        value: prevStates.amount.value,
                        isValid: amountIsValid
                    },
                    date: {
                        value: prevStates.date.value,
                        isValid: dateIsValid
                    },
                    description: {
                        value: prevStates.description.value,
                        isValid: descriptionIsValid
                    }
                }
            });
            return;
        }

        onSubmit(expenseData);
    };

    const formIsInvalid = 
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid 


    return (
        <View style={styles.form}>
            <Text style={styles.title}>
                Your Expense
            </Text>
            <View style={styles.inputRow}>
                <Input
                    style={styles.rowInput}
                    label='Amount'
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }} 
                />
                <Input
                    style={styles.rowInput}
                    label='Date'
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value

                    }}         
                />
            </View>
            <Input
                label='Description'
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    autoCorrect: false, // default is true
                    onChangeText:  inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value

                }} 
            />
            {formIsInvalid &&
                (
                    <Text style={styles.errorText}>
                        Invalid input values - please check your input data!
                    </Text>
                )
            }
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
            </Button>
            <Button style={styles.button} onPress={confirmHandler}>
            {isEditing ? 'Update' : 'Add'}
            </Button>
        </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 25
    },
    errorText: {
        color: GlobalStyles.colors.error500,
        margin: 8,
        textAlign: 'center'

    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      minWidth: 120,
      marginHorizontal: 8,
    }
});
