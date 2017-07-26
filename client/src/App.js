import React, { Component } from 'react'
import LoginCard from './LoginCard'
import SystemCardContainer from './SystemCardContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginCard />
        <SystemCardContainer />
      </div>
    );
  }
}

export default App
