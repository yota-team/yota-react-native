import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Text, Slider } from 'react-native-elements'
import axios from 'axios'
import { connect } from 'react-redux'

import { actionSetHour, actionSetMinute, fetchDataPositions } from '../../actions/action'

class TimeSlider extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.setTime()
  }

  componentWillMount() {
    this.props.getDataPositions({hour: this.props.hour, minute: this.props.minute})
  }

  render() {
    return (
      <View>
        {this.showTime()}
        <Slider
          maximumValue={23}
          step={1}
          value={parseInt(this.props.hour)}
          onValueChange={(hour) => {
            this.props.setHour(hour)
            this.props.getDataPositions({hour: this.props.hour, minute: this.props.minute})
          }} />
        <Text>Hour: {`${this.props.hour}`}</Text>

        <Slider
          maximumValue={59}
          step={1}
          value={parseInt(this.props.minute)}
          onValueChange={(minute) => {
            this.props.setMinute(minute)
            this.props.getDataPositions({hour: this.props.hour, minute: this.props.minute})
          }} />
        <Text>Minute: {`${this.props.minute}`}</Text>
      </View>
    );
  }

  setTime() {
    let date = new Date()
    let hour = date.toString().split(' ')[4].split(':')[0]
    let minute = date.toString().split(' ')[4].split(':')[1]
    this.props.setHour(hour)
    this.props.setMinute(minute)
  }

  filterTime() {
    return (
      this.props.position_list.map((data, idx) => {
        return <Text key={idx}>Car: {data.car._id}, Lat: {data.lat}, Lng: {data.lng}, Time: {data.createdAt}</Text>
      })
    )
  }

  showTime() {
    if (this.props.hour == 0 && this.props.minute == 0) {
      return <Text h3>00:00</Text>
    }
    if (this.props.hour == 0) {
      return <Text h3>00:{this.props.minute}</Text>
    }
    if (this.props.minute == 0) {
      return <Text h3>{this.props.hour}:00</Text>
    } else {
      return <Text h3>{this.props.hour}:{this.props.minute} Time Picker</Text>
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

const mapStateToProps = (state) => {
  return {
    position_list: state.position_list,
    hour: state.hour,
    minute: state.minute
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHour: (payload) => dispatch(actionSetHour(payload)),
    setMinute: (payload) => dispatch(actionSetMinute(payload)),
    getDataPositions: (payload) => dispatch(fetchDataPositions(payload))
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TimeSlider)

export default ConnectedComponent
