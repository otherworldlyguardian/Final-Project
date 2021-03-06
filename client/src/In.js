import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateInfo } from './actions/updateInfo'
import { addSystem } from './actions/addSystem'
import LoggedInCard from './LoggedInCard'
import SystemCardContainer from './SystemCardContainer'
import StarterSystem from './StarterSystem'
import items from './data/eve_typeID.json'
import systems from './data/simplesystem.json'
// import ApiConn from './EVE-Api-connection'

class In extends Component {
  constructor() {
    super()

    this.timerL = null
    this.timerS = null
    this.timerT = null
  }

  componentWillMount() {
    // ApiConn.initializeClientUpdateInterval()
    this.timerL = setTimeout(this.locationUpdate, 5000)
    this.timerS = setTimeout(this.shipUpdate, 5000)
    this.tokenRefresh()
  }

  locationUpdate = () => {
    const { character_id, access_token, location } = this.props.charInfo
    fetch(`https://esi.tech.ccp.is/latest/characters/${character_id}/location/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.solar_system_id) {
        let system = systems.filter(system => system.systemID === data.solar_system_id)[0].systemName
        if (location !== system && this.props.sysList.every(sys => (sys.name !== location)) && location !== undefined) {
          this.props.addSystem({
            name: location,
            connection: system
          })
        }
        if (location !== system && this.props.sysList.every(sys => (sys.name !== system)) && location !== undefined) {
          this.props.addSystem({
            name: system,
            connection: location
          })
        }
        this.props.updateInfo(Object.assign({}, this.props.charInfo, {
          location: system
        }))
      }
    })
    this.timerL = setTimeout(this.locationUpdate, 5000)
  }

  shipUpdate = () => {
    const { character_id, access_token } = this.props.charInfo
    fetch(`https://esi.tech.ccp.is/latest/characters/${character_id}/ship/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.ship_type_id) {
        this.props.updateInfo(Object.assign({}, this.props.charInfo, {
          ship: items.filter(item => item.TYPEID === data.ship_type_id)[0].TYPENAME
        }))
      }
    })
    this.timerS = setTimeout(this.shipUpdate, 5000)
  }

  tokenRefresh = () => {
    fetch('http://localhost:3000/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('eve')
      }
    })
    .then(resp => resp.json())
    .then(data => {
      this.props.updateInfo({
        access_token: data.access_token,
        character_id: data.character_id,
        character_name: data.character_name
      })
      })
    this.timerT = setTimeout(this.tokenRefresh, 900000)
  }

  componentWillUnmount() {
    // ApiConn.terminateIntervals()
    clearTimeout(this.timerL)
    clearTimeout(this.timerS)
    clearTimeout(this.timerT)
  }

  render() {
    if (this.props.sysList.length === 0) {
      return (
        <div>
          <LoggedInCard />
          <StarterSystem />
        </div>
      )
    }
    return (
      <div>
        <LoggedInCard />
        <SystemCardContainer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    charInfo: state.charInfo,
    sysList: state.sysList
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({updateInfo: updateInfo, addSystem: addSystem}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(In)
