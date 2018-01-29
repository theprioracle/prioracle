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
      selectedCondition: 'New',
      selectedShipping: 'Buyer'
    };
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
            textAlign={'center'} />

          {/* PRODUCT DESCRIPTION FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Product Description</FormLabel>
          <FormInput
            inputStyle={styles.inputText}
            textAlign={'center'}
            multiline={true} />

          {/* PRODUCT TAGS FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Product Tags (TEMP: Comma separated?)</FormLabel>
          <FormInput
            inputStyle={styles.inputText}
            textAlign={'center'} />
          
          {/* PRODUCT CATEGORY FIELD */}
          <FormLabel labelStyle={styles.formLabel}>Product Category (TEMP: /-separated?)</FormLabel>
          <FormInput
            inputStyle={styles.inputText}
            textAlign={'center'} />

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
            onPress={() => this.props.navigation.navigate('Analysis')} />
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

//export default ListingForm;
export default connect(mapStateToProps)(ListingForm);