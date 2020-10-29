import React from 'react'
import './View.css'

class View extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      states: false
    }
  }

  render () {
    return (
      <div className='View'>
        <div className='Header'>
          <a align="left">ATTENDANCE TRACKER</a>
            <a class="button" href="#top">COURSES</a>
            <a class="button" href="#top">INBOX</a>
            <a class="button" href="#top">SETTINGS</a>
            <a class=".secondary-button" href="./Login.js" align="right">LOG OUT</a>
        </div>
        <p>User is a {this.props.prof ? 'prof' : 'student'}</p>
        <button onClick={() => this.props.logout()}>Logout</button>

        <div className='View-Container'>
          <h5 className='View-Title-Courses'>Your Courses</h5>
          <div className='View-Total-Frame'>
            <a href='#' className='View-Courses'></a>
            <a href='#' className='View-Courses'></a>
            
          </div>
          <div className='View-Area-Button View-Edit-Course'>
            <a href='#' className='View-Edit-Button View-Add-Course'>ADD NEW COURSE</a>
            <a href='#' className='View-Edit-Button View-Remove-Course'>REMOVE COURSE</a>
          </div>
        </div>
      </div>
    )
  }
}

export default View
