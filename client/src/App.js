import React, { Component } from 'react'
import Out from './Out'
import In from './In'
import Auth from './Auth'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {

  logout = () => {
    localStorage.removeItem('jwt')
    this.forceUpdate()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => (
            (localStorage.getItem('jwt')) ? (
              <Redirect to='/map'/>
            ) : (
              <Out />
            )
          )}/>
          <Route path='/map' render={() => (
            (localStorage.getItem('jwt')) ? (
              <In logout={this.logout}/>
            ) : (
              <Redirect to="/"/>
            )
          )}/>
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    );
  }
}

export default App
