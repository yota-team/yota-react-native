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
      minute: 0,
      dataDummy: [
        {car: 'car1', time: '2017-11-02T00:00:13.049Z'},
        {car: 'car1', time: '2017-11-02T00:01:13.049Z'},
        {car: 'car1', time: '2017-11-02T00:04:13.049Z'},
        {car: 'car1', time: '2017-11-02T01:00:13.049Z'},
        {car: 'car1', time: '2017-11-02T01:06:13.049Z'},
        {car: 'car1', time: '2017-11-02T01:12:13.049Z'},
        {car: 'car1', time: '2017-11-02T01:58:13.049Z'},
        {car: 'car1', time: '2017-11-02T01:59:13.049Z'}
      ]
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
        {this.filterTime()}
      </View>
    );
  }

  filterTime() {
    var arr = this.state.dataDummy.filter(data => {
      var hour = data.time[12] + data.time[13]
      return parseInt(hour) == this.state.hour
    })
    return (
      arr.map((data, idx) => {
        return <Text key={idx}>Car: {data.car}, Time: {data.time}</Text>
      })
    )
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
    margin: 50,
  },
});

export default TimeSlider
