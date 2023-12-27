import {
    FlatList,
    View,
    StyleSheet
} from 'react-native';
import MealItem from './MealItem';


function MealsList({displayedMeals}){

    function renderMealItem(itemData){

        const item = itemData.item;
        const mealItemProps = {
            mealId: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            complexity: item.complexity,
            affordability: item.affordability
        };

        return (
            // <MealItem
            //     title={itemData.item.title}
            //     imageUrl={itemData.item.imageUrl}
            //     duration={itemData.item.duration}
            //     complexity={itemData.item.complexity}
            //     affordability={itemData.item.affordability}
            // />

            <MealItem meal={ mealItemProps } />
        );
    }

    return (
        <View style={ styles.container }>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );

}

export default MealsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
});