import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addSystem } from './actions/addSystem'

class SystemName extends Component {

  startSystem = (e) => {
    this.props.addSystem({
      name: e.target.innerText,
      connection: 'Home'
    })
  }

  render() {
    return (
      <p onClick={this.startSystem}>
        {this.props.name}
      </p>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({addSystem: addSystem}, dispatch)
}

export default connect(null, matchDispatchToProps)(SystemName)
