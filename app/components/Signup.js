// app.components/Login.js
// Landing view for our app!
// NOTE: Home view is currently just a login screen, could add in 
// additional views for introducing what our app does.

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { signup } from '../store';
import { connect } from 'react-redux';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: ''
    };

    this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    this.handleFirstNameInputChange = this.handleFirstNameInputChange.bind(this);
    this.handleLastNameInputChange = this.handleLastNameInputChange.bind(this);
    this.handleSignupButtonPress = this.handleSignupButtonPress.bind(this);
  }

  // Updates local component state with contents of username input field
  handleUsernameInputChange(text) {
    this.setState({ username: text });
  }

  // Updates local component state with contents of password input field
  handlePasswordInputChange(text) {
    this.setState({ password: text });
  }

  handleFirstNameInputChange(text) {
    this.setState({ firstName: text });
  }
  handleLastNameInputChange(text) {
    this.setState({ lastName: text });
  }

  handleSignupButtonPress() {
    this.props.userSignup(this.state.username, this.state.password, this.props.navigation, this.state.firstName, this.state.lastName)
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
        <FormLabel labelStyle={styles.inputLabel}>First Name</FormLabel>
        <FormInput
          inputStyle={styles.inputText}
          textAlign={'center'}          
          onChangeText={text => this.handleFirstNameInputChange(text)} />
        <FormLabel labelStyle={styles.inputLabel}>Last Name</FormLabel>
        <FormInput
          inputStyle={styles.inputText}
          textAlign={'center'}          
          onChangeText={text => this.handleLastNameInputChange(text)} />

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
    userSignup (email, password, method, navigation, firstName, lastName) {
      dispatch(signup(email, password, method, navigation, firstName, lastName))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);
