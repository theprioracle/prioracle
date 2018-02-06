// app/components/UserSettings.js
// This components allows a user to view or modify their settings.

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

export default class ListingError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card titleStyle={{fontSize: 22}} title='Error!'>
          <Text style={styles.errorText}>{'\n'}There was an issue processing your product listing.{'\n\n'}Please verify that you have filled in the correct information, or try filling in the fields you have not filled in.</Text>
        </Card>
        <Button
          title='OK'
          onPress={() => this.props.navigation.navigate('ListingForm')}
        />
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
  errorText: {
    fontSize: 18
  }
});
