import React, { Component } from "react";
import { View } from "react-native";
import { Header, Icon, Badge } from "react-native-elements";
import { StyleSheet } from "react-native";
import db from "../config";

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  componentDidMount() {
    this.notificationCount();
  }

  notificationCount() {
    db.collection("all_notifications")
      .where("notification_status", "==", "unread")
      .onSnapshot(snapshot => {
        this.setState({
          value: snapshot.docs.length
        });
      });
  }

  BellIconWithBadge = () => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="#696969"
          size={25}
          onPress={() => this.props.navigation.navigate("Notifications")}
        />
        <Badge
          value={this.state.value}
          containerStyle={styles.badgeContainer}
        />
      </View>
    );
  };

  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name={"bars"}
            type={"font-awesome"}
            color={"#696969"}
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: styles.title
        }}
        rightComponent={<this.BellIconWithBadge {...this.props} />}
        backgroundColor={"#6fc0b8"}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -4
  }
});
