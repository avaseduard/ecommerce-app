import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './reducers/user.reducer'
// import { categoriesReducer } from './categories/category.reducer'
// import { cartReducer } from './cart/cart.reducer'

// Use the combineReducers method to combine all reducers into a general one; they keys are the name of the reducer slice and the value is the actual reducer function
export const rootReducer = combineReducers({
  user: userReducer,
  // categories: categoriesReducer,
  // cart: cartReducer,
})