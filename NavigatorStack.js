import React from "react";
import { View, Text ,Button, StackActions} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './Components/Home.js';
import Chat from './Components/Chat.js';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Chat: {
    screen: Chat,
  },
}, {
    initialRouteName: 'Home',
});

const App = createAppContainer(AppNavigator);
export default App;
