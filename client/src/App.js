import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Out from './Out'
import In from './In'
import Auth from './Auth'
import { logIn } from './actions/logIn'

class App extends Component {

  componentWillMount() {
    if (localStorage.getItem('eve')) this.props.logIn()
  }

  render() {
    const { loggedIn } = this.props
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => (
            loggedIn ? (
              <Redirect to='/map'/>
            ) : (
              <Out />
            )
          )}/>
          <Route path='/map' render={() => (
            loggedIn ? (
              <In />
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

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({logIn: logIn}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
