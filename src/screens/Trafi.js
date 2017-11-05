import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import { fetchDataRoutes } from '../../actions/action'


class Trafi extends React.Component {
  componentDidMount() {
    this.props.fetchDataRoutes(this.props.navigation.state.params.dataForReqTrafi)
  }

  render() {
    alert(JSON.stringify(this.props.route_list, null, 2))
    return (
      <View>
        <Text>trafi component</Text>
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
