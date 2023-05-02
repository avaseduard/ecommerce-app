import { useEffect } from 'react'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './store/reducers/user.reducer'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/nav/Header' //
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        dispatch(
          setCurrentUser({
            email: user.email,
            token: idTokenResult.token,
          })
        )
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
      </Routes>
    </>
  )
}

export default App
