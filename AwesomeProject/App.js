import { useState } from 'react';
import { 
  StyleSheet,
  View,
  Button,
  FlatList
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {

    if(enteredGoalText){
      setCourseGoals(prevState => [
        ...prevState,
        { text: enteredGoalText, id: Math.random().toString()}
      ]);
  
      modalCloseHandler();
    }

  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter(goal => goal.id !== id)
    });
  }

  function modalOpenHandler() {
    setModalIsOpen(true);
  }

  function modalCloseHandler() {
    setModalIsOpen(false);
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
          <Button
            title='Add new goal'
            color="#b180f0"
            onPress={modalOpenHandler}
          />
          <GoalInput
            onAddGoal={addGoalHandler}
            visible={modalIsOpen}
            onCloseModal={modalCloseHandler}
          />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return <GoalItem 
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false} 
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    marginHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
    width: '100%',
    color: '#000000',
    paddingTop: 40,
  },

});