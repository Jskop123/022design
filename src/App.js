import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import './assets/fontello/css/fontello.css'

import Header from './components/Header/Header'

import Home from './pages/Home/Home'
import Offert from './pages/Offert/Offert'
import Portfolio from './pages/Portfolio/Portfolio'
import Contact from './pages/Contact/Contact'
import Project from './pages/Project/Project'

export default class App extends Component {
  render = () => (
    <div className="App">
      <Header/>
      <Switch>
        <Route path='/(oferta|services)/'           component={ Offert }/>
        <Route path='/portfolio/(projekt|project)'  component={ Project }/>
        <Route path='/portfolio'                    component={ Portfolio }/>
        <Route path='/(o mnie|about)/'           component={ Contact }/>
        <Route path='/'                             component={ Home }/>
      </Switch>
    </div>
  )
}