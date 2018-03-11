// @flow
import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native'
import type { TvShowsResult } from 'types'
import { defaultStyles } from '../../styles'
type Props = {
  movie: TvShowsResult,
  onOpen: (movie: TvShowsResult) => void
}

const { width } = Dimensions.get('window')
const cols = 3

export default class MoviePoster extends Component<Props> {
  getStyles () {
    const containerWidth = width / cols
    return {
      container: {
        height: containerWidth * 1.5 - 10,
        width: containerWidth - 10
      }
    }
  }

  render () {
    const { movie, movie: { name, poster_path, vote_average }, onOpen } = this.props
    return (
      <TouchableOpacity style={[styles.container, this.getStyles().container]} onPress={() => onOpen(movie)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }} style={styles.image} />
        </View>
        <Text style={styles.title} numberOfLines={1}>{name}</Text>
        <Text style={styles.genre} numberOfLines={1}>{vote_average}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 7.5,
    marginBottom: 5
  },
  imageContainer: {
    flex: 1
  },
  image: {
    borderRadius: 5,
    ...StyleSheet.absoluteFillObject
  },
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14
  }
})
