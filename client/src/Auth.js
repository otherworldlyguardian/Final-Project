import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
  componentWillMount() {
    this.auth(window.location.search.split('&')[0].split('=')[1])
    localStorage.setItem('jwt', 'setting')
  }

  auth = (grant_code) => {
    var stateConstruct = {}
    fetch('http://localhost:3000/evedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        eve: {
          code: grant_code
        }
      })
    })
    .then(resp => resp.json())
    .then(data => {
      stateConstruct.access_token = data.access_token
      stateConstruct.character_id = data.character_id
      stateConstruct.character_name = data.character_name
      this.setState({
        ...stateConstruct
      })
      })
  }

  render() {
    return (
      <Redirect to='/map' />
    )
  }
}

export default Auth
