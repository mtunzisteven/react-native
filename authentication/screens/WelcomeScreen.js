import { Alert, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';


function WelcomeScreen() {

  const [fetchedData, setFetchedData] = useState();
  const [error, setError] = useState();

  useEffect(() => {

    axios.get(
      'https://react-native-course-61285-default-rtdb.ffirebaseio.com/message.json'
      )
      .then(response => {
        setFetchedData(response.data);
      })
      .catch(error => {
        Alert.alert(error.message);
        setError(error.message);
      });

  }, [])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{fetchedData?? 'Error'}!</Text>
      <Text>{!!fetchedData ? 'You authenticated successfully!': error}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
