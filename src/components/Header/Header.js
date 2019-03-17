import React, { Component } from 'react'

import styles from './Header.module.css'

import Menu from './Menu/Menu'
import Backdrop from '../Backdrop/Backdrop'

class Header extends Component {
    state = { showMenu: false }
    menuHandler = handler => {
        if( handler === 'toggle' ) this.setState({ showMenu: !this.state.showMenu })
        else if( handler === 'close' ) this.setState({ showMenu: false })
    }
    render = () => (<>
        <header>
            <div className={styles.logo}>022design</div>
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
export default Header