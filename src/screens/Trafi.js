import React from 'react'
import { View, Text } from 'react-native'

class Trafi extends React.Component {
  componentWillMount() {
    this.props.fetchDataRoutes(this.props.navigation.state.params.dataForReqTrafi)
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props.route_list, null, 2)}</Text>
      </View>
    )
  }
}

export default Trafi
