import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import firebase from "firebase";

import CustomButton from "./CustomButton";

export default class CustomSideBarMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.lowerContainer}>
          <CustomButton
            title={"Log Out"}
            style={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => {
              this.props.navigation.navigate("Login");
              firebase.auth().signOut();
            }}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upperContainer: {
    flex: 0.8,
    paddingTop: 30
  },
  lowerContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    paddingBottom: 30
  },
  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 10,
    shadowColor: "#fff",
    elevation: 0
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000"
  }
});
