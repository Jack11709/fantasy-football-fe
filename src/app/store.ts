import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import formationReducer from '../features/formation/formationSlice'

export const store = configureStore({
  reducer: {
    formation: formationReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
