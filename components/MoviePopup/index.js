// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Image,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'
import type { MovieModel } from '../../data/movies'

type Props = {
  movie: MovieModel,
  isOpen: boolean,
  onClose: Function
}

export default class MoviePoster extends Component<Props> {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  render () {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View />
        </TouchableWithoutFeedback>
        <Animated.View>
          <View>
            <View>
              <View>
                <Image />
              </View>
              <View>
                <Text />
                <Text />
              </View>
            </View>

            <View>
              <Text>Day</Text>
              <Text>Add day options here</Text>
              <Text>Showtime</Text>
              <Text>Add show time options here</Text>
            </View>
          </View>
          <View>
            <TouchableHighlight underlayColor='#9575CD'>
              <Text>Book My Tickets</Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
      </View>
    )
  }
}
