import React, { Component } from 'react'

import './App.css'

import Header from './components/Header/Header'
import Carousel from './components/Carousel/Carousel'
import Menu from './components/Menu/Menu'
import Backdrop from './components/UI/Backdrop/Backdrop';

class App extends Component {
  state = {
    showMenu: false
  }
  showMenuHandler = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }
  render() {
    return (
      <div className="App">
        <Header showMenu={ this.showMenuHandler } active={ this.state.showMenu }/>
        <Menu active={ this.state.showMenu }/>
        { this.state.showMenu ? <Backdrop click={ this.showMenuHandler }/> : null}
        {/* Switch */}
        <Carousel/>
      </div>
    )
  }
}
export default App;
