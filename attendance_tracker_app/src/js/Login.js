import React from 'react'
import '../css/login.css'
import loginImage from '../images/Login_Image.svg'
import { Route, Switch, Redirect, Router } from 'react-router-dom'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      login: false,
      forgotPassword: false,
      createAccount: false
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
            <img className='Login-Image' src={loginImage} alt='Login Image' />

          </div>
          <div className='box3'>
            <h4 className='Login-Header'>Account Login</h4>
            <form>
            <label htmlFor="Email">Email</label>
            <input id="Email" type='email' placeholder='Email' />
            <div />
            <label htmlFor="Password">Password</label>
            <input id="Password" type='password' placeholder='Password' />
            <div />
            <button className='Login-Button' onClick={() => this.setState({ login: true })}>Login</button>
            </form>
            <h3>{this.state.error}</h3>
            {/* {this.state.login ? <Route to='/' /> : null} */}
            <div />

            <br />
            <div className='Login-Forgot-Email' onClick={() => this.setState({ forgotPassword: !this.state.forgotPassword })}>Forgot Password?</div>
            {this.state.forgotPassword ? <Redirect to='/login' /> : null}
            <div className='Login-Account' onClick={() => this.setState({ createAccount: !this.state.createAccount })}>Create your Account</div>
            {this.state.createAccount ? <Redirect to='/createaccount' /> : null}

          </div>
        </div>
      </div>
    )
  }
}

export default Login
