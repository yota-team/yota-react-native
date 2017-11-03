/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

<<<<<<< HEAD
import HeatmapTest from './src/heatmapTest'
=======
import TimeSlider from './src/screens/TimeSlider'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
>>>>>>> 160dcaefbb46d242f325e76ba36c4018c667c2b4

export default class MapTest extends Component {
  render() {
    return (
      <View style={styles.container}>
<<<<<<< HEAD
        <HeatmapTest />
=======
        {/* <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text> */}
        <TimeSlider/>
>>>>>>> 160dcaefbb46d242f325e76ba36c4018c667c2b4
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
