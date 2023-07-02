import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './reducers/user.reducer'
import { searchReducer } from './reducers/search.reducer'
import { cartReducer } from './reducers/cart.reducer'
import {drawerReducer} from './reducers/drawer.reducer'

// Use the combineReducers method to combine all reducers into a general one; they keys are the name of the reducer slice and the value is the actual reducer function
export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
})
