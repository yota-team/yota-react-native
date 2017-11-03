import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Text, Slider } from 'react-native-elements'
import axios from 'axios'

class TimeSlider extends React.Component {
  constructor() {
    super()
    this.state = {
      hour: 0,
      minute: 0,
      dataPosition: [
        // {car: 'car1', time: '2017-11-02T00:00:13.049Z'},
        // {car: 'car2', time: '2017-11-02T00:01:13.049Z'},
        // {car: 'car3', time: '2017-11-02T00:02:13.049Z'},
        // {car: 'car4', time: '2017-11-02T00:03:13.049Z'},
        // {car: 'car5', time: '2017-11-02T00:04:13.049Z'},
        // {car: 'car6', time: '2017-11-02T00:10:13.049Z'},
        // {car: 'car7', time: '2017-11-02T00:11:13.049Z'},
        // {car: 'car8', time: '2017-11-02T00:12:13.049Z'},
        // {car: 'car9', time: '2017-11-02T00:59:13.049Z'},
        // {car: 'car10', time: '2017-11-02T00:59:13.049Z'},
        //
        // {car: 'car1', time: '2017-11-02T23:00:13.049Z'},
        // {car: 'car2', time: '2017-11-02T23:01:13.049Z'},
        // {car: 'car3', time: '2017-11-02T23:02:13.049Z'},
        // {car: 'car4', time: '2017-11-02T23:03:13.049Z'},
        // {car: 'car5', time: '2017-11-02T23:04:13.049Z'},
        // {car: 'car6', time: '2017-11-02T23:10:13.049Z'},
        // {car: 'car7', time: '2017-11-02T23:11:13.049Z'},
        // {car: 'car8', time: '2017-11-02T23:12:13.049Z'},
        // {car: 'car9', time: '2017-11-02T23:59:13.049Z'},
        // {car: 'car10', time: '2017-11-02T23:59:13.049Z'}
      ]
    }
  }

  componentDidMount() {
    this.setTime()
  }

  componentWillMount() {
    this.fetchData()
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
          onValueChange={(hour) => {
            this.setState({hour})
            this.fetchData()
          }} />
        <Text>Hour: {`${this.state.hour}`}</Text>

        <Slider
          maximumValue={59}
          step={1}
          value={this.state.minute}
          onValueChange={(minute) => {
            this.setState({minute})
            this.fetchData()
          }} />
        <Text>Minute: {`${this.state.minute}`}</Text>
        {this.filterTime()}
      </View>
    );
  }

  setTime() {
    let date = new Date()
    let hour = date.toString().split(' ')[4].split(':')[0]
    let minute = date.toString().split(' ')[4].split(':')[1]
    this.setState({hour: parseInt(hour)})
    this.setState({minute: parseInt(minute)})
    // alert(date)
  }

  fetchData() {
    axios({
      method: 'get',
      url: `http://yota.achim.my.id/positions/filter?hour=${this.state.hour}&minute=${this.state.minute}`
    })
    .then(response => {
      // alert(JSON.stringify(response, null, 2))
      this.setState({dataPosition: response.data})
    })
    .catch(err => {
      // alert(JSON.stringify(err, null, 2))
      console.log('di dalam catch axios', err)
    })
  }

  filterTime() {
    var arr = this.state.dataPosition.filter(data => {
      // var hour = data.createdAt[12] + data.createdAt[13]
      var hour = data.createdAt.split('T')[1].split(':')[0]
      return parseInt(hour) == this.state.hour
    })
    var arr2 = arr.filter(data => {
      // var minute = data.createdAt[15] + data.createdAt[16]
      var minute = data.createdAt.split('T')[1].split(':')[1]
      return parseInt(minute) == this.state.minute
    })
    return (
      arr2.map((data, idx) => {
        return <Text key={idx}>Car: {data.car._id}, Lat: {data.lat}, Lng: {data.lng}, Time: {data.createdAt}</Text>
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
