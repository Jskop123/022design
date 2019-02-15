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
    showMenu: false
  }
  showMenuHandler = () => this.setState({ showMenu: !this.state.showMenu })
  render() {
    return (
      <div className="App">
        <Header burger={ this.showMenuHandler } active={ this.state.showMenu }/>
        <Switch>
          <Route path='/oferta' component={ Offert } ></Route>
          <Route path='/portfolio' exact component={ Portfolio } ></Route>
          <Route path='/kontakt' component={ Contact } ></Route>
          <Route path='/' component={ Home } ></Route>
        </Switch>
      </div>
    )
  }
}
export default App;