import React from 'react'
import './View.css'
import { Redirect } from 'react-router-dom'

class View extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      logout: false
    }
  }
  
  render () {
    return (
      <div className='View'>

        <div classname='View-Header'>
          <div className='Header-Text'>ATTENDANCE TRACKER ({this.props.prof ? 'Professor' : 'Student'})</div>
          <div className='Logout'><button onClick={() => this.props.logout()}>Logout</button></div>
        </div>
        <button onClick={() => this.setState({ logout: true })}>Logout</button>
        {this.state.logout ? <Redirect to='/login' /> : null}


        <div className='View-Container'>
          <h5 className='View-Title-Courses'>Your Courses</h5>
          <div className='View-Total-Frame'>
            <a href='#' className='View-Courses' />
            <a href='#' className='View-Courses' />

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
