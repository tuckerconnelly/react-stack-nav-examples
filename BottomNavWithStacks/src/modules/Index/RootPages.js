import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { pushTop, createOrchestrator } from 'react-stack-nav'
import { Headline, FlatButton } from 'carbon-ui'

import RouteSlide from '../common/RouteSlide'
import OneTwoThreeStack from './OneTwoThreeStack'

class RootPageComponent extends Component {
  state = { stackExists: true, stackActive: false }

  componentWillReceiveProps(next) {
    if (typeof next.routeFragment === 'string') {
      this.setState({ stackExists: true })
    }
    if (/^(one|two|three)$/.test(next.routeFragment)) {
      this.setState({ stackActive: true })
    }

    if (next.routeFragment === '' && this.state.stackActive) {
      this.setState({ stackActive: false })
    }

    if (next.routeFragment === undefined && this.state.stackExists) {
      // Wait for fade out animation
      setTimeout(() => this.setState({ stackExists: false }), 150)
    }
  }

  render() {
    const { title, pushTop } = this.props
    const { stackExists, stackActive } = this.state

    return (
      <View style={styles.base}>
        <View>
          <Headline style={styles.headline}>{title}</Headline>
          <FlatButton onPress={() => pushTop(0, 'One', 'one')}>One</FlatButton>
          <FlatButton onPress={() => pushTop(0, 'Two', 'two')}>Two</FlatButton>
          <FlatButton onPress={() => pushTop(0, 'Three', 'three')}>Three</FlatButton>
        </View>
        {stackExists &&
          <RouteSlide active={stackActive}>
            <OneTwoThreeStack title={title} depth={1} />
          </RouteSlide>
        }
      </View>
    )
  }
}

RootPageComponent.propTypes = {
  title: PropTypes.string,
}

const mapDispatchToProps = { pushTop }

const RootPage =
  connect(null, mapDispatchToProps)(
  RootPageComponent)

// NOTE Normally you'd put all the orchestrators in their own files,
// but doing this for the sake of brevity
export const Recents = createOrchestrator('recents')(
  props => <RootPage title="Recents" {...props} />
)
export const Favorites = createOrchestrator('favorites')(
  props => <RootPage title="Favorites" {...props} />
)
export const Nearby = createOrchestrator('nearby')(
  props => <RootPage title="Nearby" {...props} />
)

const styles = {
  base: {
    position: 'relative',
    flex: 1,

    padding: 16,
  },

  headline: {
    marginBottom: 16,
  },
}
