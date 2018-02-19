// @flow
import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native'
import type { MovieModel } from '../../data/movies'
import { defaultStyles } from '../../styles'

type Props = {
  movie: ?MovieModel,
  isOpen: boolean,
  onClose: Function
}

type State = {
  position: Animated.Value,
  height: number,
  expanded: boolean,
  visible: boolean
}

const { width, height } = Dimensions.get('window')

export default class MoviePopup extends Component<Props, State> {
  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    height,
    expanded: false,
    visible: this.props.isOpen
  }

  componentWillReceiveProps (nextProps: Props) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen()
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose()
    }
  }

  animateOpen () {
    this.setState({ visible: true }, () => {
      Animated.timing(
        this.state.position, { toValue: 0 }
      ).start()
    })
  }

  animateClose () {
    Animated.timing(
      this.state.position, { toValue: height }
    ).start(() => this.setState({
      height,
      expanded: false,
      visible: false
    }))
  }

  getStyles = () => {
    return {
      imageContainer: this.state.expanded ? {
        width: width / 2
      } : {
        marginRight: 10
      },
      movieContainer: this.state.expanded ? {
        flexDirection: 'column',
        alignItems: 'center'
      } : {
        flexDirection: 'row'
      },
      movieInfo: this.state.expanded ? {
        flex: 0,
        alignItems: 'center',
        paddingTop: 0
      } : {
        flex: 1,
        justifyContent: 'center'
      },
      title: this.state.expanded ? {
        textAlign: 'center'
      } : {}
    }
  }

  render () {
    const { movie } = this.props
    const { title, genre, poster } = movie || {}

    if (!this.state.visible) return null

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.modal, {
          height: this.state.height,
          transform: [{ translateY: this.state.position }, { translateX: 0 }]
        }]}>
          <View style={styles.content}>
            <View style={[styles.movieContainer, this.getStyles().movieContainer]}>
              <View style={[styles.imageContainer, this.getStyles().imageContainer]}>
                <Image source={{ uri: poster }} style={styles.image} />
              </View>
              <View style={[styles.movieInfo, this.getStyles().movieInfo]}>
                <Text style={[styles.title, this.getStyles().title]}>{title}</Text>
                <Text style={styles.genre}>{genre}</Text>
              </View>
            </View>
            <View>
              <Text>Day</Text>
              <Text>Add day options here</Text>
              <Text>Showtime</Text>
              <Text>Add show time options here</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableHighlight underlayColor='#9575CD'>
              <Text>Book My Tickets</Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  modal: {
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0
  },
  movieContainer: {
    flex: 1,
    marginBottom: 20
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    borderRadius: 10,
    width: (width / 2) - 20,
    height: ((width / 2) * 1.48) - 20,
    marginRight: 10
  },
  movieInfo: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  title: {
    ...defaultStyles.text,
    fontSize: 20
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 14
  },
  sectionHeader: {
    ...defaultStyles.text,
    color: '#AAAAAA'
  },
  footer: {
    padding: 20
  },
  buttonContainer: {
    backgroundColor: '#673AB7',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  button: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 18
  }
})
