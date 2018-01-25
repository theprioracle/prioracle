// app.components/Home.js
// Landing view for our app!
// NOTE: Home view is currently just a login screen, could add in 
// additional views for introducing what our app does.

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
  }

  // Updates local component state with contents of username input field
  handleUsernameInputChange(text) {
    this.setState({ username: text });
  }

  // Updates local component state with contents of password input field
  handlePasswordInputChange(text) {
    this.setState({ password: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>P r i o r a c l e{"\n\n\n"}</Text>
        <FormLabel labelStyle={styles.inputLabel}>Username</FormLabel>
        <FormInput
          inputStyle={styles.inputText}
          textAlign={'center'}
          onChangeText={text => this.handleUsernameInputChange(text)} />
        <FormLabel labelStyle={styles.inputLabel}>Password</FormLabel>
        <FormInput
          inputStyle={styles.inputText}
          textAlign={'center'}          
          onChangeText={text => this.handlePasswordInputChange(text)}
          secureTextEntry={true} />
        <Button
          title='Log In' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d14f4f'
  },
  titleText: {
    fontSize: 35,
    color: 'white'
  },
  inputLabel: {
    color: 'white'
  },
  inputText: {
    color: 'white'
  }
});

export default Home;