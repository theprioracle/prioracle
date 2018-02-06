import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button, ButtonGroup, FormLabel, FormInput, Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';
import { dbUrl, RootNavigator } from '../../App';
import { fetchListings } from '../store';

export default class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {}
    };
  }

  componentDidMount() {
     const listingId = Number(this.props.navigation.state.params.id);
     console.log(listingId)
    axios.get(dbUrl + `/api/listings/${listingId}`)
      .then(res => res.data)
      .then(listing => console.log('listing is', listing))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Card title="tes"/>
    )
  }
}
