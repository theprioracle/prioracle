// app/components/ListingForm.js
// View for a user to enter product information and obtain 
// a suggested price.

import React, { Component } from 'react';
import { Alert, StyleSheet, Text, KeyboardAvoidingView, Picker, ScrollView } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Card, Button, FormLabel, FormInput, FormValidationMessage, Header } from 'react-native-elements';
import { connect } from 'react-redux';

import { addListing } from '../store';

class ListingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: '',
      productDescription: '',
      productCategory: '',
      selectedCondition: 'New',
      selectedShipping: 'Buyer'
    };

    this.showErrorAlert = this.showErrorAlert.bind(this);
    this.getProductAnalysis = this.getProductAnalysis.bind(this);
  }

  showErrorAlert(inputField, userInput) {
    if (inputField === 'product-name-blank')
      Alert.alert('Product name cannot be empty!');
    else if (inputField === 'product-desc-blank')
      Alert.alert('Product description cannot be blank!');
    else if (inputField === 'product-category-blank')
      Alert.alert('Product category cannot be blank!');
    else if (inputField === 'product-category-mismatch')
      Alert.alert('Product category must match the following format:\n\nCategoryOne/CategoryTwo/CategoryThree\n' + userInput);
  }

  getProductAnalysis() {
    // Validate that user has filled out the product name field
    if (this.state.productName === '') {
      this.showErrorAlert('product-name-blank'); return;
    }
    
    // Create new listing object with our form data
    const listingObj = {
      name: this.state.productName,
      description: this.state.productDescription,
      category: this.state.productCategory,
      condition: this.state.selectedCondition,
      sellerShips: this.state.selectedShipping === 'Seller' ? new Boolean(true) : new Boolean(false),
      status: 'inactive'
    };

    const productListing = {
      listing: listingObj,
      user: this.props.user
    };

    // Submit post request with our filled-in form data
    this.props.addListingFromForm(productListing, this.props.navigation);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView 
          style={styles.container}
          behavior='padding' >

          <Card title='Add a New Listing' >
            {/* PRODUCT NAME FIELD */}
            <FormLabel labelStyle={styles.formLabel}>Product Name</FormLabel>
            <FormInput
              inputStyle={styles.inputText}
              textAlign={'center'}
              onChangeText={text => this.setState({productName: text})} />

            {/* PRODUCT DESCRIPTION FIELD */}
            <FormLabel labelStyle={styles.formLabel}>Product Description</FormLabel>
            <FormInput
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              textAlign={'center'}
              multiline={true}
              onChangeText={text => this.setState({productDescription: text})} />
            
            {/* PRODUCT CATEGORY FIELD */}
            <FormLabel labelStyle={styles.formLabel}>Product Category (/-separated)</FormLabel>
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
          </Card>
          
          <Button
            buttonStyle={styles.submitButton}
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
      backgroundColor: '#e1e8e6'
    },
    scrollContainer: {
      backgroundColor: '#e1e8e6'
    },
    headerOuterContainer: {
      height: 50
    },
    formLabel: {
      color: 'red'
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    inputText: {
      flex: 1,
      color: 'black'
    },
    submitButton: {
      backgroundColor: '#d14f4f'
    }
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addListingFromForm(listing, navigation) {
      dispatch(addListing(listing, navigation));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm);