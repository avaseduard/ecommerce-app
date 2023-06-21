import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  text: '',
}

// First value is the name of the slice; second value is the intitial state; third value is the reducers (name of the reducer function that represents the action that updates this slice of the user reducer state; it gets the state and the action)
export const searchSlice = createSlice({
  name: 'search',
  initialState: INITIAL_STATE,
  reducers: {
    setSearch(state, action) {
      // Update the state with the action payload
      state.text = action.payload
    },
    // logoutUser(state, action) {
    //   // Update the state with the action payload
    //   state.user = null
    // },
  },
})

// Destructure the actions off setSearchQuery
export const {
  setSearch,
  // logoutUser
} = searchSlice.actions

// Get the reducer off the created slice
export const searchReducer = searchSlice.reducer
