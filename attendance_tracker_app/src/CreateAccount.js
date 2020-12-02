import React from 'react'
import './CreateAccount.css'
import loginImage from './graphic_assets/Login_Image.svg'
import { Redirect } from 'react-router-dom'

const MIN_NAME_LENGTH = 1
const MIN_EMAIL_LENGTH = 5
const MIN_PASSWORD_LENGTH = 8

class CreateAccount extends React.Component {
  constructor (props) {
    super(props)
    this.par = props.par
    this.state = {
      error: null,
      back: false,
      prof: true,
      created: false
    }
    // This page should be a form that sends all feild's value to the login function on submit
  }

  requestCreate(type) {
    var xhr = new XMLHttpRequest()
    var waiting = true
    var sup = this
    var name = document.getElementById('accountName').value
    var email = document.getElementById('accountEmail').value
    var password = document.getElementById('accountPassword').value
    xhr.onreadystatechange = function() {
        try {
            if(this.status == 200 && waiting) {
                waiting = false
                sup.createUser(name, email, type);
            }
        } catch (err) {}
    }
    xhr.open('POST', 'http://localhost:8080/user/create/email/' + email + '/password/' + password + '/type/' + type)
    xhr.send()
  }

  createUser(name, email, type) {
    var xhr = new XMLHttpRequest()
    var waiting = true
    var sup = this
    var typeString = 'student'
    if(type == 2) {
        typeString = 'professor'
    }
    xhr.onreadystatechange = function() {
        try {
            if(this.status == 200 && waiting) {
                var user = JSON.parse(xhr.responseText)
                sup.login(user.id, email, type)
            }
        } catch (err) {}
    }
    xhr.open('POST', 'http://localhost:8080/' + typeString + '/create/name/' + name + '/email/' + email)
    xhr.send()
  }

  login(id, email, type) {
    console.log('here')
//    this.par().setUserInformation({
//        userId: id,
//        email: email,
//        type: type
//    })
//    console.log(this.par())
    this.setState({ login: true })
  }

  tryCreateAccount (tryName, tryEmail, tryPassword) {
    // Secure account creation with backend information saving if valid, for now does nothing
    if (tryName.length < MIN_NAME_LENGTH) {
      this.setState({ error: 'Name not filled in properly' })
    }
    else if (tryEmail.length < MIN_EMAIL_LENGTH) {
      this.setState({ error: 'Email not filled in properly' })
    } else if (tryPassword.length < MIN_PASSWORD_LENGTH) {
      this.setState({ error: 'Password not filled in properly' })
    } else {
      if (this.state.prof) {
        // Check input values for prof account creation validation

        // if CreateProfAccount is successfull
        this.setState({ created: true })
        // else
        this.setState({ error: 'Cannot create professor account' })
      } else {
      // Check input values for student account creation validation

        // if CreateProfAccount is successfull
        this.setState({ created: true })
        // else
        this.setState({ error: 'Cannot create student account' })
      }
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
            {this.state.prof ? null : <input type='text' id='accountOneTimeKey' name='accountOneTimeKey' placeholder='One-time Security Key' />}
            <div />
            <button className='CreateAccount-Button' onClick={() => this.requestCreate(1)}>Create Student Account</button>
            <div />
            <button className='CreateAccount-Button' onClick={() => this.requestCreate(2)}>Create Professor Account</button>
            {this.state.created ? <Redirect to='/' /> : null}
            <br />
            <div className='CreateAccount-backToLogin' onClick={() => this.setState({ back: !this.state.back })}>Back To Login</div>
            {this.state.back ? <Redirect to='/login' /> : null}

          </div>
        </div>
      </div>
    )
  }
}

export default CreateAccount
