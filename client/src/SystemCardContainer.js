import React from 'react'
import { Container, Card } from 'semantic-ui-react'
import SystemCard from './SystemCard'

const systems = [
  {
    childKey: 0,
    name: 'J100252',
    connection: 'Home'
  },
  {
    childKey: 1,
    name: 'J111753',
    connection: 'J100252'
  },
  {
    childKey: 2,
    name: 'J107347',
    connection: 'J111753'
  }
]

const SystemCardContainer = () => (
  <Container>
    <Card.Group>
      {systems.map(system => <SystemCard {...system} key={system.childKey} />)}
    </Card.Group>
  </Container>
)

export default SystemCardContainer
