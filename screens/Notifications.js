import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";

import MyHeader from "../components/MyHeader";

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotifications: []
    };

    this.notificationRef = null;
  }

  getNotifications = () => {
    const { userId } = this.state;
    this.requestRef = db
      .collection("all_notifications")
      .where("notification_status", "==", "unread")
      .where("targeted_user_id", "==", userId)
      .onSnapshot(
        snapshot => {
          let notifications = [];
          snapshot.docs.map(doc => {
            let notification = doc.data();
            notification["doc_id"] = doc.id;
            notifications.push(notification);
          });
          this.setState({
            allNotifications: notifications
          });
        },
        () => {
          this.notificationRef();
        }
      );
  };

  componentDidMount() {
    this.getNotifications();
  }

  componentWillUnmount() {
    this.notificationRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        leftElement={
          <Icon name={"book"} type={"font-awesome"} color={"#696969"} />
        }
        title={item.book_name}
        titleStyle={styles.title}
        subtitle={item.message}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <MyHeader
            title={"Notifications"}
            navigation={this.props.navigation}
          />
        </View>
        <View style={styles.lowerContainer}>
          {this.state.allNotifications.length === 0 ? (
            <View style={styles.emptyList}>
              <Image source={require("../assets/Notification.png")} />
              <Text style={styles.emptyListTitle}>
                You have no notifications
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allNotifications}
              renderItem={this.renderItem}
            />
          )}
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
    flex: 0.12
  },
  lowerContainer: {
    flex: 0.88
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyListTitle: {
    fontSize: 25
  },
  title: {
    color: "#000",
    fontWeight: "bold"
  }
});
