import React from 'react';
import { Image } from 'react-native'
import MapView from 'react-native-maps';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');
import TimeSlider from './TimeSlider'

const ASPECT_RATIO = width / height;
const LATITUDE = -6.175110;
const LONGITUDE = 106.865039;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HeatmapTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: this.getHeatMapPoints(60),
      weightEnabled: false,
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // points: ,
          error: null,
        });

        // alert(JSON.stringify(this.state.points))
      },
      (error) => {
        alert(JSON.stringify(error))
        this.setState({ error: error.message })
      },
      { enableHighAccuracy: true, timeout: 10000},
    );
  }

  getHeatMapPoints = (size, withWeight = false) => {
    const points = [];
    console.log(points);

    for (let i = 0; i < size; i++) {
      const pointData = {
        latitude: LATITUDE + (Math.random() / 10),
        longitude: LONGITUDE + (Math.random() / 10),
      };
      if (withWeight) {
        pointData.weight = Math.round((Math.random() * 10) + 1);
      }
      points.push(pointData);
    }
    return points;
  };

  changeHeatmap = () => {
    this.setState({
      points: this.getHeatMapPoints(50, this.state.weightEnabled),
    });
  };

  toggleWeightEnabled = () => {
    this.setState({ weightEnabled: !this.state.weightEnabled });
  };

  render = () => (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: this.state.latitude || -6.25692154,
          longitude: this.state.longitude || 106.78456578,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation = {true}
        followUserLocation={true}
        showsMyLocationButton={true}
      >
        <MapView.Heatmap points={this.state.points} />
      </MapView>
      <View style={{width: 300, height: 190, backgroundColor: '#fff', opacity: 0.7, padding: 15, borderRadius: 15, margin: 15}}>
        <TimeSlider/>
        <Text>Lat : {this.state.latitude} Lng : {this.state.longitude} </Text>
      </View>


    </View>
    );
}



let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default HeatmapTest;
