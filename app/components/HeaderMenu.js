// app/components/HeaderOptions.js
// Modal for showing dropdown menu from header

import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';

const menuOptions = ['Add New Listing', 'View Your Listings', 'Logout']

export default HeaderMenu = () => (
  <ModalDropdown 
    options={menuOptions}
    dropdownTextStyle={styles.dropdownContainer} >
    <Icon name='menu' />
  </ModalDropdown>
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
  },
  dropdownContainer: {
    size: 24
  }
});