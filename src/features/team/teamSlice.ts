import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Player, TeamState, Formation } from '../../types'

const initialState: TeamState = {
  formation: Formation.FourFourTwo,
  goalkeeper: null,
  defenders: [null, null, null, null],
  midfielders: [null, null, null, null],
  forwards: [null, null],
}

const findNextPosition = (arr: (Player | null)[]) => arr.findIndex(i => !i)

const removePlayerFromList = (arr: (Player | null)[], playerToRemove: Player) => {
  return arr.map(player => {
    if (player?.id === playerToRemove.id) return null
    return player
  })
}

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    changeFormation: (state, action: PayloadAction<Formation>) => {
      const [dfCount, mfCount, fwCount] = action.payload.split('-').map((n: string) => Number(n))
      state.goalkeeper = null
      state.defenders = Array(dfCount).fill(null)
      state.midfielders = Array(mfCount).fill(null)
      state.forwards = Array(fwCount).fill(null)
      state.formation = action.payload
    },
    addPlayerToTeam: (state, action: PayloadAction<Player>) => {
      switch (action.payload.position) {
        case 'GK': {
          state.goalkeeper = action.payload
          break
        }
        case 'DF': {
          state.defenders[findNextPosition(state.defenders)] = action.payload
          break
        }
        case 'MF': {
          state.midfielders[findNextPosition(state.midfielders)] = action.payload
          break
        }
        case 'FW': {
          state.forwards[findNextPosition(state.forwards)] = action.payload
          break
        }
      }
    },
    removePlayerFromTeam: (state, action: PayloadAction<Player>) => {
      switch (action.payload.position) {
        case 'GK': {
          state.goalkeeper = null
          break
        }
        case 'DF': {
          state.defenders = removePlayerFromList(state.defenders, action.payload)
          break
        }
        case 'MF': {
          state.midfielders = removePlayerFromList(state.midfielders, action.payload)
          break
        }
        case 'FW': {
          state.forwards = removePlayerFromList(state.forwards, action.payload)
          break
        }
      }
    },
  },
})

export const selectTeam = (state: RootState) => state.team

export const selectFormation = (state: RootState) => state.team.formation

export const { changeFormation, addPlayerToTeam, removePlayerFromTeam } = teamSlice.actions

export default teamSlice.reducer
