import React from 'react'
import { View, Text, ScrollView, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-native-elements'
import Timeline from 'react-native-timeline-listview/lib'

import { fetchDataRoutes } from '../../actions/action'


class Trafi extends React.Component {


  componentDidMount() {
    this.props.fetchDataRoutes(this.props.navigation.state.params.dataForReqTrafi)
  }


  render() {
    console.log(this.props.route_list.Routes)

    return (
      <View>
        <List>
          <FlatList
            data={this.props.route_list.Routes}
            keyExtractor={item => item.PreferenceLabel}
            renderItem={({ item }) => (
              <View>
              <Text>{item.PreferenceLabel}</Text>
              <Text>{`Durasi Waktu: ${item.DurationMinutes} Menit`}</Text>
              {item.RouteSegments.map(data => {
                return(
                  // <View>
                  // <Text><Image
                  // style= {{ height:50, width: 50 }}
                  // source={{uri: `${data.IconUrl}`}}
                  // />
                  // {`${data.IconUrl === 'https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=walksegment' ? '' : data.Transport.Name} Menuju ${data.EndPoint.Name === '' ? 'Destinasi' : data.EndPoint.Name}`}</Text>
                  // <Text>{`${data.DurationMinutes} Menit`}</Text>
                  //
                  // </View>
                  <Timeline
                    data={[
                      {time: `${data.EndPoint.Time}`, title: `${data.IconUrl === 'https://cdn.trafi.com/icon.ashx?size=64&style=v2&src=walksegment' ? '' : data.Transport.Name} Menuju ${data.EndPoint.Name === '' ? 'Destinasi' : data.EndPoint.Name}`, description: `${data.DurationMinutes} Menit`},
                    ]}
                  />
                )
              })}
              </View>
            )}
          />
        </List>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    route_list: state.route_list
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataRoutes: (payload) => dispatch(fetchDataRoutes(payload))
  }
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Trafi)

export default ConnectedComponent
