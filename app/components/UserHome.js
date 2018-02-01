// app.components/UserHome.js
// This view displays a user's home page after they have logged in.

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card title='Information for PLACEHOLDER USER'>
          <Text>This is my information! And listings. And some other stuff.</Text>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#e1e8e6'
  }
});

const mapStateToProps = (state) => {
  return {
    listings: state.listings
  };
}

export default connect(mapStateToProps)(UserHome);