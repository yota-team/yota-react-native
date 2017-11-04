import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

export default class RnDirectionsApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: [],
      coordinate: {
        latitude:-6.2349,
        longitude:106.9896
      },
      coordinate2: {
        latitude:-6.2380,
        longitude:106.9896
      }
    }
  }

  getLine() {
      this.getDirections(`${this.state.coordinate.latitude.toString()}, ${this.state.coordinate.longitude.toString()}`, `${this.state.coordinate2.latitude.toString()}, ${this.state.coordinate2.longitude.toString()}`)
  }

  componentDidMount() {
    this.getLine()
  }

  async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            console.log('ini respJson', respJson);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            return error
        }
    }

  render() {
    this.getLine()
    console.log('ini coordinate', this.state.coordinate);
    return (
      <View>
        <MapView style={styles.map} initialRegion={{
          latitude:-6.21462,
          longitude:106.84513,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>

        <MapView.Marker draggable
        coordinate={this.state.coordinate}
        onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })} />

        <MapView.Marker draggable
        coordinate={this.state.coordinate2}
        onDragEnd={(e) => this.setState({ coordinate2: e.nativeEvent.coordinate })}
        pinColor={'#474744'} />

        <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});

AppRegistry.registerComponent('maptest', () => RnDirectionsApp);
