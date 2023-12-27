import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import { MEALS } from '../data/dummy-data';
import MealInfo from '../components/MealsList/MealInfo';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';
import { FavoritesContext } from '../store/context/favorites-context';

function MealDetailsScreen({ route, navigation }) {

    const favoriteMealsCtx = useContext(FavoritesContext)

    const mealId = route.params.mealId;

    const isFavorite = favoriteMealsCtx.ids.includes(mealId);

    const selectedMeal = MEALS.find((meal) => 
        meal.id === mealId
    );


    function updateFavoriteHandler(){
        if(isFavorite) {
            favoriteMealsCtx.removeFavorite(selectedMeal.id);
        }
        else{
            favoriteMealsCtx.addFavorite(selectedMeal.id);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
              return (
                <IconButton
                    icon={isFavorite ? "star": "star-outline"}
                    color="white"
                    myOnPress={updateFavoriteHandler}
                />
              );
            }
          });

    }, [isFavorite, updateFavoriteHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image
                source={{ uri: selectedMeal.imageUrl}}
                style={styles.image}
            />
            <Text
                style={styles.title}
            >
                {selectedMeal.title}
            </Text>
            <MealInfo textStyle={styles.text} {...selectedMeal} />

            <View style={styles.ListsOuterContainer}>
                <View style={styles.listsContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />

                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    text: {
        color: 'white'
    },
    subtitle: {
        color: '#e2b497',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 8,
        textAlign: 'center',
    },
    subtitleContainer: {
        padding: 6,
        marginHorizontal: 24,
        marginVertical: 8,
        borderBottomColor: '#e2b497',
        borderBottomWidth: 2
    },
    ListsOuterContainer: {
        alignItems: 'center'
    },
    listsContainer: {
        maxWidth: '80%'
    }
});