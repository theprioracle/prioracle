// app/components/ListingForm.js
// View for a user to enter product information and obtain 
// a suggested price.

import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

class ListingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: ''
    };
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior='padding' >

        {/* PRODUCT NAME FIELD */}
        <FormLabel labelStyle={styles.formLabel}>Product Name</FormLabel>
        <FormInput
          inputStyle={styles.inputText}
          textAlign={'center'}          
          onChangeText={text => console.log("Product name:", text)} />

        {/* PRODUCT DESCRIPTION FIELD */}
        <FormLabel labelStyle={styles.formLabel}>Product Description</FormLabel>
        <FormInput
          inputStyle={styles.inputText}
          textAlign={'center'}
          multiline={true}          
          onChangeText={text => console.log("Product name:", text)} />

        {/* TODO: Find a better way to format newlines */}
        <Text>{"\n"}</Text>
        <Button
          title='Crunch the numbers!'
          onPress={() => console.log('Crunchin...')} />
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

export default ListingForm;