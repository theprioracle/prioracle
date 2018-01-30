// App.js
// Entry point for Prioracle!

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation';
import Login from './app/components/Login';
import ListingForm from './app/components/ListingForm';
import ProductAnalysis from './app/components/ProductAnalysis';
import { Icon } from 'react-native-elements';
import * as firebase from "firebase";

import store, { fetchListings } from  './app/store';
import HeaderOptions from './app/components/HeaderOptions';

// TODO: Don't forget to change this to our deployed DB URL later!
export const dbUrl = 'http://172.16.23.244:8080';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Fetch all listings in our top-level component
    store.dispatch(fetchListings());

    // TEMP: Testing out Firebase for our backend needs, remove once authentication is working with another method
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
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

const RootNavigator = StackNavigator({
  Main: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  ListingForm: {
    screen: ListingForm,
    navigationOptions: {
      title: 'Add a New Listing',
      headerRight: <Icon name='menu' />
    }
  },
  Analysis: {
    path: 'listings/:id',
    screen: ProductAnalysis,
    navigationOptions: {
      title: 'Product Analysis',
      headerRight: <Icon name='menu' />
    }
  }
});

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
