import React from 'react'
import './View.css'
import PopUpMenu from './PopUpMenu.js'

class View extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
      //states: false
    }
  }

 /* toggleMenu = () => {
    this.setState({show: !this.state.show});
  }*/

  render () {
    return (
      <div className='View'>
        <div classname='View-Header'>
          <div className='Header-Text'>ATTENDANCE TRACKER ({this.props.prof ? 'Professor' : 'Student'})</div>
          <div className='Logout'><button onClick={() => this.props.logout()}>Logout</button></div>
        </div>

        <div className='View-Container'>
          <h5 className='View-Title-Courses'>Your Courses</h5>
          <div className='View-Total-Frame'>

            <a className='View-Courses'>
              <div className="Header-Text">SWE4103</div>
              <button href="#">LECTURE</button>
              <button href="#">TUTORIAL</button>
              <button href="#">LAB</button>
            </a>
            
            <a className='View-Courses'>
              <div className="Header-Text">CS3413</div>
              <button href="#">LECTURE</button>
              <button href="#">LAB</button>
            </a>

            <a className='View-Courses'>
              <div className="Header-Text">CS3383</div>
              <button href="#">LECTURE</button>
              <button href="#">TUTORIAL</button>
            </a>

            <a className='View-Courses'>
              <div className="Header-Text">ENGG4013</div>
              <button href="#">LECTURE</button>
            </a>

            <a className='View-Courses'>
              <div className="Header-Text">SWE4040</div>
              <button href="#">LECTURE</button>
            </a>
            
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
