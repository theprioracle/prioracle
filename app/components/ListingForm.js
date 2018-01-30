// app/components/ListingForm.js
// View for a user to enter product information and obtain 
// a suggested price.

import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Picker, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, Header } from 'react-native-elements';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { addListing } from '../store';

class ListingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: '',
      productDescription: '',
      productTags: '',
      productCategory: '',
      selectedCondition: 'New',
      selectedShipping: 'Buyer'
    };

    this.getProductAnalysis = this.getProductAnalysis.bind(this);
  }

  getProductAnalysis() {
    // Create new listing object with our form data
    const listingObj = {
      name: this.state.productName,
      description: this.state.productDescription,
      category: this.state.productCategory,
      condition: this.state.selectedCondition,
      sellerShips: this.state.selectedShipping === 'Seller' ? true : false,
      status: 'inactive'
    };

    console.log("Before post:", listingObj);

    // Submit post request with our filled-in form data
    this.props.addListingFromForm(listingObj, this.props.navigation);
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <KeyboardAvoidingView 
          style={styles.container}
          behavior='padding' >

          {/* PRODUCT NAME FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Product Name</FormLabel>
          <FormInput
            inputStyle={styles.inputText}
            textAlign={'center'}
            onChangeText={text => this.setState({productName: text})} />

          {/* PRODUCT DESCRIPTION FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Product Description</FormLabel>
          <FormInput
            inputStyle={styles.inputText}
            textAlign={'center'}
            multiline={true}
            onChangeText={text => this.setState({productDescription: text})} />

          {/* PRODUCT TAGS FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Product Tags (TEMP: Comma separated?)</FormLabel>
          <FormInput
            inputStyle={styles.inputText}
            textAlign={'center'}
            onChangeText={text => this.setState({productTags: text})} />
          
          {/* PRODUCT CATEGORY FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Product Category (TEMP: /-separated?)</FormLabel>
          <FormInput
            inputStyle={styles.inputText}
            textAlign={'center'}
            onChangeText={text => this.setState({productCategory: text})} />

          {/* PRODUCT CONDITION FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Product Condition</FormLabel>
          <Picker
            selectedValue={this.state.selectedCondition}
            onValueChange={(itemValue) => this.setState({selectedCondition: itemValue})}>
            <Picker.Item label="New" value="New" />
            <Picker.Item label="Used" value="Used" />
            <Picker.Item label="Like New" value="Like New" />
          </Picker>

          {/* USER SHIPPING FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Who pays for shipping?</FormLabel>
          <Picker
            selectedValue={this.state.selectedShipping}
            onValueChange={(itemValue) => this.setState({selectedShipping: itemValue})}>
            <Picker.Item label="Buyer" value="Buyer" />
            <Picker.Item label="Seller" value="Seller" />
          </Picker>

          {/* TODO: Find a better way to format newlines */}
          <Text>{"\n"}</Text>
          <Button
            title='Crunch the numbers!'
            onPress={() => this.getProductAnalysis()} />
          <Text>{"\n"}</Text>
        </KeyboardAvoidingView>
      </ScrollView>
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
    },
    contentContainer: {
      paddingVertical: 20
    }
});

const mapStateToProps = (state) => {
  return {
    listings: state.listings
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addListingFromForm(listing, navigation) {
      dispatch(addListing(listing, navigation));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm);