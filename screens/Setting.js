import React, { Component } from "react";
import { View, StyleSheet, Alert } from "react-native";
import db from "../config";
import firebase from "firebase";

import MyHeader from "../components/MyHeader";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      docId: ""
    };
  }

  getUserDetails = () => {
    var { email } = this.state;
    db.collection("users")
      .where("email_id", "==", email)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var data = doc.data();
          this.setState({
            email: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            contact: data.contact,
            docId: doc.id
          });
        });
      });
  };

  updateUserDetails = () => {
    var { docId } = this.state;
    if (docId) {
      db.collection("users")
        .doc(docId)
        .update({
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          address: this.state.address,
          contact: this.state.contact
        })
        .then(() => {
          Alert.alert("Profile Updated Successfully");
        });
    } else {
      Alert.alert("Document id is empty");
    }
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    var { firstName, lastName, contact, address } = this.state;
    return (
      <View style={styles.container}>
        <MyHeader title="Settings" navigation={this.props.navigation} />
        <View style={styles.upperContainer}>
          <CustomInput
            style={styles.input}
            placeholder={"First Name"}
            maxLength={8}
            onChangeText={text => {
              this.setState({
                firstName: text
              });
            }}
            value={firstName}
          />
          <CustomInput
            style={styles.input}
            placeholder={"Last Name"}
            maxLength={8}
            onChangeText={text => {
              this.setState({
                lastName: text
              });
            }}
            value={lastName}
          />
          <CustomInput
            style={styles.input}
            placeholder={"Contact"}
            maxLength={10}
            keyboardType={"numeric"}
            onChangeText={text => {
              this.setState({
                contact: text
              });
            }}
            value={contact}
          />
          <CustomInput
            style={styles.input}
            placeholder={"Address"}
            multiline={true}
            onChangeText={text => {
              this.setState({
                address: text
              });
            }}
            value={address}
          />
          <CustomButton
            title={"Save"}
            style={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() => this.updateUserDetails()}
          />
        </View>
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
    width: "100%",
    alignItems: "center"
  },
  input: {
    width: "75%",
    height: 55,
    borderColor: "#6fc0b8",
    marginTop: 20
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6fc0b8"
  },
  buttonTitle: {
    color: "#fff"
  }
});
