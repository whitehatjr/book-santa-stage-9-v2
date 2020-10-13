import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config.js";

import MyHeader from "../components/MyHeader";
import CustomButton from "../components/CustomButton";

export default class MyDonationScreen extends Component {
  constructor() {
    super();
    this.state = {
      donorId: firebase.auth().currentUser.email,
      allDonations: []
    };
    this.requestRef = null;
  }

  componentDidMount() {
    this.getDonations();
  }

  getDonations = () => {
    const { donorId } = this.state;
    this.requestRef = db
      .collection("all_donations")
      .where("donor_id", "==", donorId)
      .onSnapshot(
        snapshot => {
          let donations = [];
          snapshot.docs.map(doc => {
            let details = doc.data();
            details["doc_id"] = doc.id;
            donations.push(details);
          });
          this.setState({
            allDonations: donations
          });
        },
        () => {
          this.requestRef();
        }
      );
  };

  handleSendBook = bookDetails => {
    const donationRef = db.collection("all_donations").doc(bookDetails.doc_id);
    const { request_status } = bookDetails;
    const requestStatus =
      request_status === "Book Sent" ? "Donor Interested" : "Book Sent";

    donationRef.update({
      request_status: requestStatus
    });
    this.sendNotification(bookDetails, requestStatus);
  };

  sendNotification = (bookDetails, requestStatus) => {
    const { request_id, donor_id } = bookDetails;
    db.collection("all_notifications")
      .where("request_id", "==", request_id)
      .where("donor_id", "==", donor_id)
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          const message =
            requestStatus === "Book Sent"
              ? `${this.state.donorName} sent you book`
              : `${this.state.donorName} has shown interest in donating the book`;

          db.collection("all_notifications")
            .doc(doc.id)
            .update({
              message: message,
              notification_status: "unread",
              date: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
      });
  };

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.book_name}
      subtitle={
        "Requested By : " +
        item.requested_by +
        "\nStatus : " +
        item.request_status
      }
      leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
      titleStyle={styles.title}
      rightElement={
        <CustomButton
          title={
            item.request_status === "Book Sent" ? "Book Sent" : "Send Book"
          }
          style={[
            styles.button,
            {
              backgroundColor:
                item.request_status === "Book Sent" ? "green" : "#fff"
            }
          ]}
          titleStyle={[
            styles.buttonText,
            {
              color: item.request_status === "Book Sent" ? "#fff" : "#000"
            }
          ]}
          onPress={() => {
            this.handleSendBook(item);
          }}
        />
      }
      bottomDivider
    />
  );

  render() {
    return (
      <View sytyle={styles.container}>
        <MyHeader navigation={this.props.navigation} title="My Donations" />
        {this.state.allDonations.length === 0 ? (
          <View style={styles.emptyList}>
            <Text style={styles.emptyListTitle}>
              List of all book Donations
            </Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.allDonations}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: "#000",
    fontWeight: "bold"
  },
  emptyList: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyListTitle: {
    fontSize: 20
  },
  button: {
    width: 110,
    height: 45
  },
  buttonText: {
    fontSize: 17
  }
});
