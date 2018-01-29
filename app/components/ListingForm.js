// app/components/ListingForm.js
// View for a user to enter product information and obtain 
// a suggested price.

import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Picker, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, Header } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

//import Header from './Header';

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

    this.getSuggestedPrice = this.getSuggestedPrice.bind(this);
  }

  // TEMP: For verifying react-redux connect
  componentDidMount() {
    console.log("ListingForm: Testing redux store");
    if (this.props.listings)
      console.log("LISTINGS:", this.props.listings);
  }

  getSuggestedPrice() {
    console.log("Before the analysis --");
    console.log("Name:", this.state.productName);
    console.log("Description:", this.state.productDescription);
    console.log("Tags:", this.state.productTags);
    console.log("Category:", this.state.productCategory);
    console.log("Condition:", this.state.selectedCondition);
    console.log("Shipping:", this.state.selectedShipping);

    this.props.navigation.navigate('Analysis');
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <KeyboardAvoidingView 
          style={styles.container}
          behavior='padding' >
          <Header
            outerContainerStyles={styles.headerOuterContainer}
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Prioracle', style: { color: '#fff', fontSize: 20 } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            backgroundColor='#d14f4f'
          />

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
            <Picker.Item label="New" value="new" />
            <Picker.Item label="Used" value="used" />
            <Picker.Item label="Like New" value="like-new" />
          </Picker>

          {/* USER SHIPPING FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Who pays for shipping?</FormLabel>
          <Picker
            selectedValue={this.state.selectedShipping}
            onValueChange={(itemValue) => this.setState({selectedShipping: itemValue})}>
            <Picker.Item label="Buyer" value="buyer" />
            <Picker.Item label="Seller" value="seller" />
          </Picker>

          {/* TODO: Find a better way to format newlines */}
          <Text>{"\n"}</Text>
          <Button
            title='Crunch the numbers!'
            onPress={() => this.getSuggestedPrice()} />
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

export default connect(mapStateToProps)(ListingForm);