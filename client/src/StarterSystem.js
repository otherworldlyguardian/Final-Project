import React, { Component } from 'react'
import { Header, Segment, Container, Input } from 'semantic-ui-react'
import systems from './data/simplesystem.json'
import SystemName from './SystemName'

class StarterSystem extends Component {
  constructor() {
    super()

    this.state = {
      searchTerm: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  filterSystems () {
    return this.state.searchTerm.length > 2 ?
    systems.filter(system => system.systemName.toLowerCase().includes(this.state.searchTerm.toLowerCase())) :
    []
  }

  render() {
    return (
      <Container>
        <Segment compact>
          <Header>
            Please select a starting system for your map!
          </Header>
          <Input
            fluid icon='search'
            placeholder='Type at least three letters for results...'
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          {this.filterSystems().map(system => <SystemName name={system.systemName} key={system.systemID} />)}
        </Segment>
      </Container>
    )
  }
}

export default StarterSystem
