import React from 'react'
import './CreateCoursePopup.css'

class CreateCoursePopup extends React.Component {
  constructor (props) {
    super(props)
    // Store local variable is state, not needed for now
    this.state = {
      temp: false
    }
  }

  render () {
    return (
      <div>
        <div className='Popup-Container' onClick={() => this.props.closeCreateCoursePopup()} />
        <div className='Popup'>
          <div className='Popup-Header'><h3>Add a Course</h3></div>
          <div className='Popup-Options'>
            <div className='Popup-Options-Option'><p>Class Name: </p><input /></div>
            <div className='Popup-Options-Option'><p>Class Location: </p>
              <select className='Popup-Options-Option-Select'>
                <option value='Classroom A'>Classroom A</option>
                <option value='Classroom B'>Classroom B</option>
                <option value='Classroom C'>Classroom C</option>
              </select>
            </div>
            <div className='Popup-Options-Option'><p>Lab Location: </p>
              <select className='Popup-Options-Option-Select'>
                <option value='Classroom A'>Classroom A</option>
                <option value='Classroom B'>Classroom B</option>
                <option value='Classroom C'>Classroom C</option>
              </select>
            </div>
            <div className='Popup-Options-Option'><p>Tutorial Location: </p>
              <select className='Popup-Options-Option-Select'>
                <option value='Classroom A'>Classroom A</option>
                <option value='Classroom B'>Classroom B</option>
                <option value='Classroom C'>Classroom C</option>
              </select>
            </div>
          </div>
          <div>
            <p className='Popup-TextAreaHeader'>Class List: </p><textarea className='Popup-TextArea' />
          </div>
          <div><p>Class Link: </p><a className='Popup-Link'>attendancetracker.com/dmac/1827938</a></div>
          <div className='Popup-Buttons'>
            <div onClick={() => this.props.closeCreateCoursePopup()} className='View-Edit-Button View-Add-Course'>SAVE</div>
            <div className='View-Edit-Button View-Remove-Course' onClick={() => this.props.closeCreateCoursePopup()}>Cancel</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCoursePopup
