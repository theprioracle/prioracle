// app/components/ListingForm.js

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

const ListingForm = ({ navigation }) => (
  <View style={styles.container}>
    <Text>LISTING FORM STUFF GOES HERE!{"\n"}</Text>
  </View>
);

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
});

export default ListingForm;