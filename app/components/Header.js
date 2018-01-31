// Header.js
// This file contains the component that displays our app bar.

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Header = ({ navigation }) => (
  <Header
    outerContainerStyles={styles.headerOuterContainer}
    leftComponent={{ icon: 'menu', color: '#fff' }}
    centerComponent={{ text: 'Prioracle', style: { color: '#fff', fontSize: 20 } }}
    rightComponent={{ icon: 'home', color: '#fff' }}
    backgroundColor='#d14f4f'
  />
);

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#b7513c'
  }
});

export default Header;