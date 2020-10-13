import React from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppStackNavigator } from "./AppStackNavigator";
import BookDonateScreen from "../screens/BookDonate";
import BookRequestScreen from "../screens/BookRequest";

export const AppTabNavigator = createBottomTabNavigator({
  AppStack: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request-list.png")}
          style={{
            width: 20,
            height: 20
          }}
        />
      ),
      tabBarLabel: "Donate Books"
    }
  },
  BookRequest: {
    screen: BookRequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request-book.png")}
          style={{
            width: 20,
            height: 20
          }}
        />
      ),
      tabBarLabel: "Book Request"
    }
  }
});
