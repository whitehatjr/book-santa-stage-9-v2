import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import CustomButton from "../components/CustomButton";

export default class BookDonateScreen extends Component {
  constructor() {
    super();
    this.state = {
      requestedBooksList: []
    };
    this.requestRef = null;
  }

  componentDidMount() {
    this.getRequestedBooksList();
  }

  getRequestedBooksList = () => {
    this.requestRef = db.collection("requested_books").onSnapshot(
      snapshot => {
        var requestedBooksList = snapshot.docs.map(document => document.data());
        this.setState({
          requestedBooksList: requestedBooksList
        });
      },
      error => {
        this.requestRef();
      }
    );
  };

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <Icon
            name={"open-in-new"}
            type={"material-icons"}
            size={30}
            color={"#6fc0b8"}
            containerStyle={{
              width: 100,
              alignItems: "flex-end"
            }}
            onPress={() => {
              this.props.navigation.navigate("RecieverDetails", {
                details: item
              });
            }}
          />
        }
        bottomDivider
      />
    );
  };

  render() {
    var { requestedBooksList } = this.state;
    return (
      <View style={styles.container}>
        <MyHeader title={"Donate Books"} navigation={this.props.navigation} />
        {this.state.requestedBooksList.length === 0 ? (
          <View style={styles.emptyListContainer}>
            <Text style={styles.title}>List Of All Requested Books</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={requestedBooksList}
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
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20
  },
  button: {
    width: 100,
    height: 40
  },
  buttonText: {
    fontWeight: "400"
  }
});
