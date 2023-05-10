import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoute = ({ children }) => {
  // Get the user from state
  const { user } = useSelector(state => ({ ...state }))
  // const currentUser = useSelector(state => state.user.currentUser)

  // If we don't have an user, allow navigate to auth route, if we have an user, redirect to shop and protect the auth route
  return user && user.token ? <Outlet /> : <Navigate to='/' />
}

export default UserRoute
