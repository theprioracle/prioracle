// app.components/UserHome.js
// This view displays a user's home page after they have logged in.

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card containerStyle={{alignItems: 'stretch'}} titleStyle={{ color: 'red' }} title={`Information for ${this.props.user &&this.props.user.fullName}`}>
          <Text>This is my information! And listings. And some other stuff.{'\n\n'}</Text>
          <Text>What would you like to do?{'\n'}</Text>
          <Button
            buttonStyle={styles.optionButton}
            textStyle={styles.optionText}
            title="Add a new listing"
            onPress={() => this.props.navigation.navigate('ListingForm')} 
          />
          <Button 
            buttonStyle={styles.optionButton}
            textStyle={styles.optionText}
            title="View my listings" 
            onPress={() => this.props.navigation.navigate('UserListings')} 
          />
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#e1e8e6',
    alignItems: 'stretch'
  },
  optionButton: {
    backgroundColor: 'white'
  },
  optionText: {
    color: 'black'
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(UserHome);