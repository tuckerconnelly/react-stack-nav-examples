import React, { Component, PropTypes } from 'react'
import { Animated, View } from 'react-native-universal'

class RouteFade extends Component {
  state = { visible: this.props.active }

  componentWillReceiveProps(next) {
    const { active } = this.props

    if (active && !next.active) {
      Animated.timing(this._opacityAV, { duration: 112, toValue: 0 })
        .start(() => this.setState({ visible: false }))
    } else if (!active && next.active) {
      this.setState({ visible: true }, () =>
        Animated.timing(this._opacityAV, { duration: 225, delay: 112, toValue: 1 })
          .start()
      )
    }
  }

  _opacityAV = new Animated.Value(this.props.active ? 1 : 0)

  render() {
    return (
      <Animated.View
        style={[
          styles.base,
          { opacity: this._opacityAV },
          !this.state.visible && styles.hidden,
        ]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

RouteFade.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
}

RouteFade.defaultProps = {
  active: false,
  onFinishExit: () => 0,
}

export default RouteFade

const styles = {
  base: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    
    backgroundColor: 'white',
  },

  hidden: {
    right: undefined,
    bottom: undefined,
    
    width: 0,
    height: 0,
  },
}
