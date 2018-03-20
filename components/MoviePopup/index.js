// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import {
  Animated,
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import type { TvShowsResult, TvGenreResult } from 'types'
import { defaultStyles } from '../../styles'
import { closePopup, fetchTvShowDetail } from '../../actions'

type ReduxMappedProps = {
  genres: Array<TvGenreResult>,
  tvShow: ?TvShowsResult,
  isOpen: boolean
}

type Props = {
  fetchTvShowDetail: (tvShow: string, year: ?number) => void,
  closePopup: Function
} & ReduxMappedProps

type State = {
  position: Animated.Value,
  height: number,
  expanded: boolean
}

const { width, height } = Dimensions.get('window')

class MoviePopup extends Component<Props, State> {
  state = {
    position: new Animated.Value(height),
    height,
    expanded: false
  }

  componentDidMount () {
    const { tvShow } = this.props
    if (!tvShow) return
    this.props.fetchTvShowDetail(tvShow.name)
  }

  componentWillReceiveProps (nextProps: Props) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen()
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose()
    }

    if (nextProps.tvShow) {
      const { tvShow: { name } } = nextProps
      this.props.fetchTvShowDetail(name)
    }
  }

  animateOpen = () => {
    Animated.timing(
      this.state.position, { toValue: 0 }
    ).start()
  }

  animateClose = () => {
    Animated.timing(
      this.state.position, { toValue: height }
    ).start()
    this.props.closePopup()
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
    const { tvShow } = this.props
    const { genre_ids, name, poster_path } = tvShow || {}

    const genreIds: number[] = genre_ids || []
    return (
      <Animated.View style={[styles.modal, {
        height: this.state.height,
        transform: [{ translateY: this.state.position }, { translateX: 0 }]
      }]}>
        <TouchableOpacity onPress={this.animateClose} >
          <View style={styles.backButton}>
            <FontAwesome name='chevron-left' size={32} color='gray' />
            <Text>Back</Text>
          </View>
        </TouchableOpacity>
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
            <Text>{ genreIds.reduce(this.getGenreTag, []).join(', ') }</Text>
            <Text>Showtime</Text>
            <Text>Add show time options here</Text>
          </View>
        </View>
      </Animated.View>
    )
  }
}

const mapStateToProps = ({ tvShows: { genres }, popup: { tvShow, isOpen } }): ReduxMappedProps => {
  return { genres, tvShow, isOpen }
}

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
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
  backButton: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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

export default connect(mapStateToProps, {
  closePopup,
  fetchTvShowDetail
})(MoviePopup)
