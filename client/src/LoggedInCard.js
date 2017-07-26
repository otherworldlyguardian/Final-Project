import React, { Component } from 'react'
import { Item, Segment, Button } from 'semantic-ui-react'

class LoggedInCard extends Component {
  constructor(props) {
    super(props)

    const { character_id, character_name, location, ship } = props
    this.state = {
      items: [
        {
          childKey: 0,
          image: {
            src: `http://image.eveonline.com/Character/${character_id}_512.jpg`,
            size: 'tiny'
          },
          header: character_name,
          description: ship,
          meta: location
        }
      ]
    }
  }

  render() {
    return (
      <Segment>
        <Button floated='right'>Logout</Button>
        <Item.Group items={this.state.items} />
      </Segment>
    )
  }
}

export default LoggedInCard
