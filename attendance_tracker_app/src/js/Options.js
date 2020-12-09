import React, { Component } from "react";
import '../css/Options.css'

class ShowOptions extends Component {
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
        <div className='Options-Container' onClick={() => this.props.closeOptions()} />
        <div className='Options'>
          <div className='Options-Header'><h3>Options</h3></div>
          <div className='Options-Dropdown'>
              <div className='Options-Dropdown-Option'><a>Automated Alert Threshold: </a>
              <select className='Options-Dropdown-Option-Select'>
                <option value='3'>3</option>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </div>
            <div className='Options-Dropdown-Option'><a>Edit Seat Arrangement </a></div>
            <div className='Options-Dropdown-Option'><a>View Classlist </a></div>
            <div className='Options-Dropdown-Option'><a>View Attendance Reports </a></div>
            <div className='Options-Dropdown-Option'><a>Clear Attendance Records </a></div>
          </div>
            <div className='Options-Buttons'>
          
            <div className='View-Edit-Button View-Remove-Course' onClick={() => this.props.closeOptions()}>Close</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowOptions
