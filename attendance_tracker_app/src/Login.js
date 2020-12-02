import React from 'react'
import './login.css'
import loginImage from './graphic_assets/Login_Image.svg'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.par = props.par
    this.state = {
      error: null,
      login: false,
      forgotPassword: false,
      createAccount: false,
      email: null,
      password: null,
      userId: null
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

  requestLogin () {
    var xhr = new XMLHttpRequest()
    var waiting = true
    var sup = this
    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passwordField').value;
    xhr.onreadystatechange = function() {
        try {
            if(this.status == 200 && waiting) {
                var user = JSON.parse(xhr.responseText)
                if(user.type != 0) {
                    sup.login(user.id, user.email, user.type)
                } else {
                    sup.loginError()
                }
                waiting = false;
            }
        } catch (err) {}
    }
    xhr.open('GET', 'http://localhost:8080/user/login/email/' + email + '/password/' + password)
    xhr.send()
  }

  login(id, email, type) {
    this.par().setUserInformation({
        userId: id,
        email: email,
        type: type
    })
    this.setState({ login: true })
  }

  loginError() {
    alert("Invalid username / password")
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
            <input type='email' id='emailField' placeholder='Email' />
            <div />
            <input type='password' id='passwordField' placeholder='Password' />
            <div />
            <h3>{this.state.error}</h3>
            <button className='Login-Button' onClick={() => this.requestLogin()}>Login</button>
            {this.state.login ? <Redirect to='/' /> : null}
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
