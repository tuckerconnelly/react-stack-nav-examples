import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Platform } from 'react-native'
import {
  AppBar,
  BottomNavigation,
  BottomNavigationIcon,

  Colors,
} from 'carbon-ui'
import { pushState, back } from 'react-stack-nav'

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
    const { title, url, children, back } = this.props

    return (
      <View style={styles.base}>
        <AppBar
          navIcon={url.split('/').length > 2 ? 'arrow_back' : null}
          title={title}
          onNavIconPress={() => back()}/>
        <Index />
        <BottomNavigation>
          <BottomNavigationIcon
            name="history"
            text="Recents"
            active={/^\/recents/.test(url)}
            onPress={() => this._navigate('/recents', 'Recents')} />
          <BottomNavigationIcon
            name="favorite"
            text="Favorites"
            active={/^\/favorites/.test(url)}
            onPress={() => this._navigate('/favorites', 'Favorites')} />
          <BottomNavigationIcon
            name="location_on"
            text="Nearby"
            active={/^\/nearby/.test(url)}
            onPress={() => this._navigate('/nearby', 'Nearby')} />
        </BottomNavigation>
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

const mapDispatchToProps = { pushState, back }

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
