import React, { Component, PropTypes } from 'react'
import { Animated, Dimensions, View } from 'react-native-universal'
import { connect } from 'react-redux'
import { Headline, FlatButton, Animations } from 'carbon-ui'
import { createOrchestrator, pushTop } from 'react-stack-nav'

import { animate } from 'uranium'

class RouteSlide extends Component {
  componentWillReceiveProps(next) {
    const { active } = this.props
    if (!active && next.active) {
      Animations.entrance(this._activateAV).start()
    }

    if (active && !next.active) {
      Animations.exit(this._activateAV, { toValue: 0 }).start()
    }
  }
  
  _activateAV = new Animated.Value(this.props.active ? 1 : 0)
  
  render() {
    return (
      <Animated.View
        style={[
          styles.base,
          animate(styles.hidden, styles.shown, this._activateAV),
        ]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

RouteSlide.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
}

RouteSlide.defaultProps = {
  active: false,
  onFinishExit: () => 0,
}

export default RouteSlide

const styles = {
  base: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    
    backgroundColor: 'white',
  },
  // NOTE In a real app that needs to respond to orientation changes or window
  // size changes, you'd use matchMedia to re-render the component, to make sure
  // this translateX always matches the window width.
  // 
  // Check out react-native-match-media for a react-native implementation, and
  // on web just use the global.matchMedia
  hidden: {
    transform: [{ translateX: Dimensions.get('window').width }],
  },
  shown: {
    transform: [{ translateX: 0 }],
  }
}
