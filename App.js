import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoginScreen from "./screens/Login";
import { AppDrawerNavigator } from "./components/AppDrawerNavigator";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const switchNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Drawer: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(switchNavigator);
