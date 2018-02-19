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
import type { MovieModel } from '../../data/movies'
import { defaultStyles } from '../../styles'

type Props = {
  movie: MovieModel,
  onOpen: Function
}

const { width, height } = Dimensions.get('window')
const cols = 3
const rows = 3

export default class MoviePoster extends Component<Props> {
  render () {
    const { movie, movie: { title, genre, poster }, onOpen } = this.props
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(movie)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: poster }} style={styles.image} />
        </View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.genre} numberOfLines={1}>{genre}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10
  },
  imageContainer: {
    flex: 1
  },
  image: {
    borderRadius: 10,
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
