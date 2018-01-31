// app/components/HeaderOptions.js
// Modal for showing dropdown menu from header

import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';

const menuOptions = [
  'Add New Listing',      // ListingForm
  'View Your Listings', 
  'Logout'
];

export default class HeaderMenu extends Component {
  constructor(props) {
    super(props);

    this.handleMenuSelection = this.handleMenuSelection.bind(this);
  }

  handleMenuSelection(index, value) {
    // Navigate to view associated with each option
    if (value === 'Add New Listing')
      this.props.navigation.navigate('ListingForm');
    else (value === 'View Your Listings')
      this.props.navigation.navigate('UserHome');
  }

  render() {
    return (
      <ModalDropdown 
        options={menuOptions}
        dropdownTextStyle={styles.dropdownContainer}
        onSelect={this.handleMenuSelection} >
        <Icon name='menu' />
      </ModalDropdown>
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
  },
  dropdownContainer: {
    fontSize: 16
  }
});