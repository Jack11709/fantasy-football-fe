import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export enum Formation {
    FiveFourOne = '5-4-1',
    FiveThreeTwo = '5-3-2',
    FourFourTwo = '4-4-2'
}

export interface FormationState {
    formation: Formation
}

const initialState: FormationState = {
  formation: Formation.FourFourTwo,
}

export const formationSlice = createSlice({
  name: 'formation',
  initialState,
  reducers: {
    changeFormation: (state, action: PayloadAction<Formation>) => {
      state.formation = action.payload
    },
  },
})

export const selectFormation = (state: RootState) => state.formation.formation

export const { changeFormation } = formationSlice.actions

export default formationSlice.reducer
