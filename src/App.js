import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import Header from './components/UI/Header/Header'
import Backdrop from './components/UI/Backdrop/Backdrop'

import Home from './components/Home/Home'
import Portfolio from './components/Portfolio/Portfolio'

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
        { this.state.showMenu ? <Backdrop click={ this.showMenuHandler }/> : null}
        <Switch>
          <Route path='/oferta' component={ Portfolio } ></Route>
          <Route path='/portfolio' component={ Portfolio } ></Route>
          <Route path='/contact' component={ Portfolio } ></Route>
          <Route path='/' component={ Home } ></Route>
        </Switch>
      </div>
    )
  }
}
export default App;
