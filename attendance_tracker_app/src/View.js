import React from 'react'
import './View.css'
import { Redirect, useLocation } from 'react-router-dom'
import CreateCoursePopup from './CreateCoursePopup.js'

class View extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      logout: false,
      createCoursePopup: false,
      redirectOption: 'lecture',
      courses: []
    }
    this.closeCreateCoursePopup = this.closeCreateCoursePopup.bind(this)
  }

  closeCreateCoursePopup () {
    this.setState({ createCoursePopup: !this.state.createCoursePopup })
  }

  render () {

    var id = useLocation().split('/')[-1]

    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      //xhr.responseText formatting if needed
      courses.push() //List of course numbers
    })

    xhr.open('GET', "http://ats@192.168.56.101/class/search/byUser/" + id)
    xhr.send()

    return (
      <div className='View'>
        {this.state.createCoursePopup ? <CreateCoursePopup closeCreateCoursePopup={this.closeCreateCoursePopup} /> : null}
        <div className='View-Header'>
          <div className='Header-Text'>ATTENDANCE TRACKER </div>
          <div className='Logout'> <button onClick={() => this.setState({ logout: true })}>Logout</button>
            {this.state.logout ? <Redirect to='/login' /> : null}
          </div>
        </div>

        <div className='View-Container'>
          <h5 className='View-Title-Courses'>Your Courses</h5>
          <div className='View-Total-Frame'>
            {this.state.courses.map(course =>
              <div className='View-Courses' key={course}>
                {this.state.login ? <Redirect to={'/' + course + '/' + this.state.redirectOption} /> : null}
                <h3 className='View-Courses-Header'>{course}</h3>
                <div className='View-Courses-Popup'>
                  <div className='View-Courses-Popup-Option' onClick={() => this.setState({ redirectOption: 'lecture', login: true })}>Lecture</div>
                  <div className='View-Courses-Popup-Option' onClick={() => this.setState({ redirectOption: 'lab', login: true })}>Lab</div>
                  <div className='View-Courses-Popup-Option' onClick={() => this.setState({ redirectOption: 'tutorial', login: true })}>Tutorial</div>
                </div>
              </div>
            )}
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
