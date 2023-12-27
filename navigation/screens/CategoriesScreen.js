import { FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';


function CategoriesScreen({ navigation }){ 
    // navigate extracted from Stack which passes by default
    // it can only be extracted from a defined screens
    // to navigate in components that aren't defined as screens
    // we use useNavigate() hook from @react-navigation/native 
    // to create navigation

    function renderCategoryitem(itemData){
        function pressHandler(){
            navigation.navigate('MealsOverview', {
                categoryId: itemData.item.id
            } // This object holds all parameters we pass to defined screen
        );    
        }    

        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                myOnPress={pressHandler}
            />

        );
    }

    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={
                (item) => item.id
            }
            renderItem={renderCategoryitem}
            numColumns={2}
        />
    );

}

export default CategoriesScreen;