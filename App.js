// App.js
// Entry point for Prioracle!

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './app/components/Home';
import ListingForm from './app/components/ListingForm';

export default RootNavigator = StackNavigator({
  Main: {
      screen: Home,
      navigationOptions: {
        title: 'Prioracle',
      }
  },
  ListingForm: {
    screen: ListingForm,
    navigationOptions: {
      title: 'Add a New Listing'
    }
  }
});
