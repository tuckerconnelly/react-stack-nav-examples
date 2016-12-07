import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { navigation, attachHistoryModifiers } from 'react-stack-nav'
import { BackAndroid } from 'react-native'

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({ navigation })

export default initialState =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
      attachHistoryModifiers({ BackAndroid }),
    ),
  )
