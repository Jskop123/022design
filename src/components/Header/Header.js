import React, { Component } from 'react'

import styles from './Header.module.css'

import Menu from './Menu/Menu'
import Backdrop from '../Backdrop/Backdrop'
import Logo from '../../components/Logo/Logo'

export default class Header extends Component {
    state = { showMenu: false }
    menuHandler = handler => {
        if( handler === 'toggle' ) this.setState({ showMenu: !this.state.showMenu })
        else if( handler === 'close' ) this.setState({ showMenu: false })
    }
    render = () => (<>
        <header>
            <Logo/>
            <div onClick={() => this.menuHandler( 'toggle' )} 
                className={ this.state.showMenu ? `${styles.burgerIcon} ${styles.active}` : `${styles.burgerIcon}` }>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
            </div>
            <Menu active={ this.state.showMenu } showMenu={ this.menuHandler }/>
        </header>
        { this.state.showMenu ? <Backdrop click={ this.menuHandler } /> : null }
    </>)
}