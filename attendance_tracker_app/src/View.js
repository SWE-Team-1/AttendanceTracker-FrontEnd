import React from 'react'
import './View.css'
import { Redirect } from 'react-router-dom'
import CreateCoursePopup from './CreateCoursePopup.js'

class View extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      logout: false,
      createCoursePopup: false
    }
    this.closeCreateCoursePopup = this.closeCreateCoursePopup.bind(this)
  }

  closeCreateCoursePopup () {
    this.setState({ createCoursePopup: !this.state.createCoursePopup })
  }

  render () {
    return (
      <div className='View'>
        {this.state.createCoursePopup ? <CreateCoursePopup closeCreateCoursePopup={this.closeCreateCoursePopup} /> : null}
        <div classname='View-Header'>
          <div className='Header-Text'>ATTENDANCE TRACKER ({this.props.prof ? 'Professor' : 'Student'})</div>
          <div className='Logout'> <button onClick={() => this.setState({ logout: true })}>Logout</button>
            {this.state.logout ? <Redirect to='/login' /> : null}
          </div>
        </div>

        <div className='View-Container'>
          <h5 className='View-Title-Courses'>Your Courses</h5>
          <div className='View-Total-Frame'>
            <button className='View-Courses' onClick={() => this.setState({ login: true })} />
            {this.state.login ? <Redirect to='/classroom' /> : null}
            <a href='#' className='View-Courses' />
            <a href='#' className='View-Courses' />

          </div>
          <div className='View-Area-Button View-Edit-Course'>
            <div onClick={() => this.setState({ createCoursePopup: !this.state.createCoursePopup })} className='View-Edit-Button View-Add-Course'>ADD NEW COURSE</div>
            <div href='' className='View-Edit-Button View-Remove-Course'>REMOVE COURSE</div>
          </div>
        </div>
      </div>
    )
  }
}

export default View
