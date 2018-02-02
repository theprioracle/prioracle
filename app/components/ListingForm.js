// app/components/ListingForm.js
// View for a user to enter product information and obtain 
// a suggested price.

import React, { Component } from 'react';
import { Alert, StyleSheet, Text, KeyboardAvoidingView, Picker, ScrollView } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Card, Button, ButtonGroup, FormLabel, FormInput, FormValidationMessage, Header } from 'react-native-elements';
import { connect } from 'react-redux';

import { addListing } from '../store';

// Buttons for selecting product condition in ButtonGroup
const conditionButtons = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

// Buttons for selecting product shipping handler in ButtonGroup
const shippingButtons = ['Buyer', 'Seller'];

class ListingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: '',
      productBrand: '',
      productDescription: '',
      productCategory: '',
      selectedCondition: 0,
      selectedShipping: 0
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
      brand: this.state.productBrand,
      description: this.state.productDescription,
      category: this.state.productCategory,
      condition: conditionButtons[this.state.selectedCondition],
      sellerShips: shippingButtons[this.state.selectedShipping] === 'Seller' ? true : false,
      status: 'inactive'
    };

    const productListing = {
      listing: listingObj,
      userId: this.props.user ? this.props.user.id : 0
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

            {/* PRODUCT BRAND FIELD */}
            <FormLabel labelStyle={styles.formLabel}>Product Brand</FormLabel>
            <FormInput
              inputStyle={styles.inputText}
              textAlign={'center'}
              onChangeText={text => this.setState({productBrand: text})} />

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
            <ButtonGroup
              containerStyle={styles.buttonGroup}
              buttons={conditionButtons}
              selectedIndex={this.state.selectedCondition}
              onPress={(index) => this.setState({selectedCondition: Number(index)})}
            />

            {/* USER SHIPPING FIELD */}
            <FormLabel labelStyle={styles.formLabel}>Who pays for shipping?</FormLabel>
            <ButtonGroup
              containerStyle={styles.buttonGroup}
              buttons={shippingButtons}
              selectedIndex={this.state.selectedShipping}
              onPress={(index) => this.setState({selectedShipping: Number(index)})}
            />
          </Card>
          <Text>{'\n'}</Text>
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
      color: 'black',
      justifyContent: 'center'
    },
    buttonGroup: {
      height: 60
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