/*This is an Example of SearchBar in React Native*/
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SearchBar } from "react-native-elements";
import agent from "../agent";
import { connect } from "react-redux";
import { UPDATE_USER_LIST } from "../constants/actionTypes";

const mapStateToProps = (state) => ({
  dataSource: state.userList.dataSource,
  isLoading: state.userList.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onUserListUpdate: (dataSource, isLoading) => {
    console.log(dataSource);
    dispatch({ type: UPDATE_USER_LIST, dataSource, isLoading });
  },
});

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.search = null;
    this.page = 1;
  }
  componentDidMount() {
    this.getUserList("a", this.page);
  }

  getUserList = (text, page) => {
    agent.User.get(text, page)
      .then((responseJson) => {
        this.props.onUserListUpdate(responseJson.results, false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    this.getUserList(text, this.page);
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: "100%",
          backgroundColor: "#080808",
        }}
      />
    );
  };

  openUserScreen = (user) => {
    console.log(user);
    this.props.navigation.navigate("User Details", {
      user: user,
    });
  };

  render() {
    if (this.props.isLoading) {
      // Loading View while data is loading

      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type Here..."
          value={this.search}
        />
        {this.props.dataSource.length ? (
          <FlatList
            data={this.props.dataSource}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <Text
                style={styles.textStyle}
                onPress={() => this.openUserScreen(item)}
              >
                {item.name}
              </Text>
            )}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={{ flex: 1, padding: 20 }}>No such user exist.</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 30 : 0,
  },
  textStyle: {
    padding: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
