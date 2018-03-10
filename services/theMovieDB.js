// @flow
import { TMDB_API_KEY, TMDB_API_ENDPOINT } from 'react-native-dotenv'
import * as fetchService from './fetch'
import type { GenreType, TvShowsGenreResults, TvGenreResult, TvShowsResults } from 'types'

export const fetchMostPopular = async (): Promise<TvShowsResults> => {
  const popularTvShows: TvShowsResults = await fetchService.getRequest(
    `${TMDB_API_ENDPOINT}discover/tv?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`
  )

  return popularTvShows
}

export const fetchGenres = async (type: GenreType): Promise<Array<TvGenreResult>> => {
  const { genres }: TvShowsGenreResults = await fetchService.getRequest(
    `${TMDB_API_ENDPOINT}genre/${type}/list?api_key=${TMDB_API_KEY}&language=en-US`
  )

  return genres
}

export const fetchAllGenres = async (): Promise<TvShowsGenreResults> => {
  const tvShowGenres: Array<TvGenreResult> = await fetchGenres('tv')
  const movieGenres: Array<TvGenreResult> = await fetchGenres('movie')

  return {
    genres: [
      ...tvShowGenres,
      ...movieGenres
    ]
  }
}
