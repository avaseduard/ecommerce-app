import { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const Register = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Email is required.')
    }
    
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }
    await auth.sendSignInLinkToEmail(email, config)
    toast.success(
      `Message sent to ${email}. Click link to complete registration.`
    )
    // Set email to local storage for complete page
    window.localStorage.setItem('emailForRegistration', email)
    // Clear input field
    setEmail('')
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>register</h4>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='enter email address...'
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            <br />
            <button type='submit' className='btn btn-primary'>
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
