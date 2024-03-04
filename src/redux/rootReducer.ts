import { combineReducers } from '@reduxjs/toolkit'
import dashboardSlice from '../pages/Dashboard/store/slice'

export const rootReducer = combineReducers({
  dashboardSlice,
})
