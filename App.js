// App.js
// Entry point for Prioracle!

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation';
import Login from './app/components/Login';
import ListingForm from './app/components/ListingForm';
import Analysis from './app/components/Analysis';
import { Icon } from 'react-native-elements';
import * as firebase from "firebase";

import store, { fetchListings } from  './app/store';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    console.log("DEBUG: App component mounted!");

    store.dispatch(fetchListings());

    // TEMP: Testing out Firebase for our backend needs
    // var config = {
    //   apiKey: "AIzaSyCTQl0kvUuW-Q7VQgdISik_6I-72foW620",
    //   authDomain: "prioracle-ad317.firebaseapp.com",
    //   databaseURL: "https://prioracle-ad317.firebaseio.com",
    //   projectId: "prioracle-ad317",
    //   storageBucket: "prioracle-ad317.appspot.com",
    //   messagingSenderId: "910431056594"
    // };

    // firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#d14f4f'
  },
  headerContainer: {
    backgroundColor: '#d14f4f'
  }
});

const RootNavigator = StackNavigator({
  Main: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerStyle: styles.headerContainer
    }
  },
  ListingForm: {
    screen: ListingForm,
    navigationOptions: {
      title: 'Add a New Listing',
      headerRight: <Icon name='menu' />,
      headerStyle: styles.headerContainer
    }
  },
  Analysis: {
    screen: Analysis,
    navigationOptions: {
      title: 'Product Analysis'
    }
  }
});
