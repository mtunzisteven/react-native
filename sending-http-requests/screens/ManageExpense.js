import { useContext, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, deleteExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsLoading(true);

    try{
      // db deletion
      await deleteExpense(editedExpenseId);

      // context deletion
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();

    }
    catch (error){
      setError('Error deleting expense. Please try again later.');
      setIsLoading(false);

    }


  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsLoading(true);

    try{
      if (isEditing) {
        // db saving
        await updateExpense(
          editedExpenseId,
          expenseData
        );

        // context saving
        expensesCtx.updateExpense(
          editedExpenseId, 
          expenseData
        );
  
  
      } else {
        // db saving
        const id = await storeExpense(expenseData);
        expenseData.id = id;

        // context saving
        expensesCtx.addExpense(expenseData);

      }
      navigation.goBack();

    }
    catch (error){
      setError('Error saving expense. Please try again later.');
      setIsLoading(false);
    }

  }


  function confirmationHandler(){
    setError(null);
  }

  if(isLoading){
    return <LoadingOverlay />;
  }

  if(error && !isLoading){
    return <ErrorOverlay message={error} onConfirm={confirmationHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        isEditing={isEditing}
        expenseToEdit={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
