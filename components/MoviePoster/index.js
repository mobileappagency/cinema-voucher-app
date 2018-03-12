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
        width: containerWidth - 10
      }
    }
  }

  render () {
    const { movie, movie: { name, poster_path, vote_average }, onOpen } = this.props
    return (
      <TouchableOpacity style={[styles.container, this.getStyles().container]} onPress={() => onOpen(movie)}>
        <View>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }} style={styles.image} />
        </View>
        <View>
          <Text style={styles.title} numberOfLines={1}>{name}</Text>
          <Text style={styles.voteAverage} numberOfLines={1}>User Rating: {vote_average}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 7.5,
    marginBottom: 5
  },
  image: {
    borderRadius: 5,
    width: (width / cols) - 10,
    height: ((width / cols) * 1.48) - 10
  },
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4
  },
  voteAverage: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14
  }
})
