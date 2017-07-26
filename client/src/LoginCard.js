import React from 'react'
import { Item, Segment } from 'semantic-ui-react'

const items = [
  {
    childKey: 0,
    image: 'http://image.eveonline.com/Character/94121145_512.jpg',
    header: 'Jesalina Nissem',
    description: 'Cheetah',
    meta: 'J100252'
  }
]

const LoginCard = () => (
  <Segment>
    <Item.Group items={items} />
  </Segment>
)

export default LoginCard
