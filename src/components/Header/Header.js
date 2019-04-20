import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

import Menu from './Menu/Menu'
import Backdrop from '../Backdrop/Backdrop'
import Logo from '../../components/Logo/Logo'
import BurgerIcon from './BurgerIcon/BurgerIcon'

export default class Header extends Component {
    state = { showMenu: false }
    toggleMenuHandler = () => this.setState({ showMenu: !this.state.showMenu })
    closeMenuHandler = () => this.setState({ showMenu: false })
    
    render = () => (<>
        <header>
            <Link to='/'>
                <Logo/>
            </Link>
            <BurgerIcon showMenu={ this.state.showMenu } click={ this.toggleMenuHandler }/>
            <Menu active={ this.state.showMenu } closeMenu={ this.closeMenuHandler }/>
        </header>
        { this.state.showMenu ? <Backdrop click={ this.closeMenuHandler } /> : null }
    </>)
}