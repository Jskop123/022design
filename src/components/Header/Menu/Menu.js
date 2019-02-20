import React from 'react'

import { NavLink } from 'react-router-dom'

import styles from './Menu.module.css'

const Menu = (props) => (
    <nav className={ props.active ? `${styles.menu} ${styles.showMenu}` : styles.menu }>
        <ul>
            <li><NavLink to='/' exact onClick={() => props.showMenu( 'close' )}>Home</NavLink></li>
            <li><NavLink to='/oferta' onClick={() => props.showMenu( 'close' )}>Oferta</NavLink></li>
            <li><NavLink to='/portfolio' onClick={() => props.showMenu( 'close' )}>Portfolio</NavLink></li>
            <li><NavLink to='/kontakt' onClick={() => props.showMenu( 'close' )}>Kontakt</NavLink></li>
        </ul>
    </nav>
)
export default Menu