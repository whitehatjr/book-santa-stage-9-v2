import React, { Component } from "react";
import { View, KeyboardAvoidingView, StyleSheet, Alert } from "react-native";
import db from "../config";
import firebase from "firebase";

import MyHeader from "../components/MyHeader";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default class BookRequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: "",
      reasonToRequest: ""
    };
  }

  getUniqueId() {
    return Math.random()
      .toString(36)
      .substring(7);
  }

  handleBookRequest = (bookName, reasonToRequest) => {
    var { userId } = this.state;
    var randomRequestId = this.getUniqueId();
    if (bookName && reasonToRequest) {
      db.collection("requested_books").add({
        user_id: userId,
        book_name: bookName,
        reason_to_request: reasonToRequest,
        request_id: randomRequestId
      });

      this.setState({
        bookName: "",
        reasonToRequest: ""
      });
      Alert.alert("Book Requested Successfully");
    } else {
      Alert.alert("Fill the details properly");
    }
  };

  render() {
    var { bookName, reasonToRequest } = this.state;
    return (
      <View style={styles.container}>
        <MyHeader title="Request Book" navigation={this.props.navigation} />
        <KeyboardAvoidingView style={styles.upperContainer}>
          <CustomInput
            style={[styles.input, { height: 75 }]}
            inputContainerStyle={{ height: 60 }}
            label={"Book Name"}
            labelStyle={{ fontSize: 20 }}
            placeholder={"Book name"}
            onChangeText={text => {
              this.setState({
                bookName: text
              });
            }}
            value={bookName}
          />
          <CustomInput
            style={[styles.input, { height: 170 }]}
            inputContainerStyle={{ height: 140 }}
            label={"Reason"}
            labelStyle={{ fontSize: 20 }}
            multiline
            numberOfLines={8}
            placeholder={"Why do you need the book"}
            onChangeText={text => {
              this.setState({
                reasonToRequest: text
              });
            }}
            value={reasonToRequest}
          />
          <CustomButton
            title={"Make a request"}
            onPress={() => this.handleBookRequest(bookName, reasonToRequest)}
            style={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upperContainer: {
    flex: 1,
    alignItems: "center"
  },
  input: {
    width: "90%",
    height: 65,
    borderColor: "#6fc0b8",
    borderWidth: 0,

    alignItems: "flex-start",
    marginTop: 30
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6fc0b8"
  },
  buttonTitle: {
    color: "#fff"
  }
});
