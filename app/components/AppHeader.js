// Header.js
// This file contains the component that displays our app bar.

import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import HeaderMenu from './HeaderMenu';
import HeaderHome from './HeaderHome';

const AppHeader = ({ navigation }) => (
  <View>
    <StatusBar barStyle="light-content" />
    <Header
      outerContainerStyles={styles.headerContainer}
      leftComponent={<HeaderMenu />}
      centerComponent={{ text: 'P r i o r a c l e', style: { color: '#fff' } }}
      rightComponent={<HeaderHome />}
    />
  </View>
);

const styles = StyleSheet.create({
  headerContainer: { 
    backgroundColor: '#d14f4f'
  }
});

export default AppHeader;