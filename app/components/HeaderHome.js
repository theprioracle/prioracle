// app/components/HeaderHome.js
// Button for navigating back to home from header

import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';

export default HeaderHome = ({navigation}) => (
  <Icon name='home' onPress={console.log("Detected press on home button!")} />
);

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