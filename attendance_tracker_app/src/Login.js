import React from 'react'
import './login.css'
import loginImage from './graphic_assets/Login_Image.svg';

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null
    }
    // This page should be a form that sends all feild's value to the login function on submit
  }

  verifyLogin (credentials, unsecurepassword) {
    // Secure Login with backend indentification, for now just grant access by default
    if (unsecurepassword === 'unsecure-password') {
      if (credentials === 'prof') this.props.loginProf()
      else this.props.login()
    } else {
      this.setState({ error: 'Incorrect credentials, try again' })
    }
  }

  render () {
    return (
      <div className='Login'>
        <div className='box1'>
          <div className='box2'>
        <img className='Login-Image' src={loginImage} alt="Login Image" />

          </div>
          <div className='box3'>
            <h4 className='Login-Header'>Login</h4>
            <input type='email' placeholder='Email' />
            <div />
            <input type='password' placeholder='Password' />
            <div />
            <h3>{this.state.error}</h3>
            <button className='Login-Button' onClick={() => this.verifyLogin('test credentials', 'unsecure-password')}>Login</button>
            <div />
            <button className='Login-Button' onClick={() => this.verifyLogin('prof', 'unsecure-password')}>TEMP: Login as prof</button>

            <br />
            <a href='#' className='Login-Forgot-Email'>Forgot Password?</a>
            <br />
            <a href='#' className='Login-Account'>Create your Account</a>

          </div>
        </div>
      </div>
    )
  }
}

export default Login
