import { OMDB_API_ENDPOINT, OMDB_API_KEY } from 'react-native-dotenv'

import * as fetchService from './fetch'
import type { TvShowsDetailResult } from 'types'

export const fetchByTitle = async (title: string, year: ?number): Promise<TvShowsDetailResult> => {
  const popularTvShows: TvShowsDetailResult = await fetchService.getRequest(
    `${OMDB_API_ENDPOINT}?apikey=${OMDB_API_KEY}&t=${title}&y=${year || ''}&plot=full`
  )

  return popularTvShows
}
