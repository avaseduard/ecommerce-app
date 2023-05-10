// import { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom'
// import { currentAdmin } from '../../functions/auth'
// import LoadingToRedirect from './LoadingToRedirect'

// const AdminRoute = ({ children }) => {
//   // Get the user from state
//   const { user } = useSelector(state => ({ ...state }))
//   // const currentUser = useSelector(state => state.user.currentUser)
//   const [ok, setOk] = useState(false)

//   // Check if we have user in redux store, give the user's token to be checked as an admin in backend
//   useEffect(() => {
//     if (user && user.token) {
//       currentAdmin(user.token)
//         .then(res => {
//           console.log('CURRENT ADMIN', res)
//           setOk(true)
//         })
//         .catch(error => {
//           console.log('ADMIN ROUTE ERROR', error)
//           setOk(false)
//         })
//     }
//   }, [user])

//   // If we don't have an user, allow navigate to auth route, if we have an user, redirect to shop and protect the auth route
//   // return ok ? <Outlet /> : <Navigate to='/' />
//   return ok ? <Outlet /> : <LoadingToRedirect />
// }

// export default AdminRoute

import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin } from '../../functions/auth'

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector(state => ({ ...state }))
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(res => {
          console.log('CURRENT ADMIN RES', res)
          setOk(true)
        })
        .catch(err => {
          console.log('ADMIN ROUTE ERR', err)
          setOk(false)
        })
    }
  }, [user])

  return ok ? <Route {...rest} /> : <LoadingToRedirect />
}

export default AdminRoute
