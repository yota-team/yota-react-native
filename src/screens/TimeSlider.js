import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Button
} from 'react-native';
import { Text, Slider } from 'react-native-elements'
import axios from 'axios'
import { connect } from 'react-redux'

import { actionSetHour, actionSetMinute, fetchDataPositions, actionSetLoading } from '../../actions/action'

class TimeSlider extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.setTime()
  }

  sliderBar() {
    if(this.props.loading) {
      return (
        <View>
          <ActivityIndicator
            size="large"
            color="#ffffff"
          />
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.whiteFont}>Time: {this.props.hour < 10 ? `0${this.props.hour}` : `${this.props.hour}`}:00 - {this.props.hour < 10 ? `0${this.props.hour}` : `${this.props.hour}`}:59 </Text>
          <Slider
            minimumTrackTintColor='#eddea4'
            maximumTrackTintColor='#ffffff'
            maximumValue={23}
            step={1}
            value={parseInt(this.props.hour)}
            onValueChange={(hour) => {
              this.props.setHour(hour)
            }} />

        </View>
      )
    }
  }

  render() {
    return (
      <View>
        {this.sliderBar()}
        <Button
        onPress={() => {this.props.getDataPositions({hour: this.props.hour, minute: this.props.minute}), this.props.setLoading(true)}}
        title="Show Heatmap"
        color="#009FB7"
        />
        <Text> </Text>

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
  whiteFont: {
    color: 'white',
  }
});

const mapStateToProps = (state) => {
  return {
    position_list: state.position_list,
    hour: state.hour,
    minute: state.minute,
    loading: state.loadingState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHour: (payload) => dispatch(actionSetHour(payload)),
    setMinute: (payload) => dispatch(actionSetMinute(payload)),
    getDataPositions: (payload) => dispatch(fetchDataPositions(payload)),
    setLoading: (payload) => dispatch(actionSetLoading(payload))
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TimeSlider)

export default ConnectedComponent
