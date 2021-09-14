import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Player {
  id: number,
  name: string
  position: string
  totalPoints: 0
}

export const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    getPlayers: build.query<Player[], void>({ query: () => '/players/' }),
  }),
})

export const { useGetPlayersQuery } = playerApi
