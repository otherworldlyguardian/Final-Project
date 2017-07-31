import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import Background from './images/EVE_SSO_Login_Buttons_Large_Black.png'

const loginStyle = {
  width: 270,
  height: 45,
  backgroundImage: `url(${Background})`,
  marginTop: 250
}

const divStyle = {
  textAlign: 'center'
}

class Out extends Component {

  clickRedirect = () => {
    window.location.href='https://login.eveonline.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth&client_id=5807703307a6437bbea7d880e591ed5a&scope=esi-location.read_online.v1%20esi-location.read_location.v1%20esi-location.read_ship_type.v1%20esi-ui.write_waypoint.v1%20esi-ui.open_window.v1&state=test123'
  }

  render() {
    return (
      <div style={divStyle}>
        <Button style={loginStyle} onClick={this.clickRedirect} />
      </div>
    )
  }
}

export default Out
