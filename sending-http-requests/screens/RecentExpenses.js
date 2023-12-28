import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses({ navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();


  useEffect(() => {

    async function fetchExpenses(){
      setIsLoading(true);
      try{
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      }
      catch (error){
        setError('Error fetching recent expenses.');
      }
      setIsLoading(false);


    }

    fetchExpenses();

  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

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
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
