import { useState } from 'react'
import { auth } from '../../firebase'
import { MailOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    console.table(email, password)
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>login</h4>
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
