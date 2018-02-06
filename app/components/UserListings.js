// app.components/UserListings.js
// This view displays a user's listings.

import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, ScrollView, View } from 'react-native';
import { Button, Card, Divider, List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';

import { dbUrl } from '../../App';
import { deleteListing } from '../store/index';

// Subcomponent for rendering a single listing
class UserListingItem extends Component {
  constructor(props) {
    super(props);

    this.handleListingClick = this.handleListingClick.bind(this);
    this.handleListingDelete = this.handleListingDelete.bind(this);
  }

  handleListingClick() {
    this.props.navigation.navigate('Analysis', { id: this.props.itemId });
  }

  handleListingDelete() {
    this.props.deleteUserListing(this.props.itemId);
  }

  render() {
    return (
      <View style={styles.listingItem}>
        <Text 
          style={styles.itemText}
          onPress={this.handleListingClick}
          adjustsFontSizeToFit={true} >
          {this.props.title}
        </Text>
        <Button
          containerViewStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          icon={{ name: 'delete', color: 'red', size: 26, alignItems: 'right' }}
          onPress={this.handleListingDelete} />
      </View>
    )
  }
}

// UserListing displays a list of all of the logged-in user's listings
class UserListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userListings: []
    };

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    // Fetch listings associated with logged-in user
    axios.get(dbUrl + `/api/users/${this.props.user.id}/listings`)
      .then(res => res.data)
      .then(listings => this.setState({ userListings: listings }))
      .catch(error => console.log(error));
  }

  renderItem({item}) {
    return (
      <UserListingItem
        key={item.id}
        title={item.name}
        itemId={item.id}
        navigation={this.props.navigation}
        deleteUserListing={this.props.deleteUserListing}
      />
    );
  }

  render() {
    
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card titleStyle={{ color: 'red' }} title={`Listings for ${this.props.user && this.props.user.fullName}`}>
          <FlatList
            data={this.state.userListings}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
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
    backgroundColor: '#e1e8e6'
  },
  listingItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 16
  },
  buttonContainer: {
    backgroundColor: 'red'
  },
  buttonStyle: {
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserListing(listingId) {
      dispatch(deleteListing(listingId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListing);
