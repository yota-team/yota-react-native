import { StackNavigator } from 'react-navigation'

import MainMap from '../src/screens/Map'
import Trafi from '../src/screens/Trafi'

const Navigator = StackNavigator({
  MainMap: { screen: MainMap },
  Trafi: { screen: Trafi }
},{
  headerMode: 'none'
})

export default Navigator
