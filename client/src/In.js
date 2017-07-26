import React, { Component } from 'react'
import LoggedInCard from './LoggedInCard'
import SystemCardContainer from './SystemCardContainer'
import items from './data/eve_typeID.json'
import systems from './data/trimmedSS.json'

class In extends Component {
  constructor() {
    super()

    this.timerL = null
    this.timerS = null
    this.timerT = null
    this.state = {
      access_token: '',
      character_id: '94121145',
      character_name: 'Jesalina Nissem',
      location: 'J100252',
      ship: 'Cheetah'
    }
  }

  componentWillMount() {
    this.timerL = setTimeout(this.locationUpdate, 5000)
    this.timerS = setTimeout(this.shipUpdate, 5000)
    this.timerT = setTimeout(this.tokenRefresh, 900000)
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
    this.timerL = setTimeout(this.locationUpdate, 5000)
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
    this.timerS =  setTimeout(this.shipUpdate, 5000)
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
    this.timerT = setTimeout(this.tokenRefresh, 900000)
  }

  componentWillUnmount() {
    clearTimeout(this.timerL)
    clearTimeout(this.timerS)
    clearTimeout(this.timerT)
  }

  render() {
    return (
      <div>
        <LoggedInCard {...this.state} logout={this.props.logout} />
        <SystemCardContainer />
      </div>
    )
  }
}

export default In
