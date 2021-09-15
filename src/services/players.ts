import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Player } from '../types'

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    getPlayers: build.query<Player[], void>({ query: () => '/players/' }),
  }),
})

export const { useGetPlayersQuery } = playerApi
