import React from 'react'
import { Card } from 'semantic-ui-react'
import Draggable from 'react-draggable'

const SystemCard = ({ name, connection }) => (
  <Draggable>
    <Card>
      <Card.Content>

          {name}

      </Card.Content>
      <Card.Content extra>
        Connected to: {connection}
      </Card.Content>
    </Card>
  </Draggable>
)

export default SystemCard
