import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

import Layout from './modules'
import createStore from './redux'

const store = createStore({
  // navigation: {
  //   index: 0,
  //   history: [{ stateObj: {}, title: 'Favorites', url: '/favorites' }]
  // },
})

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <Provider store={store}>
        <Layout>
          {this.props.children}
        </Layout>
      </Provider>
    )
  }
}

export default App
