import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import FirebaseConnection from '../FirebaseConnection.js';

class Chat extends React.Component{
  constructor(){
    super()
    this.state = {
        messages: []
      };
  }
  componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: "Welcome to Chat",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any"
            }
          }
        ]
      });
    }

 componentDidMount() {
    FirebaseConnection.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
}

    onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages)
        }));
      }

  render(){
    const name = this.props.navigation.getParam('username');

    return(
      <View style = {styles.container}>
      <GiftedChat
          messages={this.state.messages}
          onSend={FirebaseConnection.shared.send}
          user={this.user}
      />
        </View>
    )
  }

  get user() {
    // Return our name and our UID for GiftedChat to parse
    return {
      name: this.props.navigation.getParam('username'),
      _id: FirebaseConnection.shared.uid,
    };
  }


 componentWillUnmount() {
   FirebaseConnection.shared.off();
}


}
export default Chat;

var styles = StyleSheet.create({
  container:{
    flex:1,
    marginBottom:30,
  }
});
