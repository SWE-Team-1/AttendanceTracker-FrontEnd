import React from 'react'
import './CreateAccount.css'
import loginImage from './graphic_assets/Login_Image.svg'
import { Redirect } from 'react-router-dom'

//Constant values are currently arbitrary
const MIN_NAME_LENGTH = 1
const MIN_EMAIL_LENGTH = 5
const MIN_PASSWORD_LENGTH = 8

class CreateAccount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      back: false,
      prof: true,
      created: false,
      id: null
    }
    // This page should be a form that sends all feild's value to the login function on submit
  }

  tryCreateAccount (tryName, tryEmail, tryPassword) {
    // Secure account creation with backend information saving if valid
    
    //Only allows properly filled out fields to be analyzed
    if (tryName.length < MIN_NAME_LENGTH) {
      this.setState({ error: 'Name not filled in properly' })
    }
    else if (tryEmail.length < MIN_EMAIL_LENGTH) {
      this.setState({ error: 'Email not filled in properly' })
    } else if (tryPassword.length < MIN_PASSWORD_LENGTH) {
      this.setState({ error: 'Password not filled in properly' })
    } else {
      
      var xhr = new XMLHttpRequest()

      xhr.addEventListener('load', () => {
        //If there is an error in creating account, display
        document.getElementById('CreateAccount-Result').value = xhr.responseText
        //Else, should redirect to logged in screen
        this.setState({ created: true, id: xhr.responseText })
      })

      if (this.state.prof) {
        //Attempt Create a professor account
        xhr.open('POST', "http://ats@192.168.56.101/user/create/email/" + tryEmail + "/password/" + tryPassword + "/type/" + 2)
      }
      else {
        //Attempt Create a student account
        xhr.open('POST', "http://ats@192.168.56.101/user/create/email/" + tryEmail + "/password/" + tryPassword + "/type/" + 1)
      }
      xhr.send()
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
            {this.state.prof ? null : <input type='text' id='accountOneTimeKey' name='accountOneTimeKey' placeholder='One-time Security Key' />} {/*Specific for student account creation*/}
            <div />
            <button className='CreateAccount-Button' onClick={() => this.tryCreateAccount(document.getElementById('accountName').value, document.getElementById('accountEmail').value, document.getElementById('accountPassword').value)}>Create Account</button>
            {this.state.created ? <Redirect to='/' /> : null}
            <br />
            <div className='CreateAccount-backToLogin' onClick={() => this.setState({ back: !this.state.back })}>Back To Login</div>
            {this.state.back ? <Redirect to='/login' /> : null}
            <div />
            <h5 classname='CreateAccount-Result' id='CreateAccount-Result' name='CreateAccount-Result' ></h5>

          </div>
        </div>
      </div>
    )
  }
}

export default CreateAccount
