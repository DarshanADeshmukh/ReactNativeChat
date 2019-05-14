import React, {
  Component
} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor() {
    super()
    this.state = {
      name: '',
    }
  }

  render() {
    return ( <
      View style = {
        styles.container
      } >
      <
      Text style = {
        styles.text
      } > Enter user name: < /Text> <
      TextInput style = {
        styles.textInput
      }
      onChangeText = {
        (name) => this.setState({
          name
        })
      }
      value = {
        this.state.name
      }
      /> <
      Button title = "Submit"
      onPress = {
        this.nextScreen.bind(this)
      }
      /> < /
      View >
    )
  }
  // navigate to chat screen.
  nextScreen = () => {
    this.props.navigation.navigate('Chat', {
      username: this.state.name
    });
  }

}

export default Home;

var styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 20,
  },
  text: {
    marginLeft: 20,
  },
  container: {
    flex: 1,
    marginTop: 50,
  }
})
