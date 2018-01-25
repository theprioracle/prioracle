import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { emojis } from '../utils/emojis';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emojis: [],
      currentQuestion: {},
      score: 0
    };

    this.restartGame = this.restartGame.bind(this);
    this.pickRandomQuestion = this.pickRandomQuestion.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmitPress = this.handleSubmitPress.bind(this);
    this.handleRestartPress = this.handleRestartPress.bind(this);
  }

  componentDidMount() {
    this.restartGame();
  }

  restartGame() {
    let question = this.pickRandomQuestion();

    this.setState({
      emojis: emojis.slice(),
      currentQuestion: question,
      score: 0,
      guess: ''
    });
  }

  pickRandomQuestion() {
    let randomIndex = Math.floor(Math.random() * emojis.length);
    
    return emojis[randomIndex];
  }

  handleTextChange(guess) {
    this.setState({ guess });
  }

  handleSubmitPress() {
    let transformedGuess = this.state.guess.toString().replace(/\W/g, '').toLowerCase();
    let transformedAnswer = this.state.currentQuestion.answer.replace(/\W/g, '').toLowerCase();
    let score = this.state.score;

    // Check user's submission
    if (transformedGuess === transformedAnswer)
      score += 10;
    else {
      Alert.alert(
        'Wrong guess!',
        'Please try again.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

    this.setState({
      guess: '',
      score: score
    });
  }

  handleRestartPress() {
    this.restartGame();
  }

  render() { 
    return (
      <View style={styles.container}>
        <Text>
        {
          this.state.emojis.length && this.state.currentQuestion.question
        }
        </Text>
        <Text>{`\nSCORE: ${this.state.score}\n\n`}</Text>
        <TextInput 
          style={styles.textInput}
          onChange={(guess) => this.handleTextChange(guess)}
          placeholder='Enter your guess, fool.' >
        </TextInput>
        <Button 
          name='submit-button'
          onPress={this.handleSubmitPress}
          title='Submit your guess!'
          color="#841584" 
        />
        <Button
          name='restart-button'
          onPress={this.handleRestartPress}
          title='Restart the game'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      alignItems: 'center', 
      backgroundColor: '#AAA',
      justifyContent: 'center' 
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});

export default Game;