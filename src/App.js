import { useEffect } from 'react'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
//! import { setCurrentUser } from './store/reducers/user.reducer'
import { setUser } from './store/reducers/user.reducer'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/nav/Header' //
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'
import UserRoute from './components/routes/UserRoute'
import History from './pages/user/History'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'

import { currentUser } from './functions/auth'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
          .then(response => {
            dispatch(
              //! setCurrentUser({
              setUser({
                name: response.data.name,
                email: response.data.email,
                token: idTokenResult.token,
                role: response.data.role,
                _id: response.data._id,
              })
            )
          })
          .catch(error => console.log(error))
      }
    })
    return unsubscribe
  }, [])

  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/complete' element={<RegisterComplete />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route element={<UserRoute />}>
          <Route path='user/history' element={<History />} />
          <Route path='user/password' element={<Password />} />
          <Route path='user/wishlist' element={<Wishlist />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/category' element={<CategoryCreate />} />
          <Route path='/admin/category/:slug' element={<CategoryUpdate />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
