// app/components/ListingForm.js
// View for a user to enter product information and obtain 
// a suggested price.

import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Button, FormLabel, FormInput, Header } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';

import { dbUrl } from '../../App';
import { fetchListings } from '../store';

class ProductAnalysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: {},
      selectedPrice: 0
    };
  }

  async componentDidMount() {
    const listingId = Number(this.props.navigation.state.params.id);

    // Fetch listing associated with the listing ID param
    const currentListing = await axios.get(dbUrl + `/api/listings/${listingId}`);

    this.setState({ 
      listing: currentListing.data,
      selectedPrice: currentListing.data.prices[currentListing.data.prices.length - 1].metaPrice
    });
  }

  render() {
    const prices = this.state.listing.prices;

    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior='padding' >
        <Text>{'\n\n'}Pricing Analysis for {`${this.state.listing && this.state.listing.name}`}</Text>
        <Text>{'\n\n'}Algorithm Price: {`${prices && prices[prices.length - 1].algoPrice}`}</Text>
        <Text>{'\n\n'}Scraper Price: {`${prices && prices[prices.length - 1].scraperPrice}`}</Text>
        <Text>{'\n\n'}Meta Price: {`${prices && prices[prices.length - 1].metaPrice}`}</Text>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#b7513c'
    },
    headerOuterContainer: {
      height: 50
    },
    formLabel: {
      color: 'white'
    },
    inputContainer: {
      justifyContent: 'center'
    },
    inputText: {
      color: 'white'
    }
});

const mapStateToProps = (state) => {
  return {
    listings: state.listings.sort((a, b) => b.id - a.id)
  };
}

export default connect(mapStateToProps)(ProductAnalysis);
