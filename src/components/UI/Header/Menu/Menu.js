import React from 'react'

import { NavLink } from 'react-router-dom'

import styles from './Menu.module.css'

const Menu = (props) => (
    <nav className={ props.active ? `${styles.menu} ${styles.showMenu}` : styles.menu }>
        <ul>
            <li><NavLink to='/' exact onClick={ props.showMenu }>Home</NavLink></li>
            <li><NavLink to='/oferta' onClick={ props.showMenu }>Oferta</NavLink></li>
            <li><NavLink to='/portfolio' onClick={ props.showMenu }>Portfolio</NavLink></li>
            <li><NavLink to='/kontakt' onClick={ props.showMenu }>Kontakt</NavLink></li>
        </ul>
    </nav>
)
export default Menu