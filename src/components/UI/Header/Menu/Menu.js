import React from 'react'

import { NavLink } from 'react-router-dom'

import './Menu.css'

const Menu = (props) => (
    <nav className={ props.active ? 'menu showMenu' : 'menu' }>
        <ul>
            <NavLink to='/' exact ><li>Home</li></NavLink>
            <NavLink to='/oferta'><li>Oferta</li></NavLink>
            <NavLink to='/portfolio'><li>Portfolio</li></NavLink>
            <NavLink to='/contact'><li>Contact</li></NavLink>
        </ul>
    </nav>
)
export default Menu