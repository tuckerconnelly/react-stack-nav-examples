import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native-universal'
import { createOrchestrator, replaceTop } from 'react-stack-nav'

import RouteFade from '../common/RouteFade'
import NotFound from '../common/NotFound'
import { Recents, Favorites, Nearby } from './RootPages'

const VALID_FRAGMENTS = [
  '',
  'recents',
  'favorites',
  'nearby',
]

class Index extends Component {
  componentWillMount() { this._indexRedirect() }
  
  _indexRedirect() {
    if (this.props.routeFragment === '') {
      this.props.replaceTop({}, 'Favorites', 'favorites')
    }
  }
  
  render() {
    const { routeFragment } = this.props
    return (
      <View style={styles.base}>
        <RouteFade active={routeFragment === 'recents'}><Recents /></RouteFade>
        <RouteFade active={routeFragment === 'favorites'}><Favorites /></RouteFade>
        <RouteFade active={routeFragment === 'nearby'}><Nearby /></RouteFade>
        <RouteFade active={VALID_FRAGMENTS.indexOf(routeFragment) === -1}>
          <NotFound />
        </RouteFade>
      </View>
    )
  }
}

Index.propTypes = {
  // connect
  replaceTop: PropTypes.func,
  
  // createOrchestrator
  routeFragment: PropTypes.string.isRequired,
}

const mapDispatchToProps = { replaceTop }

export default
  connect(null, mapDispatchToProps)(
  createOrchestrator()(
  Index))

const styles = {
  base: {
    position: 'relative',

    padding: 16,
    
    flex: 1,
  },
}
