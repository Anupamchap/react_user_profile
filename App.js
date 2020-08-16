import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import SearchScreen from "./src/screens/SearchScreen";
import UserScreen from "./src/screens/UserScreen";
import PhotoScreen from "./src/screens/PhotoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./src/store";
import { Provider } from "react-redux";

const StackNew = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer store={store}>
        <StackNew.Navigator initialRouteName="SearchScreen">
          <StackNew.Screen name="Search" component={SearchScreen} />
          <StackNew.Screen name="User Details" component={UserScreen} />
          <StackNew.Screen name="Photos" component={PhotoScreen} />
        </StackNew.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
