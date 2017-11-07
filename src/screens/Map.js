import React from 'react';
import { Image } from 'react-native'
import MapView from 'react-native-maps';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  Button
} from 'react-native';
import { connect } from 'react-redux'
import Polyline from '@mapbox/polyline';

const { width, height } = Dimensions.get('window');
import { actionSetLoading } from '../../actions/action'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

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
        latitude: 0,
        longitude: 0
      },
      coordinate2: {
        latitude: 0,
        longitude: 0
      },
      showSliderStatus: true,
      changeSlider: true,
      address1: null,
      address2: null
    };
  }
  static navigationOptions = {
    title: 'Home'
  };



  getLine() {
      this.getDirections(`${this.state.coordinate.latitude.toString()}, ${this.state.coordinate.longitude.toString()}`, `${this.state.coordinate2.latitude.toString()}, ${this.state.coordinate2.longitude.toString()}`)
  }

  componentDidMount() {
    // this.getLine()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // alert(JSON.stringify(position.coords))
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // points: ,
          error: null,
          // coordinate: {
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude
          // }
        });
        // alert(JSON.stringify(this.state.points))
      },
      (error) => {
        // alert(JSON.stringify(error))
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

  filterTime() {
    return (
      this.props.position_list.map((data, idx) => {
        return <Text key={idx}>Car: {data.car._id}, Lat: {data.lat}, Lng: {data.lng}, Time: {data.createdAt}</Text>
      })
    )
  }

  pointHeat() {
    this.props.setLoading('false')
    if(this.props.position_list.length > 0){
      return (
        <MapView.Heatmap points={this.props.position_list} />
      )
    }
  }

  mapMarker() {
    this.getLine()
    if(this.state.coordinate.latitude !== 0 && this.state.coordinate2.latitude !== 0){
      return (
        <View>
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
        </View>
      )
    }
  }
  showTripDetail(){
    if(this.state.coordinate.latitude !== 0 && this.state.coordinate2.latitude !== 0){
      return(
        <Button
        onPress={() => {
          return (
            this.props.navigation.navigate('Trafi',
            {
              dataForReqTrafi:
              {
                start_lat: this.state.coordinate.latitude,
                start_lng: this.state.coordinate.longitude,
                end_lat: this.state.coordinate2.latitude,
                end_lng: this.state.coordinate2.longitude,
                is_arrival: false,
                api_key: 'f2a8b4411867d6fd8216911c1a96e111' // traffi api key
              }
            })
          )
        }}
        title="Show Trip Detail"
        color="#E89005"
        />
      )
    }
  }

  toolBar() {
    if (this.state.showSliderStatus) {
      if(!this.state.changeSlider) {
        return (
          <View style={{width: 300, height: 230, backgroundColor: '#2D2D34', opacity: 0.9, padding: 15, borderRadius: 15, marginTop: -10, margin: 15}}>
            <TimeSlider/>
            {this.showTripDetail()}
            <Text> </Text>
            <Button
              onPress={() => {
                return (
                  this.changeSliderStatus()
                )
              }}
              title="back"
              color="#252627"
            />
          </View>
        )
      } else {
        return (
          <View style={{width: 300, height: 230, backgroundColor: '#2D2D34', position: 'relative', opacity: 0.9, padding: 15, borderRadius: 15, marginTop: -10, margin: 15}}>

              <Text style={{color: 'white'}}>Plan Trip Today</Text>
              <GooglePlacesAutocomplete
                placeholder={this.state.address1 === null ? 'Enter Start Location' : `${this.state.address1}`}
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth:0,
                    width: 270,
                    zIndex: 99
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#009FB7',
                    fontSize: 16
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                }}
                currentLocation={false}
                onPress={(data, details = null) => {
                  this.setState({
                    coordinate: {
                      latitude:  details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA
                    }
                  }), this.getAddress(`${details.geometry.location.lat},${details.geometry.location.lng}`, 1)
                }}

                query={{
                     key: 'AIzaSyDX0Js5Ax8t-j0ipagQkQ7Qlqg8KBajvhc',
                     language: 'en',
                   }}
              />

              <GooglePlacesAutocomplete
                placeholder={this.state.address2 === null ? 'Enter Destination' : `${this.state.address2}`}
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth:0,
                    width: 270,
                    marginTop: 10
                  },
                  textInput: {
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: '#009FB7',
                    fontSize: 16,
                    zIndex: 299
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  },
                }}
                currentLocation={false}
                onPress={(data, details = null) => {
                  this.setState({
                    coordinate2: {
                      latitude:  details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA
                    }
                  }), this.getAddress(`${details.geometry.location.lat},${details.geometry.location.lng}`, 2)
                }}

                query={{
                     key: 'AIzaSyDX0Js5Ax8t-j0ipagQkQ7Qlqg8KBajvhc',
                     language: 'en',
                   }}
              />
              <Text> </Text>
              <Text> </Text>

              <View style={{zIndex: 0}}>


                <Text> </Text>
                  <Button
                    onPress={() => {
                      return (
                        this.changeSliderStatus()
                      )
                    }}
                    title="Show Heatmap"
                    color="#E89005"
                  />
              </View>
          </View>
        )
      }
    }
  }

  toggleShowSliderStatus() {
    this.setState({ showSliderStatus: !this.state.showSliderStatus })
  }

  changeSliderStatus() {
    this.setState({ changeSlider: !this.state.changeSlider })

  }

  getAddress(latlng, code) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyBKoPKt3iYfzEKBl4zKJWGtARWdf7uFdFM`)
    	.then(res => res.json())
    	.then((json) => {
    		if (json.status !== 'OK') {
    			throw new Error(`Geocode error: ${json.status}`);
    		} else {
          var newAddress = `${json.results[0].address_components[1].long_name} no. ${json.results[0].address_components[0].long_name} ${json.results[0].address_components[2].long_name}`

          if(code === 1){
            this.setState({
              address1: newAddress
            })
          } else {
            // alert(newAddress)
            this.setState({
              address2: newAddress
            })
          }
        }

    	// alert(JSON.stringify(json.results[0].address_components[0].long_name))
    });
  }

  render () {
    // this.getLine()
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
        followUserLocation = {true}
        showsMyLocationButton={true}
      >
      {this.mapMarker()}
      {this.pointHeat()}
      </MapView>

        <Button
          onPress={() => {
            return (
              this.toggleShowSliderStatus()
            )
          }}
          title="menu"
          color="#757780"
        />
        <Text> </Text>
        {this.toolBar()}


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
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
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
    minute: state.minute,
    loading: state.loadingState
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: () => dispatch(actionSetLoading())
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(HeatmapTest)


export default ConnectedComponent;
