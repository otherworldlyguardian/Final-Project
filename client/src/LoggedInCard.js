import React, { Component } from 'react'
import { Item, Segment, Button } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logOut } from './actions/logOut'
import { resetMap } from './actions/resetMap'
import { deleteMap } from './actions/deleteMap'

class LoggedInCard extends Component {
  logout = () => {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('eve')
      }
    })
    localStorage.removeItem('eve')
    this.props.logOut()
  }

  mapReset = () => {
    this.props.resetMap()
  }

  mapDelete = () => {
    this.props.deleteMap()
  }

  render() {
    const { character_id, character_name, location, ship } = this.props.charInfo
    return (
      <Segment>
        <Button floated='right' onClick={this.logout}>Logout</Button>
        <Button floated='right' onClick={this.mapReset}>Reset Map</Button>
        <Button floated='right' onClick={this.mapDelete}>Delete Map</Button>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src={`http://image.eveonline.com/Character/${character_id}_512.jpg`} />

            <Item.Content>
              <Item.Header>
                {character_name}
              </Item.Header>
              <Item.Meta>
                {location}
              </Item.Meta>
              <Item.Description>
                {ship}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    charInfo: state.charInfo
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({logOut: logOut, resetMap: resetMap, deleteMap: deleteMap}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(LoggedInCard)
