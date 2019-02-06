import React from 'react'

import './Menu.css'

const Menu = (props) => (
    <nav className={ props.active ? 'menu showMenu' : 'menu' }>
        <ul>
            <li>Home</li>
            <li>Oferta</li>
            <li>Portfolio</li>
            <li>Contact</li>
        </ul>
    </nav>
)
export default Menu