import React from 'react';
import MapView from 'react-native-maps';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -6.175110;
const LONGITUDE = 106.865039;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HeatmapTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: this.getHeatMapPoints(600),
      weightEnabled: false,
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert('set posisi')
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        alert('eror')
        this.setState({ error: error.message })
      },
      { enableHighAccuracy: true, timeout: 50000, maximumAge: 5000 },
    );
    // this.watchId = navigator.geolocation.watchPosition(
    //   (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       error: null,
    //     });
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    // );
  }

  getHeatMapPoints = (size, withWeight = false) => {
    const points = [];
    // console.log(points);

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
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <MapView.Heatmap points={this.state.points} />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={this.changeHeatmap}
          style={[styles.bubble, styles.button]}
        >
          <Text>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.toggleWeightEnabled}
          style={[styles.bubble, styles.button]}
        >
          <Text>
            {this.state.weightEnabled ? 'With weight' : 'Without weight'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
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
