import React, { Component } from 'react'
import Out from './Out'
import In from './In'
import Auth from './Auth'
import items from './data/eve_typeID.json'
import systems from './data/trimmedSS.json'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {

  auth = () => {
    var stateConstruct = {}
    fetch('http://localhost:3000/evedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        eve: {
          code: window.location.search.split('&')[0].split('=')[1]
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      window.history.pushState({}, '', '/')
      stateConstruct.access_token = data.access_token
      stateConstruct.refresh_token = data.refresh_token
      stateConstruct.character_id = data.character_id
      stateConstruct.character_name = data.character_name
      stateConstruct.corp_id = data.corp_id
      stateConstruct.portrait = data.portrait
      this.setState({
        ...stateConstruct
      })
      })
    setTimeout(this.locationUpdate, 5000)
    setTimeout(this.shipUpdate, 5000)
    setTimeout(this.tokenRefresh, 900000)
  }

  locationUpdate = () => {
    fetch(`https://esi.tech.ccp.is/latest/characters/${this.state.character_id}/location/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.state.access_token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.solar_system_id) {
        this.setState({
          location: systems.filter(system => system.SOLARSYSTEMID === data.solar_system_id)[0].SOLARSYSTEMNAME
        })
      }
    })
    setTimeout(this.locationUpdate, 5000)
  }

  shipUpdate = () => {
    fetch(`https://esi.tech.ccp.is/latest/characters/${this.state.character_id}/ship/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.state.access_token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.ship_type_id) {
        this.setState({
          ship: items.filter(item => item.TYPEID === data.ship_type_id)[0].TYPENAME
        })
      }
    })
    setTimeout(this.shipUpdate, 5000)
  }

  tokenRefresh = () => {
    fetch('http://localhost:3000/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        eve: {
          code: this.state.refresh_token
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        access_token: data.access_token
      })
      })
    setTimeout(this.tokenRefresh, 900000)
  }

  logout = () => {
    localStorage.removeItem('jwt')
    this.forceUpdate()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Out} />
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
