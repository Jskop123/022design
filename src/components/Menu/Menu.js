import React from 'react'

import './Menu.css'

const Menu = (props) => (
    <div className={ props.active ? 'menu showMenu' : 'menu' }>
        <ul>
            <li>Home</li>
            <li>Oferta</li>
            <li>Portfolio</li>
            <li>Contact</li>
        </ul>
    </div>
)
export default Menu