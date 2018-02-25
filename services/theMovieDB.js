// @flow
import { TMDB_API_KEY, TMDB_API_ENDPOINT } from 'react-native-dotenv'
import * as fetchService from './fetch'

type TvShowsResult = {
  name: string,
  poster_path: string,
  original_language: string,
  overview: string,
  vote_average: number,
  vote_count: number
}

type TvShowsResults = {
  results: Array<TvShowsResult>,
}

type TvShowsGenreResults = {
  genres: Array<string>
}

export const fetchMostPopular = async (): Promise<TvShowsResults> => {
  const popularTvShows: TvShowsResults = await fetchService.getRequest(
    `${TMDB_API_ENDPOINT}discover/tv?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`
  )

  return popularTvShows
}

export const fetchAllGenres = async (): Promise<TvShowsGenreResults> => {
  const allTvShowGenres: TvShowsGenreResults = await fetchService.getRequest(
    `${TMDB_API_ENDPOINT}genre/tv?api_key=${TMDB_API_KEY}&language=en-US`
  )

  return allTvShowGenres
}

export type { TvShowsResult, TvShowsGenreResults, TvShowsResults }
