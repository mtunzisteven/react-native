import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MealInfo from './MealInfo';

function MealItem({ meal }) {

    const navigation = useNavigation();

    function pressHandler(){
        navigation.navigate('MealDetails', {
                mealId: meal.mealId
            } // This object holds all parameters we pass to defined screen
        );
    }

    return (
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{color:'#ccc'}}
                style={
                    ({ pressed }) => pressed ? styles.buttonPressed : null
                }
                onPress={pressHandler}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image
                            source={{ uri: meal.imageUrl}}
                            style={styles.image}
                        />
                        <Text style={styles.title}>
                            {meal.title}
                        </Text>
                        <MealInfo {...meal} />
                    </View>
                </View>

            </Pressable>
        </View>
    );
}

export default MealItem;

const styles = StyleSheet.create({
    mealItem: { // overflow visible helps shadow display in IOS, otherwise it won't work
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8
    },
    buttonPressed: {
        opacity: 0.8
    },
    innerContainer: { // This view and these styles bring back rounded corners taken away by overflow: visible in IOS
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 8
    }
});