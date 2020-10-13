import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const CustomButton = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.button, props.style]}
  >
    <Text style={[styles.buttonText, props.titleStyle]}>{props.title}</Text>
  </TouchableOpacity>
);

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "75%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16
  },
  buttonText: {
    fontSize: 25,
    color: "#6fc0b8",
    fontWeight: "500"
  }
});
