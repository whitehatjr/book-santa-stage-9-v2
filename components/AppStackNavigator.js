import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import BookDonateScreen from "../screens/BookDonate";
import RecieverDetailsScreen from "../screens/RecieverDetails";

export const AppStackNavigator = createStackNavigator(
  {
    BookDonate: {
      screen: BookDonateScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    RecieverDetails: {
      screen: RecieverDetailsScreen,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    initialRouteName: "BookDonate"
  }
);
