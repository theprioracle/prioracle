// app.components/UserListings.js
// This view displays a user's listings.

import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, ScrollView, View } from 'react-native';
import { Card, Divider, List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';

import { dbUrl } from '../../App';

// // Subcomponent for rendering a single listing
// class UserListingItem extends Component {
//   constructor(props) {
//     super(props);

//   }

//   render() {
//     return (
//       <View style={styles.listingItem}>
//         <Text>{this.props.title}</Text>
//       </View>
//     )
// }

class UserListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userListings: []
    };
  }

  componentDidMount() {
    // Fetch listings associated with logged-in user
    axios.get(dbUrl + `/api/users/${this.props.user.id}/listings`)
      .then(res => res.data)
      .then(listings => this.setState({ userListings: listings }))
      .catch(error => console.log(error));
  }

  render() {
    
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card title={`Listings for ${this.props.user && this.props.user.fullName}`}>

          {/* <List>
          {
            this.state.userListings.map(listing => (
              <ListItem 
                key={listing.id}
                title={listing.name}
                onPress={() => this.props.navigation.navigate('Analysis', { id: listing.id })}
              />
            ))
          }
          </List> */}
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
  },
  listingItem: {
    flex: 1,
    flexDirection: 'row'
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(UserListing);
