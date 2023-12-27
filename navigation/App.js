import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CategoriesScreen from './screens/CategoriesScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesContextProvider from './store/context/favorites-context';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator(){
  return<Drawer.Navigator 
          screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            sceneContainerStyle: { // this is the main screen style
              backgroundColor: '#3f2f25',
              marginTop: 0
            },
            drawerActiveBackgroundColor: '#e2b497',
            drawerActiveTintColor: '#351401',
            drawerInactiveTintColor: '#351401'

          }}
        >
    <Drawer.Screen
      name="All Meals"
      component={CategoriesScreen}
      options={{
        drawerIcon: ({color, size }) => (
          <Ionicons name="list" size={size} color={color} /> 
        )
      }}
    />
    <Drawer.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{
        drawerIcon: ({color, size }) => (
          <Ionicons name="star" size={size} color={color} /> 
        )
      }}
    />
  </Drawer.Navigator>;
}

export default function App() {

  return (
    <>
      <StatusBar style='light'></StatusBar>
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MealsCategories"
            screenOptions={{
              headerBackTitle: "Back",
              headerStyle: { backgroundColor: '#351401' },
              headerTintColor: 'white',
              contentStyle: { backgroundColor: '#3f2f25' }
            }}
          >
            <Stack.Screen
              name="Drawer"
              // component={CategoriesScreen}
              // options={{
              //   title:"All Meals"
              // }} Using nested nav with addition of drawer instead as seen below
              component={DrawerNavigator}
              options={{
                headerShown: false
              }} />
            <Stack.Screen
              // options={
              //   ({route, navigation}) => {
              //     const catId = route.params.categoryId;
              //     return {
              //       headerBackTitle: "Back",
              //       title: catId
              //     }
              //   }
              // } will set dynamic options in component
              name="MealsOverview"
              component={MealsOverviewScreen} />
            <Stack.Screen
              name="MealDetails"
              component={MealDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({ 
  headerRight: {
    color: 'white'
  }
 });
