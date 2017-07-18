import React, { Component } from 'react'
import Background from './EVE_SSO_Login_Buttons_Large_Black.png'
import './App.css'

const loginStyle = {
  width: 270,
  height: 45,
  backgroundImage: `url(${Background})`
}

class App extends Component {
  authorize = (event) => {
    console.log(event)
  }

  render() {
    return (
      <div className='App'>
        <button style={loginStyle} onClick={this.authorize}/>
        <a href='https://login.eveonline.com/oauth/authorize'>Test</a>
      </div>
    )
  }
}

export default App
