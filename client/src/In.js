import React, { Component } from 'react'
import LoggedInCard from './LoggedInCard'
import SystemCardContainer from './SystemCardContainer'

class In extends Component {
  constructor() {
    super()

    this.state = {
      access_token: '',
      refresh_token: '',
      character_id: '94121145',
      character_name: 'Jesalina Nissem',
      corp_id: '',
      portrait: '',
      location: 'J100252',
      ship: 'Cheetah'
    }
  }

  render() {
    return (
      <div>
        <LoggedInCard {...this.state}/>
        <SystemCardContainer />
      </div>
    )
  }
}

export default In
