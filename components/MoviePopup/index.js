// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Animated,
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native'
import type { TvShowsResult, TvGenreResult } from 'types'
import { defaultStyles } from '../../styles'

type ReduxMappedProps = {
  genres: Array<TvGenreResult>
}

type Props = {
  movie: ?TvShowsResult,
  isOpen: boolean,
  onClose: Function
} & ReduxMappedProps

type State = {
  position: Animated.Value,
  height: number,
  expanded: boolean,
  visible: boolean
}

const { width, height } = Dimensions.get('window')

class MoviePopup extends Component<Props, State> {
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

  animateOpen = () => {
    this.setState({ visible: true }, () => {
      Animated.timing(
        this.state.position, { toValue: 0 }
      ).start()
    })
  }

  animateClose = () => {
    Animated.timing(
      this.state.position, { toValue: height }
    ).start(() => {
      this.setState({
        height,
        expanded: false,
        visible: false
      })
      this.props.onClose()
    })
  }

  getGenreTag = (acc: Array<string>, genreId: number): Array<string> => {
    const { genres } = this.props
    const genre: ?TvGenreResult = genres.find(({id}) => {
      return id === genreId
    })

    if (genre) acc.push(genre.name)

    return acc
  }

  getStyles = (): Object => ({
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
  })

  render () {
    const { movie } = this.props
    const { genre_ids, name, poster_path } = movie || {}

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
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }} style={styles.image} />
              </View>
              <View style={[styles.movieInfo, this.getStyles().movieInfo]}>
                <Text style={[styles.title, this.getStyles().title]}>{name}</Text>
                {/* <Text style={styles.genre}>{genre}</Text> */}
              </View>
            </View>
            <View style={styles.movieDetails}>
              <Text>Day</Text>
              <Text>{ genre_ids.reduce(this.getGenreTag, []).join(', ') }</Text>
              <Text>Showtime</Text>
              <Text>Add show time options here</Text>
            </View>
            <View style={styles.footer}>
              <TouchableHighlight underlayColor='#9575CD' onPress={this.animateClose} >
                <Text>Back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const mapStateToProps = ({ tvShows: { genres } }): ReduxMappedProps => {
  return { genres }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent'
  },
  modal: {
    backgroundColor: 'white'
  },
  content: {
    margin: 20,
    marginBottom: 0
  },
  movieContainer: {
    marginBottom: 20
  },
  imageContainer: {
  },
  image: {
    borderRadius: 10,
    width: (width / 2) - 20,
    height: ((width / 2) * 1.48) - 20,
    marginRight: 10
  },
  movieDetails: {},
  movieInfo: {
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
    paddingTop: 20
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

export default connect(mapStateToProps)(MoviePopup)
