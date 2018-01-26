// app/components/ListingForm.js
// View for a user to enter product information and obtain 
// a suggested price.

import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Button, FormLabel, FormInput, Header } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

//import Header from './Header';

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

        {/* TODO: Find a better way to format newlines */}
        <Text>{"\n"}</Text>
        <Button
          title='Crunch the numbers!'
          onPress={() => this.props.navigation.navigate('Analysis')} />
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

export default ListingForm;