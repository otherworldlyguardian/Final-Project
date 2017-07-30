import React, { Component } from 'react'
import { Item, Segment, Button } from 'semantic-ui-react'

class LoggedInCard extends Component {

  render() {
    const { character_id, character_name, location, ship } = this.props
    return (
      <Segment>
        <Button floated='right' onClick={this.props.logout}>Logout</Button>
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

export default LoggedInCard
