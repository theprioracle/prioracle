// app/components/ListingForm.js
// View for a user to enter product information and obtain 
// a suggested price.

import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Button, FormLabel, FormInput, Header } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

class Analysis extends Component {
  constructor(props) {
    super(props);

    // TODO: Set price to 
    this.state = {
      price: 0
    };
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior='padding' >
        {/* <Header
          outerContainerStyles={styles.headerOuterContainer}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Prioracle', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor='#d14f4f'
        /> */}
        <Text>ANALYSIS STUFF GOES HERE</Text>
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

export default Analysis;
