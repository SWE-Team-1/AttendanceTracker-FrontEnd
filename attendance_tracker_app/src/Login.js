import React from 'react'
import './login.css'
import loginImage from './graphic_assets/Login_Image.svg'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      login: false,
      forgotPassword: false,
      createAccount: false,
      id = null
    }
    // This page should be a form that sends all feild's value to the login function on submit
  }

  verifyLogin () {
    // Secure Login with backend indentification, for now just grant access by default

    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      //check xhr.responseText for valid login
      //if valid
      this.state = { login: true, id = xhr.responseText}
    })

    xhr.open('GET', "http://ats@192.168.56.101//user/login/email/" + document.getElementById('loginEmail') + "/password/" + document.getElementById('loginPassword'))
    xhr.send()

  }

  render () {
    return (
      <div className='Login'>
        <div className='box1'>
          <div className='box2'>
            <img className='Login-Image' src={loginImage} alt='Login Image' />

          </div>
          <div className='box3'>
            <h4 className='Login-Header'>Login</h4>
            <input type='email' placeholder='Email' id='loginEmail' />
            <div />
            <input type='password' placeholder='Password' id='loginPassword' />
            <div />
            <h3>{this.state.error}</h3>
            <button className='Login-Button' onClick={() => this.verifyLogin()}>Login</button>
            {this.state.login ? <Redirect to={ concat('/', this.state.id) } /> : null}
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
