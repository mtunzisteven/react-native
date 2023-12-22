import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BeginGameScreen } from './screens/BeginGameScreen';

export default function App() {
  return (
    <LinearGradient
      colors={ ['#4e0329', '#ddb52f'] }
      style={styles.rootScreen}
    >
      <BeginGameScreen />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  }
});
