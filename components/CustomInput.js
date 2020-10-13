import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const CustomInput = props => (
  <Input
    containerStyle={[styles.input, props.style]}
    inputContainerStyle={{ borderBottomWidth: 0, height: 55 }}
    placeholder={props.placeholder}
    placeholderTextColor={props.placeholderTextColor}
    onChangeText={props.onChangeText}
    placeholderTextColor={"#717D7E"}
    {...props}
  />
);

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 55,
    borderWidth: 1.5,
    borderColor: "#fff",
    alignItems: "center"
  }
});
