import { TextInput, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
// import { getFormattedDate } from '../../util/date';

function ExpenseForm({ label, style, textInputConfig, invalid  }) {

    const inputStyles = [styles.input];
    
    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

  return (

      <View style={[styles.inputContainer, style]}>
          <Text style={[styles.label, invalid && styles.invalidLabel ]} >{label}</Text>
          <TextInput style={[ inputStyles, invalid && styles.invalidInput ]} {...textInputConfig} />        
      </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 10
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary200,
        marginBottom: 4 
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    }
});
