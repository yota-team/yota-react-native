import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Text, Slider } from 'react-native-elements'

class TimeSlider extends React.Component {
  constructor() {
    super()
    this.state = {
      hour: 0,
      minute: 0
    }
  }

  render() {
    return (
      <View style={styles.time}>
        <Text h4>TIME SLIDER</Text>
        {this.showTime()}
        <Slider
          maximumValue={23}
          step={1}
          value={this.state.hour}
          onValueChange={(hour) => this.setState({hour})} />
        <Text>Hour: {`${this.state.hour}`}</Text>

        <Slider
          maximumValue={59}
          step={15}
          value={this.state.minute}
          onValueChange={(minute) => this.setState({minute})} />
        <Text>Minute: {`${this.state.minute}`}</Text>
      </View>
    );
  }

  showTime() {
    if (this.state.hour == 0 && this.state.minute == 0) {
      return <Text h3>00:00</Text>
    }
    if (this.state.hour == 0) {
      return <Text h3>00:{this.state.minute}</Text>
    }
    if (this.state.minute == 0) {
      return <Text h3>{this.state.hour}:00</Text>
    } else {
      return <Text h3>{this.state.hour}:{this.state.minute}</Text>
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 30,
  },
});

export default TimeSlider
