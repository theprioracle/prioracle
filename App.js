// App.js
// Entry point for Prioracle!

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation';
import Login from './app/components/Login';
import ListingForm from './app/components/ListingForm';
import ProductAnalysis from './app/components/ProductAnalysis';
import { Icon, Header } from 'react-native-elements';
import * as firebase from "firebase";

import store, { fetchListings } from  './app/store';
import AppHeader from './app/components/AppHeader';
import UserHome from './app/components/UserHome';

// Use this link to access our backend!
export const dbUrl = 'http://172.16.23.244:8080';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Fetch all listings in our top-level component
    store.dispatch(fetchListings());

    // Testing out Firebase for our backend needs, remove once authentication is working with another method
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

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#d14f4f'
  },
  headerContainer: {
    backgroundColor: '#d14f4f',
    padding: 20
  }
});

const RootNavigator = StackNavigator({
  Main: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  UserHome: {
    screen: UserHome,
    navigationOptions: {
      title: 'Home',
      header: <AppHeader />
    }
  },
  ListingForm: {
    screen: ListingForm,
    navigationOptions: {
      title: 'Add a New Listing',
      header: <AppHeader />
    }
  },
  Analysis: {
    path: 'listings/:id',
    screen: ProductAnalysis,
    navigationOptions: {
      title: 'Product Analysis',
      header: <AppHeader />
    }
  }
});
