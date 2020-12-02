import React from 'react'
import './ErrorPopup.css'

class ErrorPopup extends React.Component {
  constructor (props) {
      super(props)
      this.state = {
        temp: false
      }
    }

    render () { 
        return (
            <div>
                <div className = 'Error-Popup-Container' onClick ={() => this.props.exitErrorPopup()} />
                <div className = 'Error-Popup' >
                    <p>Error Adding Course</p>
                    <div onClick = 'View-Edit-Button View-Remove-Course' onClick={() => this.props.exitErrorPopup()}>Close</div>
                </div>
            </div>  
        )
    }
}

export default ErrorPopup
