import React, { Component } from 'react'
import Background from './EVE_SSO_Login_Buttons_Large_Black.png'
import './App.css'

const loginStyle = {
  width: 270,
  height: 45,
  backgroundImage: `url(${Background})`
}

class App extends Component {
  constructor() {
    super()

    this.state = {
      access_token: '',
      refresh_token: '',
      character_id: '',
      character_name: '',
      corp_id: '',
      portrait: '',
      location: '',
      ship: ''
    }
  }

  clickRedirect = () => {
    window.location.href='https://login.eveonline.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001&client_id=5807703307a6437bbea7d880e591ed5a&scope=esi-location.read_online.v1%20esi-location.read_location.v1%20esi-location.read_ship_type.v1%20esi-ui.write_waypoint.v1%20esi-ui.open_window.v1&state=test123'
  }

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
    .then(data => this.setState({
      location: data.solar_system_id
    }))
    console.log(this.state, 'location')
    setTimeout(this.locationUpdate, 15000)
  }

  shipUpdate = () => {
    fetch(`https://esi.tech.ccp.is/latest/characters/${this.state.character_id}/ship/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.state.access_token}`
      }
    })
    .then(resp => resp.json())
    .then(data => this.setState({
      ship: data.ship_type_id
    }))
    console.log(this.state, 'ship')
    setTimeout(this.shipUpdate, 15000)
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

  render() {
    if (window.location.search) {
      this.auth()
    }
    if (this.state.access_token) {
      return (
        <div>
          <img src={this.state.portrait} alt={this.state.character_name} />
          <h1>{this.state.character_name}</h1>
          <h2>Current System: {this.state.location}</h2>
          <h2>Current Ship: {this.state.ship}</h2>
        </div>
      )
    } else {
      return (
        <div className='App'>
          <button style={loginStyle} onClick={this.clickRedirect}/>
        </div>
      )
    }
  }
}

export default App
