// app/components/UserSettings.js
// This components allows a user to view or modify their settings.

import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

class Intro extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>{'\n\n'}</Text>
        <Card title='What is Prioracle?' containerStyle={styles.cardContainer} titleStyle={styles.textStyle}>
          <Text style={styles.textStyle}>{'\n'}Welcome to Prioracle, the oracle for prices. We'll take your prospective product listing and determine a good, fair price for you to sell your product at. With Prioracle, you won't have to worry about spending valuable time searching for that just-right price point.{'\n'}</Text>
        </Card>
        <Text>{'\n\n'}</Text>
        <Button
          title='Got it!'
          raised={true}
          onPress={() => this.props.navigation.navigate('UserHome')}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#d14f4f',
    position: 'relative',
    borderRadius: 0
  },
  cardContainer: {
    backgroundColor: '#d14f4f'
  },
  textStyle: {
    color: 'white',
    fontSize: 20
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Intro);