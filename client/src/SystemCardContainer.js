import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card } from 'semantic-ui-react'
import SystemCard from './SystemCard'

class SystemCardContainer extends Component {
  render() {
    return (
      <Container>
        <Card.Group itemsPerRow={6}>
          {this.props.sysList.map((system, i) => {
            return <SystemCard {...system} key={i} />
          })
          }
        </Card.Group>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    sysList: state.sysList
  }
}

export default connect(mapStateToProps)(SystemCardContainer)
