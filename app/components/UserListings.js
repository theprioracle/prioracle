// app.components/UserListings.js
// This view displays a user's listings.

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

class UserListing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.listings && (
      <ScrollView contentContainerStyle={styles.container}>
        <Card title='Listings for PLACEHOLDER USER'>
          {
            this.props.listings.map(listing => (
              <Text key={listing.id}>
                {listing.name}{'\n'}
              </Text>
            ))
          }
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

export default connect(mapStateToProps)(UserListing);
