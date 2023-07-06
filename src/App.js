import { useEffect } from 'react'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { currentUser } from './functions/auth'
import { setUser } from './store/reducers/user.reducer'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/nav/Header'
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
import SubcategoryCreate from './pages/admin/subcategory/SubcategoryCreate'
import SubcategoryUpdate from './pages/admin/subcategory/SubcategoryUpdate'
import ProductCreate from './pages/admin/product/ProductCreate'
import AllProducts from './pages/admin/product/AllProducts'
import ProductUpdate from './pages/admin/product/ProductUpdate'
import Product from './pages/Product'
import CategoryHome from './pages/category/CategoryHome'
import SubcategoryHome from './pages/subcategory/SubcategoryHome'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import SideDrawer from './components/drawer/SideDrawer'
import Checkout from './pages/Checkout'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
          .then(response => {
            dispatch(
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
      <SideDrawer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/complete' element={<RegisterComplete />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/product/:slug' element={<Product />} />
        <Route path='/category/:slug' element={<CategoryHome />} />
        <Route path='/subcategory/:slug' element={<SubcategoryHome />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route element={<UserRoute />}>
          <Route path='user/history' element={<History />} />
          <Route path='user/password' element={<Password />} />
          <Route path='user/wishlist' element={<Wishlist />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/category' element={<CategoryCreate />} />
          <Route path='/admin/category/:slug' element={<CategoryUpdate />} />
          <Route path='/admin/subcategory' element={<SubcategoryCreate />} />
          <Route
            path='/admin/subcategory/:slug'
            element={<SubcategoryUpdate />}
          />
          <Route path='/admin/product' element={<ProductCreate />} />
          <Route path='/admin/product/:slug' element={<ProductUpdate />} />
          <Route path='/admin/products' element={<AllProducts />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
