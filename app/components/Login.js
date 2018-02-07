// app.components/Login.js
// Landing view for our app!

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {auth} from '../store';
import { connect } from 'react-redux';
import Expo from 'expo';
import axios from 'axios';
import { dbUrl } from '../../App';



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
    this.handleGoogleButtonPress = this.handleGoogleButtonPress.bind(this);

  }


  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '944065793816-bd6h1g49g6nrebc09lt4p36g4pl397jl.apps.googleusercontent.com',
        iosClientId: '944065793816-mihnibeji24042fln57o5n3frhss4jlj.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
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
    this.props.navigation.navigate('Signup');
  }

  handleGoogleButtonPress() {
    this.signInWithGoogleAsync()
    .then(response => {
      let 
        email = response.user.email,
        firstName = response.user.givenName,
        lastName = response.user.familyName,
        googleId  = response.user.id;     
      console.log(email, firstName, lastName, googleId)
      })
    .catch(err => console.error(err))
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
          autoCapitalize='none'
          onChangeText={text => this.handleUsernameInputChange(text)} />
        <FormLabel labelStyle={styles.inputLabel}>Password</FormLabel>
        <FormInput
          inputStyle={styles.inputText}
          textAlign={'center'}
          autoCapitalize='none'
          onChangeText={text => this.handlePasswordInputChange(text)}
          secureTextEntry={true} />

        <Text>{'\n'}</Text>
        <Button
          title='Log In'
          icon={{ name: 'hot-tub', size: 20 }}
          raised={true}
          onPress={() => this.handleLoginButtonPress()} />
        <Text>{'\n'}</Text>
        <Button
          title='Log In with Google'
          icon={{ name: 'hot-tub' }}
          raised={true}
          onPress={() => this.handleGoogleButtonPress()} />
        <Text>{'\n'}</Text>
        <Button
          title='Sign Up'
          icon={{ name: 'add', size: 20 }}
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
