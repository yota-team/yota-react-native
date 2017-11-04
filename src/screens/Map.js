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
import { connect } from 'react-redux'
import Polyline from '@mapbox/polyline';

const { width, height } = Dimensions.get('window');

import TimeSlider from './TimeSlider'

const ASPECT_RATIO = width / height;
const LATITUDE = -6.25692154;
const LONGITUDE = 106.78456578;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421 //LATITUDE_DELTA * ASPECT_RATIO;

class HeatmapTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: this.props.position_list,
      weightEnabled: false,
      latitude: null,
      longitude: null,
      error: null,
      coords: [],
      coordinate: {
        latitude:-6.260168,
        longitude:106.781769
      },
      coordinate2: {
        latitude:-6.280168,
        longitude:106.781769
      }
    };
  }

  getLine() {
      this.getDirections(`${this.state.coordinate.latitude.toString()}, ${this.state.coordinate.longitude.toString()}`, `${this.state.coordinate2.latitude.toString()}, ${this.state.coordinate2.longitude.toString()}`)
  }

  componentDidMount() {
    this.getLine()
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

  // getHeatMapPoints = (size, withWeight = false) => {
  //   const points = [];
  //   console.log(points);
  //
  //   for (let i = 0; i < size; i++) {
  //     const pointData = {
  //       latitude: LATITUDE + (Math.random() / 10),
  //       longitude: LONGITUDE + (Math.random() / 10),
  //     };
  //     if (withWeight) {
  //       pointData.weight = Math.round((Math.random() * 10) + 1);
  //     }
  //     points.push(pointData);
  //   }
  //   return points;
  // };

  // changeHeatmap = () => {
  //   this.setState({
  //     points: this.getHeatMapPoints(50, this.state.weightEnabled),
  //   });
  // };
  //
  // toggleWeightEnabled = () => {
  //   this.setState({ weightEnabled: !this.state.weightEnabled });
  // };

  filterTime() {
    return (
      this.props.position_list.map((data, idx) => {
        return <Text key={idx}>Car: {data.car._id}, Lat: {data.lat}, Lng: {data.lng}, Time: {data.createdAt}</Text>
      })
    )
  }

  pointHeat() {
    if(this.props.position_list.length > 0){
      return (
        <MapView.Heatmap points={this.props.position_list} />
      )
    }
  }

  render () {
    this.getLine()
    return (
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
      <MapView.Marker draggable
        coordinate={this.state.coordinate}
        onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })} />

        <MapView.Marker draggable
        coordinate={this.state.coordinate2}
        onDragEnd={(e) => this.setState({ coordinate2: e.nativeEvent.coordinate })}
        pinColor={'#474744'} />

        <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={4}
            strokeColor="blue"/>
        {this.pointHeat()}
      </MapView>
      <View style={{width: 300, height: 190, backgroundColor: '#F5F1ED', opacity: 0.7, padding: 15, borderRadius: 15, margin: 15}}>
        <TimeSlider/>
        <Text>Lat : {this.state.latitude} Lng : {this.state.longitude} </Text>
      </View>


    </View>
  )}
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

const mapStateToProps = (state) => {
  return {
    position_list: state.position_list,
    hour: state.hour,
    minute: state.minute
  }
}



const ConnectedComponent = connect(mapStateToProps)(HeatmapTest)

export default ConnectedComponent;
