import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { fetchDataRoutes } from '../../actions/action'


class Trafi extends React.Component {
  componentDidMount() {
    this.props.fetchDataRoutes(this.props.navigation.state.params.dataForReqTrafi)
  }

  render() {
    return (
      <View>
        <Text>trafi component</Text>
        <ScrollView>
          <Text>{JSON.stringify(this.props.route_list, null, 2)}</Text>
        </ScrollView>
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
