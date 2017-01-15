import 'babel-polyfill'

import React from 'react'
import { AppRegistry } from 'react-native'
import { WebStyles } from 'carbon-ui'

import App from './src/index'

const AppWithStyles = () => <App><WebStyles /></App>

AppRegistry.registerComponent('Drawer', () => AppWithStyles)
AppRegistry.runApplication('Drawer', { rootTag: document.getElementById('root') })
