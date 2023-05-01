import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, googleAuthProvider } from '../../firebase'
import { MailOutlined, GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { toast } from 'react-toastify'

import { setCurrentUser } from '../../store/reducers/user.reducer'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Login with email and password; get the result from firebase, destructure user and token and update them to redux store
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()
      dispatch(
        setCurrentUser({
          email: user.email,
          token: idTokenResult.token,
        })
      )
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  // Login with google; get the result from firebase, destructure user and token and update them to redux store
  const googleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()
      dispatch(
        setCurrentUser({
          email: user.email,
          token: idTokenResult.token,
        })
      )
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? <h4>loading...</h4> : <h4>login</h4>}
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='enter email address...'
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            <input
              type='pasword'
              placeholder='enter your password...'
              className='form-control'
              value={password}
              onChange={e => setPassword(e.target.value)}
              // autoFocus
            />
            <br />
            <Button
              onClick={handleSubmit}
              type='primary'
              className='mb-3'
              block
              shape='round'
              icon={<MailOutlined />}
              size='large'
              disabled={!email || password.length < 6}
            >
              login with email & password
            </Button>
            <Button
              onClick={googleLogin}
              type='primary'
              danger
              className='mb-3'
              block
              shape='round'
              icon={<GoogleOutlined />}
              size='large'
            >
              login with google
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
