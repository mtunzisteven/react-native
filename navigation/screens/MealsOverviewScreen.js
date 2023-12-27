import { useLayoutEffect } from 'react';
import { MEALS, CATEGORIES } from '../data/dummy-data';
import MealsList from '../components/MealsList/MealList';


function MealsOverviewScreen({ route, navigation }){
    // route & navigation extracted from Stack.Navigator which passes by default
    // it can only be extracted from a defined screens
    // to access route in components that aren't defined as screens
    // we use useRoute() hook from @react-navigation/native 
    // to create extract data as below
    
    const catId = route.params.categoryId;


    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => { // used same as useEffect, but able to load before component rendering

        const categoryTitle = CATEGORIES.find(
                (category) => category.id === catId
            ).title;

        navigation.setOptions({
            title: categoryTitle
        });

    }, [catId, navigation]);

    return <MealsList displayedMeals={displayedMeals} />


}

export default MealsOverviewScreen;

