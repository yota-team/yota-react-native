import React from 'react'
import { View, Text, ScrollView, FlatList, Image, StyleSheet, ActivityIndicator, Button } from 'react-native'
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
});

class Trafi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    };
  }

  componentDidMount() {
    this.props.fetchDataRoutes(this.props.navigation.state.params.dataForReqTrafi)
  }


  render() {
    return (
      <View>
        <Button
        onPress={() => {
          return (
            this.props.navigation.navigate('MainMap')
          )
        }}
        title="Back"
        color="#E89005"
        />
        {this.getData()}
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
