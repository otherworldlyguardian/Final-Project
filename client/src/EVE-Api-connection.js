import items from './data/eve_typeID.json'
import systems from './data/simplesystems.json'

export const apiConn = {
  initializeClientUpdateInterval: function() {
    this.timerL = setTimeout(this.locationUpdate, 5000)
    // this.timerS = setTimeout(this.shipUpdate, 5000)
    // this.tokenRefresh()
  },
  terminateIntervals: function() {
    clearTimeout(this.timerL)
    // clearTimeout(this.timerS)
    // clearTimeout(this.timerT)
  },

  locationUpdate: function(charID, accessToken) {
    fetch(`https://esi.tech.ccp.is/latest/characters/${charID}/location/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.solar_system_id) {
        return systems.filter(system => system.SOLARSYSTEMID === data.solar_system_id)[0].SOLARSYSTEMNAME
        if (location !== system && this.props.sysList.every(sys => (sys.name !== system))) {
          if (this.props.sysList.length === 0) {
            this.props.addSystem({
              name: system,
              connection: 'Home'
            })
          } else {
            this.props.addSystem({
              name: system,
              connection: location
            })
          }
        }
        this.props.updateInfo(Object.assign({}, this.props.charInfo, {
          location: system
        }))
      }
    })
  }
}
