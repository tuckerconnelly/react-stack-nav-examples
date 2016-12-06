import { AppRegistry } from 'react-native'

import App from './src/index'

// NOTE For Uranium/carbon-ui, you don't need it if you're using another UI lib
global.matchMedia = () => ({ addListener: () => 0, removeListener: () => 0 })

AppRegistry.registerComponent('BottomNavWithStacks', () => App)
