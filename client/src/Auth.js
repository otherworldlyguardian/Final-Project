import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
  componentWillMount() {
    console.log(window.location.search.split('&')[0].split('=')[1])
    localStorage.setItem('jwt', 'setting')
  }

  render() {
    return (
      <Redirect to='/map' />
    )
  }
}

export default Auth
