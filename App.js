// App.js
// Entry point for Prioracle!

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './app/components/Login';
import ListingForm from './app/components/ListingForm';
import Analysis from './app/components/Analysis';
import { Header } from 'react-native-elements';
import * as firebase from "firebase";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // TEMP: Testing out Firebase for our backend needs
    var config = {
      apiKey: "AIzaSyCTQl0kvUuW-Q7VQgdISik_6I-72foW620",
      authDomain: "prioracle-ad317.firebaseapp.com",
      databaseURL: "https://prioracle-ad317.firebaseio.com",
      projectId: "prioracle-ad317",
      storageBucket: "prioracle-ad317.appspot.com",
      messagingSenderId: "910431056594"
    };

    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Header
          outerContainerStyles={styles.headerOuterContainer}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Prioracle', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor='#d14f4f'
        /> */}
        <RootNavigator />
      </View>
    );
  }
}

const RootNavigator = StackNavigator({
  Main: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    }
  },
  ListingForm: {
    screen: ListingForm,
    navigationOptions: {
      title: 'Add a New Listing'
    }
  },
  Analysis: {
    screen: Analysis,
    navigationOptions: {
      title: 'Product Analysis'
    }
  }
});

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#d14f4f'
  },
  headerOuterContainer: {
    height: 50
  }
});
