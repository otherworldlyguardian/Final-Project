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
      data: {}
    }
  }

  authorize = (event) => {
    let x = window.location.search.split('&')[0].split('=')[1]
    fetch('https://login.eveonline.com/oauth/token', {

      method: 'POST',
      headers: {
        'authorization': 'Basic NTgwNzcwMzMwN2E2NDM3YmJlYTdkODgwZTU5MWVkNWE6MTdXRHVnUFdQM2xmZzZUNkswR2ZBYUZkVVh2V2pMSFZ6enBpbjI2Sg==',
        'content-type': 'application/x-www-form-urlencoded',
        'host': 'login.eveonline.com'
      },
      body: {
        'grant_type': 'authorization_code',
        'code': x
      }
    })
    .then(resp => console.log(resp))

  }

  secondAuthorize = (event) => {
    let x = window.location.search.split('&')[0].split('=')[1]
    var data = `grant_type=authorization_code&code=${x}`

    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText)
      }
    })

    xhr.open("POST", "https://login.eveonline.com/oauth/token")
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    xhr.setRequestHeader("authorization", "Basic  NTgwNzcwMzMwN2E2NDM3YmJlYTdkODgwZTU5MWVkNWE6MTdXRHVnUFdQM2xmZzZUNkswR2ZBYUZkVVh2V2pMSFZ6enBpbjI2Sg==")
    xhr.setRequestHeader("host", "login.eveonline.com")
    xhr.setRequestHeader("cache-control", "no-cache")
    xhr.setRequestHeader("postman-token", "a0ec0d01-f469-f8fe-b5fc-2d54361a85f9")

    xhr.send(data)
  }

  getInfo = (event) => {
    fetch('https://esi.tech.ccp.is/latest/characters/94121145/location/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer E24qIoz7Q6P85cVTlcyrMP_g4LSVV2UPcQzsAVbEKUWwvbRox0Oht5miHg0VSSRMzUkc_mx2oUej8LnwgUg6nA2'
      }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  render() {
    return (
      <div className='App'>
        <button style={loginStyle} onClick={this.getInfo}/>
        <a href='https://login.eveonline.com/oauth/authorize?response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000&client_id=5807703307a6437bbea7d880e591ed5a&scope=esi-location.read_online.v1%20esi-location.read_location.v1%20esi-location.read_ship_type.v1%20esi-ui.write_waypoint.v1%20esi-ui.open_window.v1&state=test123'>Test</a>
      </div>
    )
  }
}

export default App
