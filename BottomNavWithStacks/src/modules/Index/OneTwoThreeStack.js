import React, { Component, PropTypes } from 'react'
import { Animated, Dimensions, View } from 'react-native'
import { connect } from 'react-redux'
import { Headline, FlatButton, Animations, gu } from 'carbon-ui'
import { createOrchestrator, pushTop } from 'react-stack-nav'
import { animate } from 'uranium'

import RouteSlide from '../common/RouteSlide'

class OneTwoThreeStackComponent extends Component {
  state = { nextStackExists: false, nextStackActive: false }

  componentWillMount() { this._handleReceiveProps(this.props) }
  componentWillReceiveProps(next) { this._handleReceiveProps(next) }

  _handleReceiveProps(next) {
    if (typeof next.routeFragment === 'string') {
      this.setState({ nextStackExists: true })
    }
    if (/^(one|two|three)$/.test(next.routeFragment)) {
      this.setState({ nextStackActive: true })
    }

    if (next.routeFragment === '' && this.state.nextStackActive) {
      this.setState({ nextStackActive: false })
    }
  }

  render() {
    const { pushTop, title, depth } = this.props
    const { nextStackExists, nextStackActive } = this.state

    return (
      <View style={styles.base}>
        <Headline style={{ marginBottom: 2 * gu }}>{title} {depth}</Headline>
        <FlatButton onPress={() => pushTop(0, 'One', 'one')}>One</FlatButton>
        <FlatButton onPress={() => pushTop(0, 'Two', 'two')}>Two</FlatButton>
        <FlatButton onPress={() => pushTop(0, 'Three', 'three')}>Three</FlatButton>

        {nextStackExists &&
          <RouteSlide active={nextStackActive}>
            <OneTwoThreeStack title={title} depth={depth + 1} />
          </RouteSlide>
        }
      </View>
    )
  }
}

OneTwoThreeStackComponent.propTypes = {
  title: PropTypes.string,
  depth: PropTypes.number,

  // createOrchestrator
  routeFragment: PropTypes.string,

  // connect
  pushTop: PropTypes.func,
}

const mapDispatchToProps = { pushTop }

const OneTwoThreeStack =
  connect(null, mapDispatchToProps)(
  createOrchestrator(/^(one|two|three)$/)(
  OneTwoThreeStackComponent))

export default OneTwoThreeStack

const styles = {
  base: {
    padding: 16,
  },
}
