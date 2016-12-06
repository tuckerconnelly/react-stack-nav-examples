import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Platform } from 'react-native-universal'
import {
  BottomNavigation,

  Colors,
} from 'carbon-ui'
import { pushState } from 'react-stack-nav'

import Index from './Index/index'

class Layout extends Component {
  state = { menuOpen: false }

  _openMenu = () => this.setState({ menuOpen: true })
  _closeMenu = () => this.setState({ menuOpen: false })

  _navigate = (to, title = '') => {
    this._closeMenu()
    this.props.pushState(0, title, to)
  }

  render() {
    const { title, url, children } = this.props

    return (
      <View style={styles.base}>
        <Index />
        <BottomNavigation />
        {children}
      </View>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node,

  // connect
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,

  pushState: PropTypes.func.isRequired,
}

const mapStateToProps = ({ navigation }) => ({
  url: navigation.history[navigation.index].url,
  title: navigation.history[navigation.index].title,
})

const mapDispatchToProps = { pushState }

export default
  connect(mapStateToProps, mapDispatchToProps)(
  Layout)

const styles = {
  base: {
    position: 'relative',
    flex: 1,

    backgroundColor: Colors.white,
  },

  // Account for ios heading height
  list: {
    ...Platform.select({
      ios: {
        marginTop: 22,
      },
    }),
  },
}
