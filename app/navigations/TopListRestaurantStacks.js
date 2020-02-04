import { createStackNavigator } from "react-navigation-stack";
import TopListRestaurantsScreen from "../screens/TopRestaurants";

export const TopListRestaurantsScreenStack = createStackNavigator({
  Restaurants: {
    screen: TopListRestaurantsScreen,
    navigationOptions: () => ({
      title: "Los mejores restaurnates"
    })
  }
});
