// app.components/Home.js
// Landing view for our app!

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

  // handleUsernameInputChange
  // Updates local component state with whatever is currently in username input field
  handleUsernameInputChange() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>$$$ Welcome to Prioracle! $$${"\n\n\n"}</Text>
        <FormLabel>Username</FormLabel>
        <FormInput
          onChangeText={this.handleUsernameInputChange} />
        <FormLabel>Password</FormLabel>
        <FormInput />
        <Button
          title='Log In' />
      </View>
    );
  }
}

// TODO: Remove original dummy component code, keeping here for now
// const Home = ({ navigation }) => (
//   <View style={styles.container}>
//     <Text>$$$ Welcome to Prioracle! $$${"\n\n\n"}</Text>
//     <FormLabel>Username</FormLabel>
//     <FormInput />
//     <FormLabel>Password</FormLabel>
//     <FormInput />
//     <Button
//       title='Log In' />
//   </View>
// );

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d14f4f'
  },
  titleText: {
    fontSize: 30
  },
  inputField: {
    backgroundColor: '#fff',
    borderColor: 'gray', 
    borderWidth: 1,
    height: 40
  }
});

export default Home;