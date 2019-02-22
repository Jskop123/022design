import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import './assets/fontello/css/fontello.css'

import Header from './components/Header/Header'

import Home from './pages/Home/Home'
import Offert from './pages/Offert/Offert'
import Portfolio from './pages/Portfolio/Portfolio'
import Contact from './pages/Contact/Contact';

class App extends Component {
  state = {
    showMenu: false,
  }
  menuHandler = handler => {
    if( handler === 'toggle' ) this.setState({ showMenu: !this.state.showMenu })
    else if( handler === 'close' ) this.setState({ showMenu: false })
  }
  render() {
    return (
      <div className="App">
        <Header burger={ this.menuHandler } active={ this.state.showMenu }/>
        <Switch>
          <Route path='/(oferta|offert)/' component={ Offert }/>
          <Route path='/portfolio' exact component={ Portfolio }/>
          <Route path='/(kontakt|contact)/' component={ Contact }/>
          <Route path='/' component={ Home }/>
        </Switch>
      </div>
    )
  }
}
export default App;