import React from 'react'
import Login from './Login'
import View from './View'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {
  constructor (props) {
    super(props)
    // We can store user info in this top-level component
    // prof is only true once user can be identifed as such
    this.state = {
      user: null,
      prof: false,
      loggedin: false
    }
    // Set up URL routing with react router...
    this.login = this.login.bind(this)
    this.loginProf = this.loginProf.bind(this)
  }

  login () {
    this.setState({ loggedin: true })
  }

  loginProf () {
    this.setState({ prof: true, loggedin: true })
  }

  logout () {
    this.setState({ prof: false, loggedin: false })
  }

  render () {
    const viewComponent = (props) => {
      return (
        <View
          user={() => this.user()}
          prof={() => this.prof()}
          logout={() => this.logout()}
        />
      )
    }

    const loginComponent = (props) => {
      return (
        <Login
          login={() => this.login()}
          loginProf={() => this.loginProf()}
        />
      )
    }
    return (
      <Router>
        <div className='App'>
          <div className='App-header'>
            <Switch>
              <Route path='/' exact component={viewComponent} />
              <Route path='/login' component={loginComponent} />
            </Switch>

            {/* {this.state.loggedin
              ? <View user={this.state.user} prof={this.state.prof} logout={() => this.logout()} />
            : <Login login={() => this.login()} loginProf={() => this.loginProf()} />} */}

          </div>
        </div>
      </Router>
    )
  }
}

export default App
