import { 
    StyleSheet,
    Text,
    View,
    Pressable
  } from 'react-native';

function GoalItem({ text, onDeleteItem, id }) {

    

    return (
        <View style={styles.goalItem}>
            <Pressable
                android_ripple={{ color: '#210644' }}
                onPress={onDeleteItem.bind(this, id)}
                style={({pressed}) => pressed && styles.pressedItem }
            >
            <Text style={styles.goalText} >
            {text}
            </Text>
            </Pressable>
        </View>

    );

}

const styles = StyleSheet.create({
    goalItem: {
        marginTop: 14,
        borderRadius: 6,
        backgroundColor: '#5e0aCC',
    },
    pressedItem: {
        borderRadius: 6,
        backgroundColor: '#210644'
    },
    goalText: {
        color : '#fff',
        padding: 15,
      }
});

export default GoalItem;