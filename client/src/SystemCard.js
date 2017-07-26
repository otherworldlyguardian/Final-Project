import React from 'react'
import { Card } from 'semantic-ui-react'

const SystemCard = ({ name, connection }) => (
  <Card>
    <Card.Content>
      <Card.Header>
        {name}
      </Card.Header>
    </Card.Content>
    <Card.Content extra>
      Connected to: {connection}
    </Card.Content>
  </Card>
)

export default SystemCard
