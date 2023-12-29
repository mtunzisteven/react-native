import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';

function ErrorOverlay({ message, onConfirm}) {
  const navigation = useNavigation();

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onConfirm}>Back</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
