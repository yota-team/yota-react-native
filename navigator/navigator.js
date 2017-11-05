import { StackNavigator } from 'react-navigation'

import MainMap from '../src/screens/Map'

const Navigator = StackNavigator({
  MainMap: { screen: MainMap }
})

export default Navigator
