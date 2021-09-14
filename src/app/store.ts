import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import teamReducer from '../features/team/teamSlice'
import { playerApi } from '../services/players'

export const store = configureStore({
  reducer: {
    team: teamReducer,
    [playerApi.reducerPath]: playerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(playerApi.middleware)
  ),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
