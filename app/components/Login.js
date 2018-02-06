// app.components/Login.js
// Landing view for our app!

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator, NavigationActions } from 'react-navigation';

import * as firebase from "firebase";
import {auth} from '../store';
import { connect } from 'react-redux';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    this.handleLoginButtonPress = this.handleLoginButtonPress.bind(this);
    this.handleSignupButtonPress = this.handleSignupButtonPress.bind(this);
  }


  async signup(email, pass) {
    try {
        await firebase.auth()
          .createUserWithEmailAndPassword(email, pass);

        console.log("Creating a new account for ", email);

        this.props.navigation.navigate('ListingForm');

    } catch (error) {
        console.log(error.toString())
    }
  }

  // Updates local component state with contents of username input field
  handleUsernameInputChange(text) {
    this.setState({ username: text });
  }

  // Updates local component state with contents of password input field
  handlePasswordInputChange(text) {
    this.setState({ password: text });
  }

  handleLoginButtonPress() {
    this.props.login(this.state.username, this.state.password, 'login', this.props.navigation);
  }

  handleSignupButtonPress() {
    this.props.navigation.navigate('Listing', { id: 1 });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding' >
        <Text style={styles.titleText}>π r i o r a c l e{'\n\n\n'}</Text>
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

        <Text>{'\n'}</Text>
        <Button
          title='Log In'
          icon={{ name: 'hot-tub' }}
          raised={true}
          onPress={() => this.handleLoginButtonPress()} />
        <Text>{'\n'}</Text>
        <Button
          title='Sign Up'
          icon={{ name: 'add' }}
          raised={true}
          onPress={() => this.handleSignupButtonPress()} />
      </KeyboardAvoidingView>
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
    color: 'white',
    alignItems: 'center'
  },
  inputLabel: {
    color: 'white'
  },
  inputText: {
    color: 'white',
    padding: 5
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    login (email, password, method, navigation) {
      dispatch(auth(email, password, method, navigation))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);
