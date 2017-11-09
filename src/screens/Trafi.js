import React from 'react'
import { View, Text, ScrollView, FlatList, Image, StyleSheet, ActivityIndicator, Button, Animated, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-native-elements'
import Timeline from 'react-native-timeline-listview/lib'

import { fetchDataRoutes } from '../../actions/action'

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  container   : {
        backgroundColor: '#fff',
        margin:10
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold',
        fontSize: 16
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});

class Trafi extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      animating: true
    };
  }

  componentWillMount() {
    this.props.fetchDataRoutes(this.props.navigation.state.params.dataForReqTrafi)
  }


  // <View>
  // <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
  // <View style={{flex: 2, justifyContent: 'center'}}>
  // <Text>Opsi</Text>
  // </View>
  // <View style={{flex: 2, justifyContent: 'center'}}>
  // <Text>Opsi</Text>
  // </View>
  // <View style={{flex: 2, justifyContent: 'center'}}>
  // <Text>Opsi</Text>
  // </View>
  // </View>

  render() {
    return (
      <View>
      <View style={{padding: 20, height: 582}}>
        {this.getData()}
        </View>
        <Button
        onPress={() => {
          return (
            this.props.navigation.navigate('MainMap')
          )
        }}
        title="Back"
        color="#252627"
        />
      </View>
    )
  }

  getData (){
    if(this.props.loadingTrafi){
      return (
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      )
    } else {
      console.log(this.props.route_list.Routes);
      return (

          <FlatList
            data={this.props.route_list.Routes}
            keyExtractor={item => item.PreferenceLabel}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.label}>{item.PreferenceLabel}</Text>
                <Text>{`Durasi Waktu: ${item.DurationMinutes} Menit`}</Text>
                {item.RouteSegments.map(data => {
                  return(
                    <Timeline
                      circleSize={20}
                      circleColor='rgb(45,156,219)'
                      lineColor='rgb(45,156,219)'
                      timeContainerStyle={{minWidth:52, marginTop: 1}}
                      timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                      descriptionStyle={{color:'gray'}}
                      innerCircle={'dot'}
                      options={{
                        style:{paddingTop:5}
                      }}
                      data={[
                        {time: `${data.EndPoint.Time}`, title: `${data.IconUrl === 'https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=walksegment' ? 'Jalan Kaki' : data.Transport.Name} Menuju ${data.EndPoint.Name === '' ? 'Destinasi ' : data.EndPoint.Name}`, description: `${data.DurationMinutes} Menit`, imageUrl: `${data.IconUrl}`},
                      ]}
                    />
                  )
                })}

              </View>
            )}
          />
      )
    }
  }


  recommendedData(){
    if(!this.state.loadingTrafi){
      setTimeout(() => {

        return (
                <View>
                  {this.props.route_list.Routes[0].map(data => {
                    return(
                      <Timeline
                        circleSize={20}
                        circleColor='rgb(45,156,219)'
                        lineColor='rgb(45,156,219)'
                        timeContainerStyle={{minWidth:52, marginTop: 1}}
                        timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                        descriptionStyle={{color:'gray'}}
                        innerCircle={'dot'}
                        options={{
                          style:{paddingTop:5}
                        }}
                        data={[
                          {time: `${data.EndPoint.Time}`, title: `${data.IconUrl === 'https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=walksegment' ? 'Jalan Kaki' : data.Transport.Name} Menuju ${data.EndPoint.Name === '' ? 'Destinasi ' : data.EndPoint.Name}`, description: `${data.DurationMinutes} Menit`, imageUrl: `${data.IconUrl}`},
                        ]}
                      />
                    )
                  })}

                </View>
        )}, 5000)
    }
  }

  cheaperData(){

  }

  transData(){

  }

}

const mapStateToProps = (state) => {
  return {
    route_list: state.route_list,
    loadingTrafi: state.loadingTrafi
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataRoutes: (payload) => dispatch(fetchDataRoutes(payload))
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Trafi)

export default ConnectedComponent
