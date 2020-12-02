import React from 'react'
import './ErrorMessage.css'

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
                <div className = 'Popup-Container' onClick ={() => this.props.exitErrorPopup()} />
                <div className = 'Popup' >
                    <p>Error Adding Course</p>
                    <div onClick = 'View-Edit-Button View-Remove-Course' onClick={() => this.props.closeErrorPopup()}>Close</div>
                </div>
            </div>  
        )
    }
}

export default ErrorPopup
