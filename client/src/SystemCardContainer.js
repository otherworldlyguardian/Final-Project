import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card } from 'semantic-ui-react'
import SystemCard from './SystemCard'

class SystemCardContainer extends Component {
  render() {
    console.log(this.props.sysList);
    return (
      <Container>
        <Card.Group>
          {this.props.sysList.map((system, i) => {
            console.log(system)
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
