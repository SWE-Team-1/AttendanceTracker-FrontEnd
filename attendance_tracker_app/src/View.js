import React from 'react'

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
        <div>
          <h1>
            Yiran: View page goes here!
          </h1>
          <p>User is a {this.props.prof ? 'prof' : 'student'}</p>
          <button onClick={() => this.props.logout()}>Logout</button>
        </div>
      </div>
    )
  }
}

export default View
