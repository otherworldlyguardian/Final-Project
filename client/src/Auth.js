import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logIn } from './actions/logIn'
import { updateInfo } from './actions/updateInfo'

class Auth extends Component {
  componentWillMount() {
    this.auth(window.location.search.split('&')[0].split('=')[1])
  }

  auth = (grant_code) => {
    fetch('http://localhost:3000/grantcode', {
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
      localStorage.setItem('eve', data.eve)
      this.props.updateInfo({
        access_token: data.access_token,
        character_id: data.character_id,
        character_name: data.character_name
      })
      this.props.logIn()
      })
  }

  render() {
    return (
      <Redirect to='/map' />
    )
  }
}

function mapStateToProps(state) {
  return {
    charInfo: state.charInfo
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({updateInfo: updateInfo, logIn: logIn}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Auth)
