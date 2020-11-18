import React from 'react'
import './CreateAccount.css'
import loginImage from './graphic_assets/Login_Image.svg'
import { Redirect } from 'react-router-dom'

class CreateAccount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      prof: false
    }
    // This page should be a form that sends all feild's value to the login function on submit
  }

  tryCreateAccount (tryName, tryEmail, tryPassword) {
    // Secure account creation with backend information saving if valid, for now does nothing
    if (this.state.prof) {
      //Check input values for prof account creation validation
    } else {
      //Check input values for student account creation validation
      this.setState({ error: 'Invalid account creation'})
    }
  }

  render () {
    return (
      <div className='CreateAccount'>
        <div className='box1'>
          <div className='box2'>
            <img className='Login-Image' src={loginImage} alt='Login Image' />

          </div>
          <div className='box3'>
            <h4 className='CreateAccount-Header'>Create Account</h4>
            <input type='text' id='accountName' name='accountName' placeholder='Name' />
            <div />
            <input type='email' id='accountEmail' name='accountEmail' placeholder='Email' />
            <div />
            <input type='password' id='accountPassword' name='accountPassword' placeholder='Password' />
            <div />
            {this.state.prof ? null : <input type='text' id='accountOneTimeKey' name='accountoneTimeKey' placeholder='One-time Security Key' />}
            <div />
            <button className='CreateAccount-Button' onClick={() => this.tryCreateAccount(document.getElementById("accountName").value, document.getElementById("accountEmail").value, document.getElementById("accountPassword").value)}>Create Account</button>

            <br />
            <a href='/login' className='CreateAccount-backToLogin'>Back To Login</a>

          </div>
        </div>
      </div>
    )
  }
}

export default CreateAccount