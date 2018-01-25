// App.js
// Entry point for Prioracle!

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './app/components/Login';
import ListingForm from './app/components/ListingForm';

export default RootNavigator = StackNavigator({
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
  }
});
